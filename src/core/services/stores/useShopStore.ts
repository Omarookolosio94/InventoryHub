import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import {
  addStore,
  deleteStore,
  getStore,
  getStores,
  updateStatus,
  updateStore,
} from "core/services/api/storeapi";
import notification from "core/services/notification";

// Zustand implementation
type ShopState = {
  isLoading: boolean;
  isEmployer: boolean;
  errors: any | {};
  shops: Shop[];
  shop: {};
  reset: () => void;
  updateError: (name: string) => void;
  getShops: (employerId: string) => void;
  getShop: (storeId: string) => void;
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
        errors: {},
        shops: [],
        shop: {},
        reset: () => {
          set({
            isLoading: false,
            isEmployer: false,
            errors: {},
            shops: [],
            shop: {},
          });
          sessionStorage.removeItem("shopstate");
        },
        updateError: (name) =>
          set((state) => ({
            errors: {
              ...state.errors,
              [name]: "",
            },
          })),
        getShops: async (employerId: string) => {
          set({ isLoading: true });
          const response = await getStores(employerId);
          const { success, data } = response;
          if (success) {
            set({ shops: data });
          }
          set({ isLoading: false });
        },
        getShop: async (storeId: string) => {
          set({ isLoading: true });
          const response = await getStore(storeId);
          const { success, data } = response;
          if (success) {
            set({ shop: data });
          }
          set({ isLoading: false });
        },
        addStore: async (store) => {
          try {
            set({ isLoading: true });
            const response = await addStore(store);
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
            const response = await updateStore(store, storeId);

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
            const response = await updateStatus(status, storeId);

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
            const response = await deleteStore(storeId);

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
      { name: "shopstate", storage: createJSONStorage(() => sessionStorage) }
    )
  )
);

export default useShopStore;
