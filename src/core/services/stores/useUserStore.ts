import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import notification from "core/services/notification";
import {
  addEmployee,
  addEmployer,
  assignEmployee,
  deleteEmployee,
  editEmployer,
  getOtp,
  login,
  resetUserPassword,
  updateEmployeeStatus,
  verifyEmployer,
} from "../api/userapi";

// Zustand implementation
type UserState = {
  isLoading: boolean;
  isEmployer: boolean;
  errors: any | {};
  user: any | {};
  employees: Employee[];
  updateError: (name: string) => void;
  login: (email: string, password: string, isEmployer: boolean) => void;
  getOtp: (email: string) => void;
  addEmployer: (employer: NewEmployer) => void;
  editEmployer: (name: string, about: string) => void;
  verifyEmployer: (email: string, otp: string) => void;
  resetPassword: (resetPassword: ResetPassword, isEmployer: boolean) => void;
  addEmployee: (employee: NewEmployee) => void;
  assignEmployee: (
    roles: string[],
    stores: string[],
    employeeId: string
  ) => void;
  updateEmployeeStatus: (isActive: boolean, employeeId: string) => void;
  deleteEmployee: (employeeId: string) => void;
};

const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get): UserState => ({
        isLoading: false,
        isEmployer: false,
        user: {},
        errors: {},
        employees: [],
        updateError: (name) =>
          set((state) => ({
            errors: {
              ...state.errors,
              [name]: "",
            },
          })),
        login: async (email, password, isEmployer) => {
          try {
            set({ isLoading: true });
            const response = await login(email, password, isEmployer);
            const { success, statusCode, data, message } = response;
            set({ isEmployer: isEmployer });
            if (success) {
              set({ user: data });
              localStorage.setItem("token", data?.token);
              notification({
                title: "Successful Login",
                message,
                type: "success",
              });
            } else {
              if (statusCode === 400) {
                set({ errors: data });
              }

              notification({
                title: "",
                message: message,
                type: "danger",
              });
            }
            set({ isLoading: false });
            return success;
          } catch (err) {
            set({ isLoading: false });
            notification({
              title: "",
              message: "An unknown error occured, please try again later",
              type: "danger",
            });
            return false;
          }
        },
        addEmployee: async (employee) => {
          try {
            set({ isLoading: true });
            const response = await addEmployee(employee);
            const { success, statusCode, data, message }: any = response;
            if (success) {
              set((state) => ({
                employees: [
                  {
                    ...data,
                  },
                  ...state.employees,
                ],
              }));
              notification({
                title: "",
                message,
                type: "success",
              });
            } else {
              if (statusCode === 400) {
                set({ errors: data });
              }

              notification({
                title: "",
                message: message,
                type: "danger",
              });
            }
            set({ isLoading: false });
            return success;
          } catch (err) {
            set({ isLoading: false });
            notification({
              title: "",
              message: "An unknown error occured, please try again later",
              type: "danger",
            });
            return false;
          }
        },
        addEmployer: async (employer) => {
          try {
            set({ isLoading: true });
            const response = await addEmployer(employer);
            const { success, statusCode, data, message }: any = response;
            if (success) {
              notification({
                title: "",
                message,
                type: "success",
              });
            } else {
              if (statusCode === 400) {
                set({ errors: data });
              }

              notification({
                title: "",
                message: message,
                type: "danger",
              });
            }
            set({ isLoading: false });
            return success;
          } catch (err) {
            set({ isLoading: false });
            notification({
              title: "",
              message: "An unknown error occured, please try again later",
              type: "danger",
            });
            return false;
          }
        },
        assignEmployee: async (roles, stores, employeeId) => {
          try {
            set({ isLoading: true });
            const response = await assignEmployee(roles, stores, employeeId);

            const { success, statusCode, data, message }: any = response;
            if (success) {
              set((state) => ({
                employees: state.employees.map((employee: any) =>
                  employee.id === employeeId ? { ...data } : employee
                ),
              }));
              notification({
                title: "",
                message,
                type: "success",
              });
            } else {
              if (statusCode === 400) {
                set({ errors: data });
              }

              notification({
                title: "",
                message: message,
                type: "danger",
              });
            }
            set({ isLoading: false });
            return success;
          } catch (err) {
            set({ isLoading: false });
            notification({
              title: "",
              message: "An unknown error occured, please try again later",
              type: "danger",
            });
            return false;
          }
        },
        editEmployer: async (name, about) => {
          try {
            set({ isLoading: true });
            const response = await editEmployer(name, about);

            const { success, statusCode, data, message }: any = response;
            if (success) {
              set({ user: data });
              notification({
                title: "",
                message,
                type: "success",
              });
            } else {
              if (statusCode === 400) {
                set({ errors: data });
              }

              notification({
                title: "",
                message: message,
                type: "danger",
              });
            }
            set({ isLoading: false });
            return success;
          } catch (err) {
            set({ isLoading: false });
            notification({
              title: "",
              message: "An unknown error occured, please try again later",
              type: "danger",
            });
            return false;
          }
        },
        updateEmployeeStatus: async (isActive, employeeId) => {
          try {
            set({ isLoading: true });
            const response = await updateEmployeeStatus(isActive, employeeId);

            const { success, statusCode, data, message }: any = response;
            if (success) {
              set((state) => ({
                employees: state.employees.map((employee: any) =>
                  employee.id === employeeId ? { ...data } : employee
                ),
              }));
              notification({
                title: "",
                message,
                type: "success",
              });
            } else {
              if (statusCode === 400) {
                set({ errors: data });
              }

              notification({
                title: "",
                message: message,
                type: "danger",
              });
            }
            set({ isLoading: false });
            return success;
          } catch (err) {
            set({ isLoading: false });
            notification({
              title: "",
              message: "An unknown error occured, please try again later",
              type: "danger",
            });
            return false;
          }
        },
        verifyEmployer: async (email, otp) => {
          try {
            set({ isLoading: true });
            const response = await verifyEmployer(email, otp);

            const { success, statusCode, data, message }: any = response;
            if (success) {
              notification({
                title: "",
                message,
                type: "success",
              });
            } else {
              if (statusCode === 400) {
                set({ errors: data });
              }

              notification({
                title: "",
                message: message,
                type: "danger",
              });
            }
            set({ isLoading: false });
            return success;
          } catch (err) {
            set({ isLoading: false });
            notification({
              title: "",
              message: "An unknown error occured, please try again later",
              type: "danger",
            });
            return false;
          }
        },
        resetPassword: async (resetPassword, isEmployer) => {
          try {
            set({ isLoading: true });
            const response = await resetUserPassword(resetPassword, isEmployer);

            const { success, statusCode, data, message }: any = response;
            if (success) {
              notification({
                title: "",
                message,
                type: "success",
              });
            } else {
              if (statusCode === 400) {
                set({ errors: data });
              }

              notification({
                title: "",
                message: message,
                type: "danger",
              });
            }
            set({ isLoading: false });
            return success;
          } catch (err) {
            set({ isLoading: false });
            notification({
              title: "",
              message: "An unknown error occured, please try again later",
              type: "danger",
            });
            return false;
          }
        },
        getOtp: async (email) => {
          set({ isLoading: true });
          const response = await getOtp(email);
          const { success, statusCode, data, message } = response;
          if (statusCode === 400) {
            set({ errors: data });
          }
          notification({
            title: "",
            message: message,
            type: success ? "success" : "danger",
          });
          set({ isLoading: false });
        },
        deleteEmployee: async (employeeId) => {
          try {
            set({ isLoading: true });
            const response = await deleteEmployee(employeeId);
            const { success, statusCode, data, message }: any = response;
            if (success) {
              set((state) => ({
                employees: state.employees.filter((employee: any) => employee.id !== employeeId),
              }));
              notification({
                title: "",
                message,
                type: "success",
              });
            } else {
              if (statusCode === 400) {
                set({ errors: data });
              }

              notification({
                title: "",
                message: message,
                type: "danger",
              });
            }
            set({ isLoading: false });
            return success;
          } catch (err) {
            set({ isLoading: false });
            notification({
              title: "",
              message: "An unknown error occured, please try again later",
              type: "danger",
            });
            return false;
          }
        },
      }),
      { name: "userstate" }
    )
  )
);

export default useUserStore;
