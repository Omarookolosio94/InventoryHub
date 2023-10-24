import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "core/components/fields/InputField";
import useUserStore from "core/services/stores/useUserStore";
import notification from "core/services/notification";

export default function VerifyAccount() {
  const navigate = useNavigate();
  const errors = useUserStore((state) => state.errors);
  const updateError = useUserStore((state) => state.updateError);
  const getOtpAction = useUserStore((state) => state.getOtp);
  const verifyEmployerAction = useUserStore((state) => state.verifyEmployer);
  const [verifyForm, setVerifyForm] = useState({
    email: "",
    otp: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setVerifyForm({
      ...verifyForm,
      [name]: value,
    });
  };

  const getOtp = async () => {
    if (verifyForm?.email == null || verifyForm?.email?.length < 1) {
      notification({
        title: "",
        type: "warning",
        message: "Please input an email",
      });
    }

    await getOtpAction(verifyForm?.email);
  };

  const verifyEmployer = async (e: any) => {
    e.preventDefault();
    var status: boolean | any = await verifyEmployerAction(
      verifyForm?.email,
      verifyForm?.otp
    );

    if (status) {
      setVerifyForm({
        email: "",
        otp: "",
      });
      navigate("/auth");
    }
  };

  return (
    <div className="mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Verify Your Business Account
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your otp and email to verify your account!
        </p>

        <form onSubmit={(e: any) => verifyEmployer(e)}>
          {/* Email */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Email*"
            placeholder="business@mail.com"
            id="email"
            type="text"
            name="email"
            value={verifyForm?.email}
            onChange={(e: any) => handleChange(e)}
            onFocus={() => {
              if (errors?.Email && errors?.Email?.length > 0) {
                updateError("Email");
              }
            }}
            error={errors?.Email}
          />

          {/* OTP */}
          {verifyForm?.email?.length > 0 && (
            <div className="flex items-center justify-between px-2">
              <button
                type="button"
                className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
                disabled={verifyForm?.email?.length < 1}
                onClick={() => getOtp()}
              >
                Generate Otp?
              </button>
            </div>
          )}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Otp*"
            id="otp"
            placeholder=""
            type="text"
            name="otp"
            value={verifyForm?.otp}
            onChange={(e: any) => handleChange(e)}
            onFocus={() => {
              if (errors?.Otp && errors?.Otp?.length > 0) {
                updateError("Otp");
              }
            }}
            error={errors?.Otp}
          />
          <button className="linear mt-2 w-full rounded-md bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Verify Account
          </button>
        </form>

        <div className="mt-4">
          <div>
            <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
              Not registered yet?
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
          <div className="flex items-center justify-between">
            <Link
              to="/general/support"
              className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            >
              Support and Guides
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
