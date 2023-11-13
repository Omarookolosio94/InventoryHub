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
    unit: string,
    itemPerPack: number;
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

  interface Sale {}

  interface SaleList {
    items: Sales[];
    totalPage: number;
    currentPage: number;
    totalItem: number;
  }

  interface SalesForTax {
    business: string;
    sales: Sales[];
    totalSales: number;
    totalCost: number;
    profitOrLossBeforeExpenseAndTax: number;
  }

  interface NewEmployer {
    name: string;
    email: string;
    password: string;
  }

  interface ResetPassword {
    email: string;
    newPassword: string;
    otp: string;
  }

  interface NewEmployee {
    name: string;
    email: string;
    staffId: string;
    roles: string[];
    assignedStoreIds: string[];
  }

  interface Employee {}

  interface SaleAnalytics {
    business: string;
    frequency: string;
    totalSales: number;
    totalCost: number;
    profitOrLossBeforeExpenseAndTax: number;
    totalDeliveryFee: number;
    totalTax: number;
    salesRecords: SalesRecord[] | any;
  }

  interface SalesRecord {
    productName: string;
    totalCostPrice: number;
    totalSellingPrice: number;
    totalUnitsSold: number;
  }
}
