import { apicall } from "./apicall";

export const deleteStore = (storeId: string) =>
  apicall({
    endpoint: "store",
    param: storeId,
    method: "DELETE",
    auth: true,
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

export const addStore = (store: any) =>
  apicall({
    endpoint: "store",
    body: { ...store },
    method: "POST",
    auth: true,
  });

export const updateStore = (store: any, storeId: string) =>
  apicall({
    endpoint: "store",
    body: { ...store },
    param: storeId,
    method: "PUT",
    auth: true,
  });

export const updateStatus = (storeStatus: any, storeId: string) =>
  apicall({
    endpoint: "store",
    body: { ...storeStatus },
    param: `${storeId}/status`,
    method: "PUT",
    auth: true,
  });
