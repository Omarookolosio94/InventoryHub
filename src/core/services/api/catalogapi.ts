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

export const addCatalog = (catalog: AddCatalog, token: string) =>
  apicall({
    endpoint: "catalogs",
    body: { ...catalog },
    method: "POST",
    token,
  });

export const updateCatalog = (
  catalog: UpdateCatalog,
  catalogId: string,
  token: string
) =>
  apicall({
    endpoint: "catalogs",
    body: { ...catalog },
    param: catalogId,
    method: "PUT",
    token,
  });