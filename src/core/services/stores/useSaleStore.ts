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
  getWebsaleById,
  getWebsales,
  updateSaleStatus,
  updateWebsalePaymentStatus,
  updateWebsaleStatus,
} from "../api/salesapi";

// Zustand implementation
type SaleState = {
  isLoading: boolean;
  errors: any | {};
  salesList: SaleList;
  sale: Sale;
  webSale: Websale;
  analytics: SaleAnalytics;
  salesForTax: SalesForTax;
  websalesList: WebsaleList;
  reset: () => void;
  updateError: (name: string) => void;
  clearError: () => void;
  getBusinessSales: (param: StoreSearch) => void;
  getSaleAnalytics: (storeId: string, frequency: string, date: string) => void;
  getWebsales: (employerId: string, param: WebsaleSearch) => void;
  getStoreSales: (storeId: string, param: StoreSearch) => void;
  generateSales: (invoice: Invoice, storeId: string) => void;
  updateSaleStatus: (status: string, salesId: string) => void;
  updateWebsaleStatus: (
    employerId: string,
    websaleStatus: WebsaleStatus
  ) => void;
  updateWebsalePaymentStatus: (
    employerId: string,
    paymentStatus: WebsalePaymentStatus
  ) => void;
  getSalesById: (invoiceId: string) => void;
  getWebsaleById: (employerId: string, invoiceId: string) => void;
  getSaleForTax: (storeId: string, amount: number) => void;
};

const defaults: any = {
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
  webSale: null,
  salesForTax: {
    business: "",
    profitOrLossBeforeExpenseAndTax: 0,
    sales: [],
    totalCost: 0,
    totalSales: 0,
  },
};

const useSaleStore = create<SaleState>()(
  devtools(
    persist(
      (set, get): SaleState => ({
        ...defaults,
        reset: () => {
          set({
            ...defaults,
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
        getWebsaleById: async (employerId, invoiceId) => {
          set({ isLoading: true });
          const response = await getWebsaleById(employerId, invoiceId);
          const { success, data } = response;
          if (success) {
            set({ webSale: data });
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
        getWebsales: async (employerId, param) => {
          set({ isLoading: true });
          const response = await getWebsales(employerId, param);
          const { success, data } = response;
          if (success) {
            set({ websalesList: data });
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
        updateWebsaleStatus: async (employerId, websaleStatus) => {
          try {
            set({ isLoading: true });
            const response = await updateWebsaleStatus(
              employerId,
              websaleStatus
            );

            const { success, statusCode, data, message } = response;
            if (success) {
              set((state) => ({
                websalesList: {
                  ...state.websalesList,
                  items: state.websalesList?.items?.map((sale) =>
                    sale.id === websaleStatus?.saleId ? { ...data } : sale
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
        updateWebsalePaymentStatus: async (employerId, paymentStatus) => {
          try {
            set({ isLoading: true });
            const response = await updateWebsalePaymentStatus(
              employerId,
              paymentStatus
            );

            const { success, statusCode, data, message } = response;
            if (success) {
              set((state) => ({
                websalesList: {
                  ...state.websalesList,
                  items: state.websalesList?.items?.map((sale) =>
                    sale.id === paymentStatus?.saleId ? { ...data } : sale
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
