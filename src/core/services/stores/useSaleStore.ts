import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import notification from "core/services/notification";
import {
  generateSales,
  getBusinessSales,
  getStoreSales,
  updateSaleStatus,
} from "../api/salesapi";

// Zustand implementation
type SaleState = {
  isLoading: boolean;
  errors: any | {};
  salesList: CatalogList;
  updateError: (name: string) => void;
  clearError: () => void;
  getBusinessSales: (param: StoreSearch, token: string) => void;
  getStoreSales: (storeId: string, param: StoreSearch, token: string) => void;
  generateSales: (invoice: Invoice, storeId: string, token: string) => void;
  updateSaleStatus: (status: string, salesId: string, token: string) => void;
};

const useSaleStore = create<SaleState>()(
  devtools(
    persist(
      (set, get): SaleState => ({
        isLoading: false,
        errors: {},
        salesList: {
          items: [],
          currentPage: 0,
          totalItem: 0,
          totalPage: 0,
        },
        updateError: (name) =>
          set((state) => ({
            errors: {
              ...state.errors,
              [name]: "",
            },
          })),
        clearError: () => {
          set({ errors: {} });
        },
        getBusinessSales: async (param, token) => {
          set({ isLoading: true });
          const response = await getBusinessSales(param, token);
          const { success, data } = response;
          if (success) {
            set({ salesList: data });
          }
          set({ isLoading: false });
        },
        getStoreSales: async (storeId, param, token) => {
          set({ isLoading: true });
          const response = await getStoreSales(storeId, param, token);
          const { success, data } = response;
          if (success) {
            set({ salesList: data });
          }
          set({ isLoading: false });
        },
        generateSales: async (invoice, storeId, token) => {
          try {
            set({ isLoading: true });
            const response = await generateSales(invoice, storeId, token);
            const { success, statusCode, data, message } = response;
            if (success) {
              set((state) => ({
                salesList: {
                  ...state.salesList,
                  items: [
                    {
                      ...data,
                    },
                    ...state.salesList.items,
                  ],
                },
              }));
              notification({
                message,
                type: "success",
              });
            } else {
              if (statusCode === 400) {
                set({ errors: data });
              }

              notification({
                message: message,
                type: "danger",
              });
            }
            set({ isLoading: false });
            return success;
          } catch (err) {
            set({ isLoading: false });
            notification({
              message: "An unknown error occured, please try again later",
              type: "danger",
            });
            return false;
          }
        },
        updateSaleStatus: async (status, salesId, token) => {
          try {
            set({ isLoading: true });
            const response = await updateSaleStatus(status, salesId, token);

            const { success, statusCode, data, message } = response;
            if (success) {
              set((state) => ({
                salesList: {
                  ...state.salesList,
                  items: state.salesList?.items?.map((sale: any) =>
                    sale.id === salesId ? { ...data } : sale
                  ),
                },
              }));
              notification({
                message,
                type: "success",
              });
            } else {
              if (statusCode === 400) {
                set({ errors: data });
              }

              notification({
                message: message,
                type: "danger",
              });
            }
            set({ isLoading: false });
            return success;
          } catch (err) {
            set({ isLoading: false });
            notification({
              message: "An unknown error occured, please try again later",
              type: "danger",
            });
            return false;
          }
        },
      }),
      { name: "salestate" }
    )
  )
);

export default useSaleStore;
