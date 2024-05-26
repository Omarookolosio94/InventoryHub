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

  interface Product {
    id: string;
    name: string;
    description: string | null;
    categoryId: string | null;
    category: Category | null;
    tags: string | null;
    gallery: ProductGallery[];
    manufacturedBy: string | null;
    qrCodeUrl: string | null;
    size: string;
    color: string;
    unit: string;
    itemPerPack: number;
    comments: string;
    costPrice: number;
    sellingPrice: number;
    discountPercent: number;
    isListed: boolean;
    addedBy: string;
    updatedBy: string;
    manufacturingDate: string | null;
    expiringDate: string | null;
    dateAdded: string;
    lastUpdated: string;
    employerId: string;
  }

  interface ProductGallery {
    id: string;
    name: string;
    url: string;
    isDefault: string;
  }

  interface ProductList {
    items: Product[];
    totalPage: number;
    currentPage: number;
    totalItem: number;
  }

  interface NewProduct extends ProductDetail, ProductPrice, ProductListing {
    gallery: Blob[] | any;
  }

  interface UpdateEmployer {
    name: string;
    logo: Blob[] | any;
    about: string;
    caption: string;
    services: string;
    termsAndConditions: string;
    privacyPolicy: string;
    legalDocument: string;
    headOfficeAddress: string;
    contactLine: string;
    weblink: string;
  }

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
    unit: string;
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

  interface Cart {
    productId: string;
    productName: string;
    unitPriceAtPurchase: number;
    costPriceAtPurchase: number;
    quantity: number;
    unit: string;
    quantityNarration: string;
  }

  interface TimeLine {
    process: string;
    initiatedBy: string;
    instruction: string;
  }

  interface Websale {
    cart: Cart[];
    id: string;
    code: string;
    cartTotal: number;
    tax: number;
    deliveryFee: number;
    totalPaid: number;
    status: string;
    paymentMethod: string;
    deliveryMethod: string;
    isPaid: boolean;
    customerName: string;
    deliveryAddress: string;
    state: string;
    lga: string;
    customerEmail: string;
    customerPhone: string;
    businessName: string;
    datePaid: string | null;
    dateAdded: string;
    lastUpdated: string;
    timeLine: TimeLine[];
    lastUpdatedBy: string;
    employerId: string;
    employer: Employer;
  }

  interface Employer {
    id: string;
    name: string;
    email: string;
    logo: BusinessGallery[];
    about: string;
    caption: string;
    services: string;
    termsAndConditions: string;
    privacyPolicy: string;
    legalDocument: string;
    headOfficeAddress: string;
    contactLine: string;
    weblink: string;
    isVerified: true;
    dateRegistered: string;
    lastUpdated: string;
  }

  interface BusinessGallery {
    id: string;
    name: string;
    url: string;
    isDefault: true;
  }

  interface WebsaleList {
    items: Websale[];
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

  interface WebsaleSearch {
    status: string;
    page: number;
    count: number;
  }

  interface WebsaleStatus {
    saleId: string;
    status: string;
    instruction: string;
    deliveryFee: number;
  }

  interface WebsalePaymentStatus {
    saleId: string;
    isPaid: boolean;
  }
}
