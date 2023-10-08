import { apicall } from "./apicall";

export const getStoreSales = (storeId: string, param: StoreSearch) =>
  apicall({
    endpoint: "sales",
    param: `stores/${storeId}`,
    pQuery: {
      storeId: param?.storeId,
      status: param?.status,
      page: param?.page,
      count: param?.count,
    },
    method: "GET",
    auth: true,
  });

export const getBusinessSales = (param: StoreSearch) =>
  apicall({
    endpoint: "sales",
    param: "business",
    pQuery: {
      storeId: param?.storeId,
      status: param?.status,
      page: param?.page,
      count: param?.count,
    },
    method: "GET",
    auth: true,
  });

export const getSalesById = (invoiceId: string) =>
  apicall({
    endpoint: "sales",
    param: invoiceId,
    method: "GET",
  });

export const generateSales = (invoice: Invoice, storeId: string) =>
  apicall({
    endpoint: "sales",
    param: storeId,
    body: { ...invoice },
    method: "POST",
    auth: true,
  });

export const updateSaleStatus = (status: string, salesId: string) =>
  apicall({
    endpoint: "sales",
    body: { status: status },
    param: `${salesId}/status`,
    method: "PUT",
    auth: true,
  });
