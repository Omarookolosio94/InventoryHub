import { apicall } from "./apicall";

export const getStoreSales = (
  storeId: string,
  param: StoreSearch,
  token: string
) =>
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
    token,
  });

export const getBusinessSales = (param: StoreSearch, token: string) =>
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
    token,
  });

export const generateSales = (
  invoice: Invoice,
  storeId: string,
  token: string
) =>
  apicall({
    endpoint: "sales",
    param: storeId,
    body: { ...invoice },
    method: "POST",
    token,
  });

export const updateSaleStatus = (
  status: string,
  salesId: string,
  token: string
) =>
  apicall({
    endpoint: "sales",
    body: { status: status },
    param: `${salesId}/status`,
    method: "PUT",
    token,
  });
