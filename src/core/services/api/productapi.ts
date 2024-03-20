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

export const addProducts = (product: NewProduct) => {
  const data = new FormData();

  data.append("Name", product?.name);
  data.append("Description", product?.description);
  data.append("CategoryId", product?.categoryId);
  data.append("Tags", product?.tags);
  data.append("ManufacturedBy", product?.manufacturedBy);
  data.append("Size", product?.size);
  data.append("Color", product?.color);
  data.append("Unit", product?.unit);
  data.append("ItemPerPack", `${product?.itemPerPack}`);
  data.append("Comments", product?.comments);
  data.append("CostPrice", `${product?.costPrice}`);
  data.append("SellingPrice", `${product?.sellingPrice}`);
  data.append("DiscountPercent", `${product?.discountPercent}`);
  data.append("isListed", `${product?.isListed}`);
  data.append("ManufacturingDate", product?.manufacturingDate);
  data.append("ExpiringDate", product?.expiringDate);

  if (product?.gallery?.length > 0) {
    Array.from(product?.gallery)?.forEach((file: any, i: any) => {
      data.append(`Gallery`, file);
    });
  }

  return apicall({
    endpoint: "products",
    body: data,
    method: "POST",
    multipart: true,
    auth: true,
  });
};

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

export const updateGallery = (gallery: any, productId: string) => {
  const data = new FormData();

  if (gallery != null && gallery?.gallery?.length > 0) {
    Array.from(gallery?.gallery)?.forEach((file: any, i: any) => {
      data.append(`Gallery`, file);
    });
  }

  return apicall({
    endpoint: "products",
    param: `${productId}/gallery`,
    body: data,
    multipart: true,
    method: "PUT",
    auth: true,
  });
};
