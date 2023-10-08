import { apicall } from "./apicall";

export const getCategories = (ownerId: string) =>
  apicall({
    endpoint: "categories",
    param: ownerId,
    method: "GET",
  });

export const addCategories = (category: AddCategory) =>
  apicall({
    endpoint: "categories",
    body: { ...category },
    method: "POST",
    auth: true,
  });

export const updateCategory = (
  category: AddCategory,
  categoryId: string,

) =>
  apicall({
    endpoint: "categories",
    body: { ...category },
    param: categoryId,
    method: "PUT",
    auth: true,
  });

export const deleteCategory = (categoryId: string) =>
  apicall({
    endpoint: "categories",
    param: categoryId,
    method: "DELETE",
    auth: true,
  });
