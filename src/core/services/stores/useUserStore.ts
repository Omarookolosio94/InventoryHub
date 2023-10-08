import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import notification from "core/services/notification";
import { login } from "../api/userapi";

// Zustand implementation
type UserState = {
  isLoading: boolean;
  isEmployer: boolean;
  errors: any | {};
  user: any | {};
  login: (email: string, password: string, isEmployeer: boolean) => void;
  updateError: (name: string) => void;
};

const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get): UserState => ({
        isLoading: false,
        isEmployer: false,
        user: {},
        errors: {},
        updateError: (name) =>
          set((state) => ({
            errors: {
              ...state.errors,
              [name]: "",
            },
          })),
        login: async (email, password, isEmployeer) => {
          try {
            set({ isLoading: true });
            const response = await login(email, password, isEmployeer);
            const { success, statusCode, data, message } = response;
            set({ isEmployer: isEmployeer });
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
      }),
      { name: "userstate" }
    )
  )
);

export default useUserStore;
