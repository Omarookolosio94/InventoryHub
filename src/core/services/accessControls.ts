export const Roles = {
  Inventory: "INVENTORY",
  Sales: "SALES",
  Manager: "MANAGER",
  Ceo: "CEO",
};

const ACCESS_LEVEL: any = {
  catalog: {
    [Roles.Inventory]: "READ,WRITE,UPDATE,DELETE",
    [Roles.Sales]: "READ",
    [Roles.Manager]: "READ,WRITE,UPDATE,DELETE",
    [Roles.Ceo]: "READ,WRITE,UPDATE,DELETE",
  },
  category: {
    [Roles.Inventory]: "READ,WRITE,UPDATE,DELETE",
    [Roles.Sales]: "READ",
    [Roles.Manager]: "READ,WRITE,UPDATE,DELETE",
    [Roles.Ceo]: "READ,WRITE,UPDATE,DELETE",
  },
  product: {
    [Roles.Inventory]: "READ,WRITE,UPDATE,DELETE",
    [Roles.Sales]: "READ",
    [Roles.Manager]: "READ,WRITE,UPDATE,DELETE",
    [Roles.Ceo]: "READ,WRITE,UPDATE,DELETE",
  },
  sale: {
    [Roles.Inventory]: "READ",
    [Roles.Sales]: "READ,WRITE,UPDATE",
    [Roles.Manager]: "READ,WRITE,UPDATE",
    [Roles.Ceo]: "READ,WRITE,UPDATE",
  },
  shop: {
    [Roles.Inventory]: "READ",
    [Roles.Sales]: "READ",
    [Roles.Manager]: "READ,UPDATE",
    [Roles.Ceo]: "READ,WRITE,UPDATE,DELETE",
  },
  employee: {
    [Roles.Inventory]: "READ",
    [Roles.Sales]: "READ",
    [Roles.Manager]: "READ,WRITE,UPDATE",
    [Roles.Ceo]: "READ,WRITE,UPDATE,DELETE",
  },
};

export const getAccess = (role: string) => {
  var names: string[] = Object.keys(ACCESS_LEVEL);
  var userAccess: any = {};

  names.forEach((name) => {
    var acc: any = ACCESS_LEVEL[name][role];
    userAccess[name] = acc !== undefined ? acc : "";
  });

  return userAccess;
};
