import { apicall } from "./apicall";

export const login = (email: string, password: string, isEmployer: boolean) =>
  apicall({
    endpoint: isEmployer ? "loginEmployer" : "loginEmployee",
    body: {
      email,
      password,
    },
    method: "POST",
  });
