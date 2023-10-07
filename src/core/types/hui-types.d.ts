export {};

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */

  interface RoutesType {
    name: string;
    layout: string;
    component: JSX.Element;
    icon: JSX.Element | string;
    path: string;
    secondary?: boolean;
  }

  interface Shop {}

  interface Product {}

  interface ProductList {
    items: Product[];
    totalPage: number;
    currentPage: number;
    totalItem: number;
  }

  interface NewProduct extends ProductDetail, ProductPrice, ProductListing {}

  interface AddCategory {
    name: string;
    description: string;
  }

  interface Category {
    id: string;
    employerId: string;
    name: string;
    description: string;
    addedBy: string;
    updatedBy: string;
    dateAdded: string;
    lastUpdated: string;
  }

  interface AddCatalog extends UpdateCatalog {
    productId: string;
    storeId: string;
  }

  interface UpdateCatalog {
    stock: number;
    differentialPercent: number;
    isListed: boolean;
  }

  interface SelectOptions {
    name: string;
    value: string;
  }

  interface ProductDetail {
    name: string;
    description: string;
    categoryId: string;
    tags: string;
    manufacturedBy: string;
    size: string;
    color: string;
    comments: string;
    manufacturingDate: string;
    expiringDate: string;
  }

  interface ProductPrice {
    costPrice: number;
    sellingPrice: number;
    discountPercent: number;
  }

  interface ProductListing {
    isListed: boolean;
  }

  interface SearchParam {
    category: string;
    page: number;
    count: number;
  }

  interface StoreSearch {
    storeId: string;
    status: string;
    page: number;
    count: number;
  }

  interface Catalog {}

  interface CatalogList {
    items: Catalog[];
    totalPage: number;
    currentPage: number;
    totalItem: number;
  }

  interface Invoice {
    storeId: string;
    paymentMethod: string;
    billType: string;
    carts: Cart[];
    customerName: string;
    customerAddress: string;
    customerEmail: string;
    customerPhone: string;
  }

  interface Cart {
    catalogId: string;
    quantity: number;
  }
}
