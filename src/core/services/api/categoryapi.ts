import { apicall } from "./apicall";

export const getCategories = (ownerId: string) =>
  apicall({
    endpoint: "categories",
    param: ownerId,
    method: "GET",
  });

export const addCategories = (category: AddCategory, token: string) =>
  apicall({
    endpoint: "categories",
    body: { ...category },
    method: "POST",
    token,
  });

export const updateCategory = (
  category: AddCategory,
  categoryId: string,
  token: string
) =>
  apicall({
    endpoint: "categories",
    body: { ...category },
    param: categoryId,
    method: "PUT",
    token,
  });

export const deleteCategory = (categoryId: string, token: string) =>
  apicall({
    endpoint: "categories",
    param: categoryId,
    method: "DELETE",
    token,
  });
