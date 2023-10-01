import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
  addStore,
  deleteStore,
  getStores,
  login,
  updateStatus,
  updateStore,
} from "core/services/api/storeapi";
import notification from "core/services/notification";

// Zustand implementation
type ShopState = {
  isLoading: boolean;
  isEmployer: boolean;
  errors: any | {};
  user: any | {};
  shops: Shop[];
  login: (email: string, password: string, isEmployeer: boolean) => void;
  updateError: (name: string) => void;
  getShops: (employerId: string) => void;
  addStore: (store: any) => void;
  updateStore: (store: any, storeId: string) => void;
  updateStoreStatus: (status: any, storeId: string) => void;
  deleteStore: (storeId: string) => void;
};

const useShopStore = create<ShopState>()(
  devtools(
    persist(
      (set, get): ShopState => ({
        isLoading: false,
        isEmployer: false,
        user: {},
        errors: {},
        shops: [],
        updateError: (name) =>
          set((state) => ({
            errors: {
              ...state.errors,
              [name]: "",
            },
          })),
        login: async (email, password, isEmployeer) => {
          try {
            console.log(get().shops);
            set({ isLoading: true });
            const response = await login(email, password, isEmployeer);
            const { success, statusCode, data, message } = response;
            set({ isEmployer: isEmployeer });
            if (success) {
              set({ user: data });
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
            console.log(get().shops);
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
        getShops: async (employerId: string) => {
          set({ isLoading: true });
          const response = await getStores(employerId);
          set({ shops: response?.data });
          set({ isLoading: false });
        },
        addStore: async (store) => {
          try {
            set({ isLoading: true });
            const response = await addStore(store, get().user?.token);
            const { success, statusCode, data, message } = response;
            if (success) {
              set((state) => ({
                shops: [
                  {
                    ...data,
                  },
                  ...state.shops,
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
        updateStore: async (store, storeId) => {
          try {
            set({ isLoading: true });
            const response = await updateStore(
              store,
              storeId,
              get().user?.token
            );

            const { success, statusCode, data, message } = response;
            if (success) {
              set((state) => ({
                shops: state.shops.map((shop: any) =>
                  shop.id === storeId ? { ...data } : shop
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
        updateStoreStatus: async (status, storeId) => {
          try {
            set({ isLoading: true });
            const response = await updateStatus(
              status,
              storeId,
              get().user?.token
            );

            const { success, statusCode, data, message } = response;
            if (success) {
              set((state) => ({
                shops: state.shops.map((shop: any) =>
                  shop.id === storeId ? { ...data } : shop
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
        deleteStore: async (storeId) => {
          try {
            set({ isLoading: true });
            const response = await deleteStore(storeId, get().user?.token);

            const { success, statusCode, data, message } = response;
            if (success) {
              set((state) => ({
                shops: state.shops.filter((shop: any) => shop.id !== storeId),
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
      { name: "shopstate" }
    )
  )
);

export default useShopStore;
