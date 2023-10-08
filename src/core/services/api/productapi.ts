import { apicall } from "./apicall";

export const getProducts = (ownerId: string, param: SearchParam) =>
  apicall({
    endpoint: "products",
    param: ownerId,
    pQuery: {
      category: param?.category,
      page: param?.page,
      count: param?.count,
    },
    method: "GET",
  });

export const addProducts = (product: NewProduct) =>
  apicall({
    endpoint: "products",
    body: { ...product },
    method: "POST",
    auth: true,
  });

export const updateProductDetails = (
  details: ProductDetail,
  productId: string
) =>
  apicall({
    endpoint: "products",
    body: { ...details },
    param: productId,
    method: "PUT",
    auth: true,
  });

export const updateProductPrice = (price: ProductPrice, productId: string) =>
  apicall({
    endpoint: "products",
    body: { ...price },
    param: `${productId}/price`,
    method: "PUT",
    auth: true,
  });

export const updateProductListing = (
  listing: ProductListing,
  productId: string
) =>
  apicall({
    endpoint: "products",
    body: { ...listing },
    param: `${productId}/listing`,
    method: "PUT",
    auth: true,
  });
