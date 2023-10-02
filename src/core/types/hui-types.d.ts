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
}
