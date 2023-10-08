import { apicall } from "./apicall";

export const getCatalog = (storeId: string, param: SearchParam) =>
  apicall({
    endpoint: "catalogs",
    param: storeId,
    pQuery: {
      category: param?.category,
      page: param?.page,
      count: param?.count,
    },
    method: "GET",
  });

export const searchCatalog = (storeId: string, name: string) =>
  apicall({
    endpoint: "catalogs",
    param: "search",
    pQuery: {
      storeId,
      name,
    },
    method: "GET",
  });

export const addCatalog = (catalog: AddCatalog) =>
  apicall({
    endpoint: "catalogs",
    body: { ...catalog },
    method: "POST",
    auth: true,
  });

export const updateCatalog = (catalog: UpdateCatalog, catalogId: string) =>
  apicall({
    endpoint: "catalogs",
    body: { ...catalog },
    param: catalogId,
    method: "PUT",
    auth: true,
  });
