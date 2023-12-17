import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "core/components/fields/InputField";
import SelectField from "core/components/fields/SelectField";
import useUserStore from "core/services/stores/useUserStore";
import notification from "core/services/notification";

export default function ResetPassword() {
  const navigate = useNavigate();
  const errors = useUserStore((store) => store.errors);
  const updateError = useUserStore((store) => store.updateError);
  const getOtpAction = useUserStore((state) => state.getOtp);
  const resetPasswordAction = useUserStore((state) => state.resetPassword);

  const [accessType, setAccessType] = useState("0");
  const [resetForm, setResetForm] = useState({
    email: "",
    newPassword: "",
    otp: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setResetForm({
      ...resetForm,
      [name]: value,
    });
  };

  const getOtp = async () => {
    if (resetForm?.email == null || resetForm?.email?.length < 1) {
      notification({
        title: "",
        type: "warning",
        message: "Please input an email",
      });
    }
    await getOtpAction(resetForm?.email);
  };

  const resetPassword = async (e: any) => {
    e.preventDefault();
    if (accessType == null || accessType?.length < 1) {
      notification({
        title: "",
        type: "warning",
        message: "Please select a user type",
      });
    }

    var status: boolean | any = await resetPasswordAction(
      resetForm,
      accessType === "1" ? true : false
    );

    if (status) {
      setResetForm({
        email: "",
        newPassword: "",
        otp: "",
      });

      navigate("/auth");
    }
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className="mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Reset Password
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your otp and email to reset password!
        </p>
        <form onSubmit={(e: any) => resetPassword(e)}>
          <SelectField
            label="Select Access"
            extra="mb-3"
            defaultName="Select Access Type"
            defaultValue="0"
            name="accessType"
            options={[
              {
                name: "Employer",
                value: "1",
              },
              {
                name: "Employee",
                value: "2",
              },
            ]}
            value={accessType}
            onChange={(e: any) => {
              setAccessType(e.target?.value);
            }}
            showLabel={true}
          />

          <InputField
            variant="auth"
            extra="mb-3"
            label="Email*"
            placeholder="business@mail.com"
            id="email"
            type="text"
            name="email"
            value={resetForm?.email}
            onChange={(e: any) => handleChange(e)}
            onFocus={() => {
              if (errors?.Email && errors?.Email?.length > 0) {
                updateError("Email");
              }
            }}
            error={errors?.Email}
          />

          {/* Password */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="New Password*"
            placeholder=""
            id="newPassword"
            type="password"
            name="newPassword"
            value={resetForm?.newPassword}
            onChange={(e: any) => handleChange(e)}
            onFocus={() => {
              if (errors?.NewPassword && errors?.NewPassword?.length > 0) {
                updateError("NewPassword");
              }
            }}
            error={errors?.NewPassword}
          />

          {/* OTP */}
          <div className="flex items-center justify-between px-2">
            <button
              type="button"
              className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
              onClick={() => getOtp()}
            >
              Generate Otp?
            </button>
          </div>

          <InputField
            variant="auth"
            extra="mb-3"
            label="Otp*"
            id="otp"
            placeholder=""
            type="text"
            name="otp"
            value={resetForm?.otp}
            onChange={(e: any) => handleChange(e)}
            onFocus={() => {
              if (errors?.Otp && errors?.Otp?.length > 0) {
                updateError("Otp");
              }
            }}
            error={errors?.Otp}
          />

          <button className="linear mt-2 w-full rounded-md bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Reset Password
          </button>
        </form>

        <div className="mt-4">
          <div>
            <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
              Set up a new business profile?
            </span>
            <Link
              to="/auth/register"
              className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            >
              Create an account
            </Link>
          </div>
          <div>
            <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
              All ready have an account?
            </span>
            <Link
              to="/auth/sign-in"
              className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
