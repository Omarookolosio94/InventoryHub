import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import notification from "core/services/notification";
import {
  generateSales,
  getBusinessSales,
  getSalesAnalytics,
  getSalesById,
  getSalesForTax,
  getStoreSales,
  updateSaleStatus,
} from "../api/salesapi";

// Zustand implementation
type SaleState = {
  isLoading: boolean;
  errors: any | {};
  salesList: SaleList;
  sale: Sale;
  analytics: SaleAnalytics;
  salesForTax: SalesForTax;
  websalesList: WebsaleList;
  reset: () => void;
  updateError: (name: string) => void;
  clearError: () => void;
  getBusinessSales: (param: StoreSearch) => void;
  getSaleAnalytics: (storeId: string, frequency: string, date: string) => void;
  getStoreSales: (storeId: string, param: StoreSearch) => void;
  generateSales: (invoice: Invoice, storeId: string) => void;
  updateSaleStatus: (status: string, salesId: string) => void;
  getSalesById: (invoiceId: string) => void;
  getSaleForTax: (storeId: string, amount: number) => void;
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
        websalesList: {
          items: [],
          currentPage: 0,
          totalItem: 0,
          totalPage: 0,
        },
        analytics: null,
        sale: null,
        salesForTax: {
          business: "",
          profitOrLossBeforeExpenseAndTax: 0,
          sales: [],
          totalCost: 0,
          totalSales: 0,
        },
        reset: () => {
          set({
            isLoading: false,
            errors: {},
            salesList: {
              items: [],
              currentPage: 0,
              totalItem: 0,
              totalPage: 0,
            },
            analytics: null,
            sale: null,
            salesForTax: {
              business: "",
              profitOrLossBeforeExpenseAndTax: 0,
              sales: [],
              totalCost: 0,
              totalSales: 0,
            },
          });
          sessionStorage.removeItem("salestate");
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
        getSalesById: async (invoiceId) => {
          set({ isLoading: true });
          const response = await getSalesById(invoiceId);
          const { success, data } = response;
          if (success) {
            set({ sale: data });
          }
          set({ isLoading: false });
        },
        getSaleAnalytics: async (storeId, frequency, date) => {
          set({ isLoading: true });
          const response = await getSalesAnalytics(storeId, frequency, date);
          const { success, data } = response;
          if (success) {
            set({ analytics: data });
          }
          set({ isLoading: false });
        },
        getBusinessSales: async (param) => {
          set({ isLoading: true });
          const response = await getBusinessSales(param);
          const { success, data } = response;
          if (success) {
            set({ salesList: data });
          }
          set({ isLoading: false });
        },
        getStoreSales: async (storeId, param) => {
          set({ isLoading: true });
          const response = await getStoreSales(storeId, param);
          const { success, data } = response;
          if (success) {
            set({ salesList: data });
          }
          set({ isLoading: false });
        },
        getSaleForTax: async (storeId, amount) => {
          set({ isLoading: true });
          const response = await getSalesForTax(storeId, amount);
          const { success, data } = response;
          if (success) {
            set({ salesForTax: data });
          }
          set({ isLoading: false });
        },
        generateSales: async (invoice, storeId) => {
          try {
            set({ isLoading: true });
            const response = await generateSales(invoice, storeId);
            const { success, statusCode, data, message } = response;
            if (success) {
              set((state) => ({
                salesList: {
                  ...state.salesList,
                  totalItem: state.salesList.totalItem + 1,
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
            return response;
          } catch (err) {
            set({ isLoading: false });
            notification({
              message: "An unknown error occured, please try again later",
              type: "danger",
            });
            return { success: false, statusCode: 500, data: {}, message: "" };
          }
        },
        updateSaleStatus: async (status, salesId) => {
          try {
            set({ isLoading: true });
            const response = await updateSaleStatus(status, salesId);

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
      { name: "salestate", storage: createJSONStorage(() => sessionStorage) }
    )
  )
);

export default useSaleStore;
