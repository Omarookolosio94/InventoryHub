import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import notification from "core/services/notification";
import InputField from "core/components/fields/InputField";
import SelectField from "core/components/fields/SelectField";
import useUserStore from "core/services/stores/useUserStore";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("password");
  const [accessType, setAccessType] = useState("1");

  const error = useUserStore((store) => store.errors);
  const loginUser = useUserStore((store) => store.login);
  const updateError = useUserStore((store) => store.updateError);

  const login = async (e: any) => {
    e.preventDefault();
    if (accessType === "0") {
      notification({
        title: "Form Error",
        message: "Please choose an access type",
        type: "danger",
      });
      return;
    }

    var response: any = await loginUser(
      email,
      password,
      accessType === "1" ? true : false
    );
    if (response != null && response?.success === true) {
      accessType === "1" ? navigate("/admin") : navigate("/admin/checkout");
    }
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <>
      <div className="mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
        {/* Sign in section */}
        <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
          <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
            Sign In
          </h4>
          <p className="mb-9 ml-1 text-base text-gray-600">
            Enter your email and password to sign in!
          </p>

          <form onSubmit={(e) => login(e)} autoComplete="on">
            {/* Email */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Email*"
              placeholder="mail@simmmple.com"
              id="email"
              type="text"
              name="email"
              value={email}
              onChange={(e: any) => {
                setEmail(e.target?.value);
              }}
              onFocus={() => {
                if (error?.Email && error?.Email?.length > 0) {
                  updateError("Email");
                }
              }}
              error={error?.Email}
            />

            {/* Password */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Password*"
              placeholder=""
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e: any) => {
                setPassword(e.target?.value);
              }}
              onFocus={() => {
                if (error?.Password && error?.Password?.length > 0) {
                  updateError("Password");
                }
              }}
              error={error?.Password}
            />

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
            <button className="linear mt-3 w-full rounded-md bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
              Sign In
            </button>
          </form>

          <div className="mt-5 flex items-center justify-between">
            <Link
              to="/auth/reset-password"
              className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="">
            <span className="text-sm font-medium text-navy-700 dark:text-gray-600">
              Set up a new business profile?
            </span>
            <Link
              to="/auth/register"
              className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            >
              Create business account
            </Link>
          </div>
          <div className="">
            <span className="text-sm font-medium text-navy-700 dark:text-gray-600">
              Not yet verified?
            </span>
            <Link
              to="/auth/verify"
              className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            >
              Verify account
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
    </>
  );
}
