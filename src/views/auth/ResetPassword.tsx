import { Link } from "react-router-dom";
import InputField from "core/components/fields/InputField";

export default function ResetPassword() {
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

        {/* Email */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Email*"
          placeholder="mail@simmmple.com"
          id="email"
          type="text"
        />

        {/* Password */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="New Password*"
          placeholder="Min. 8 characters"
          id="password"
          type="password"
        />

        {/* OTP */}
        <div className="flex items-center justify-between px-2">
          <button className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white">
            Generate Otp?
          </button>
        </div>
        <InputField
          variant="auth"
          extra="mb-3"
          label="Otp*"
          id="otp"
          placeholder=""
          type="tesxt"
        />
        <button className="linear mt-2 w-full rounded-md bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          Reset Password
        </button>
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
        </div>
      </div>
    </div>
  );
}
