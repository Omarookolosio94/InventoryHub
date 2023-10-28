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

export const getOtp = (email: string) =>
  apicall({
    endpoint: "employers",
    param: "otp",
    body: {
      email,
    },
    method: "POST",
  });

export const getEmployees = () =>
  apicall({
    endpoint: "employees",
    method: "GET",
    auth: true,
  });

export const addEmployer = (employer: NewEmployer) =>
  apicall({
    endpoint: "employers",
    body: {
      ...employer,
    },
    method: "POST",
  });

export const editEmployer = (name: string, about: string) =>
  apicall({
    endpoint: "employers",
    body: {
      name,
      about,
    },
    method: "PUT",
    auth: true,
  });

export const verifyEmployer = (email: string, otp: string) =>
  apicall({
    endpoint: "employers",
    param: "verify",
    body: {
      email,
      otp,
    },
    method: "PUT",
    auth: true,
  });

export const resetUserPassword = (
  resetPassword: ResetPassword,
  isEmployer: boolean = true
) =>
  apicall({
    endpoint: isEmployer ? "employers" : "employees",
    param: "auth/reset",
    body: {
      ...resetPassword,
    },
    method: "PUT",
    auth: true,
  });

export const addEmployee = (employee: NewEmployee) =>
  apicall({
    endpoint: "employees",
    body: {
      ...employee,
    },
    method: "POST",
    auth: true,
  });

export const assignEmployee = (
  roles: string[],
  stores: string[],
  employeeId: string
) =>
  apicall({
    endpoint: "employees",
    param: `${employeeId}/assignment`,
    body: {
      roles,
      assignedStoreIds: stores,
    },
    method: "PUT",
    auth: true,
  });

export const updateEmployeeStatus = (isActive: boolean, employeeId: string) =>
  apicall({
    endpoint: "employees",
    param: `${employeeId}/status`,
    body: {
      isActive: isActive,
    },
    method: "PUT",
    auth: true,
  });

export const deleteEmployee = (employeeId: string) =>
  apicall({
    endpoint: "employees",
    param: `${employeeId}`,
    method: "DELETE",
    auth: true,
  });
