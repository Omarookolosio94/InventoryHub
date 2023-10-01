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

export const deleteStore = (storeId: string, token: string) =>
  apicall({
    endpoint: "store",
    param: storeId,
    method: "DELETE",
    token,
  });

export const getStore = (storeId: string) =>
  apicall({
    endpoint: "store",
    param: storeId,
    method: "GET",
  });

export const getStores = (ownerId: string) =>
  apicall({
    endpoint: "getStores",
    param: ownerId,
    method: "GET",
  });

export const addStore = (store: any, token: string) =>
  apicall({
    endpoint: "store",
    body: { ...store },
    method: "POST",
    token,
  });

export const updateStore = (store: any, storeId: string, token: string) =>
  apicall({
    endpoint: "store",
    body: { ...store },
    param: storeId,
    method: "PUT",
    token,
  });

export const updateStatus = (
  storeStatus: any,
  storeId: string,
  token: string
) =>
  apicall({
    endpoint: "store",
    body: { ...storeStatus },
    param: `${storeId}/status`,
    method: "PUT",
    token,
  });
