import { Link, useNavigate } from "react-router-dom";
import InputField from "core/components/fields/InputField";
import { useEffect, useState } from "react";
import useUserStore from "core/services/stores/useUserStore";

export default function Register() {
  const navigate = useNavigate();
  const errors = useUserStore((state) => state.errors);
  const updateError = useUserStore((state) => state.updateError);
  const registerEmployerAction = useUserStore((state) => state.addEmployer);
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setRegisterForm({
      ...registerForm,
      [name]: value,
    });
  };

  const registerEmployer = async (e: any) => {
    e.preventDefault();
    var status: boolean | any = await registerEmployerAction(registerForm);

    if (status) {
      setRegisterForm({
        name: "",
        email: "",
        password: "",
      });
      // sessionStorage.setItem("email", registerForm?.email);
      navigate("/auth/verify");
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
          Registration
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Create an instant account for business today!
        </p>

        <form onSubmit={(e) => registerEmployer(e)}>
          <InputField
            variant="auth"
            extra="mb-3"
            label="Business Name*"
            placeholder="business name"
            id="name"
            type="text"
            name="name"
            value={registerForm?.name}
            onChange={(e: any) => handleChange(e)}
            onFocus={() => {
              if (errors?.Name && errors?.Name?.length > 0) {
                updateError("Name");
              }
            }}
            error={errors?.Name}
          />

          {/* Email */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Email*"
            placeholder="business@mail.com"
            id="email"
            type="text"
            name="email"
            value={registerForm?.email}
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
            label="Password*"
            placeholder="Min. 5 characters"
            id="password"
            type="password"
            name="password"
            value={registerForm?.password}
            onChange={(e: any) => handleChange(e)}
            onFocus={() => {
              if (errors?.Password && errors?.Password?.length > 0) {
                updateError("Password");
              }
            }}
            error={errors?.Password}
          />
          <button className="linear mt-3 w-full rounded-md bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Register
          </button>
        </form>

        <div className="mt-4">
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
  );
}
