/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/style-prop-object */
import { useEffect, useState, useRef } from "react";
import SubHeader from "core/components/subHeader";
import Card from "core/components/card";
import useUserStore from "core/services/stores/useUserStore";
import useShopStore from "core/services/stores/useShopStore";
import InputField from "core/components/fields/InputField";
import useSaleStore from "core/services/stores/useSaleStore";
import TextField from "core/components/fields/TextField";
import useCatalogStore from "core/services/stores/useCatalogStore";
import SelectField from "core/components/fields/SelectField";
import { Link } from "react-router-dom";
import Button from "core/components/button/Button";
import { FaClipboardList } from "react-icons/fa";
import {
  BILL_TYPE,
  ORDER_STATUS,
  PAYMENT_METHOD,
  customBtn,
} from "core/const/const";
import { formatCurrency, getDate, openInNewTab } from "core/services/helpers";
import { AiOutlinePlus } from "react-icons/ai";
import { FiMinus } from "react-icons/fi";
import Modal from "core/components/modal/Modal";

const PointOfSale = () => {
  const errors = useSaleStore((state) => state.errors);
  const updateError = useSaleStore((state) => state.updateError);
  const clearError = useSaleStore((state) => state.clearError);
  const user = useUserStore((state) => state.user);
  const isEmployer = useUserStore((state) => state.isEmployer);
  const shops: any = useShopStore((state) => state.shops);
  const getShopsAction = useShopStore((state) => state.getShops);
  const catalogs: any = useCatalogStore((state) => state.catalogs);
  const searchCatalogAction = useCatalogStore((state) => state.searchCatalog);
  const generateSaleAction = useSaleStore((state) => state.generateSales);
  const salesList = useSaleStore((state) => state.salesList);
  const getBusinessSalesAction = useSaleStore(
    (state) => state.getBusinessSales
  );
  const getStoreSalesAction = useSaleStore((state) => state.getStoreSales);
  const updateSaleStatusAction = useSaleStore(
    (state) => state.updateSaleStatus
  );
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [generatedSale, setGeneratedSale]: any = useState({});
  const [carts, setCarts] = useState([
    {
      catalogId: "",
      searchProduct: "",
      quantity: 1,
    },
  ]);

  const [search, setSearch] = useState({
    storeId: "",
    status: "",
    page: 1,
    count: 20,
  });

  const onCartChange = (index: number, e: any) => {
    const { name, value }: any = e.target;
    const data: any = [...carts];
    if (name == "searchProduct") {
      data[index]["catalogId"] = catalogs.filter(
        (cat: any) => cat.product.name == value
      )[0]?.id;
      data[index][name] = value;
    } else {
      data[index][name] = value;
    }

    setCarts(data);
    setSalesForm((state: any) => ({ ...state, carts: data }));
  };

  const addCartField = () => {
    setCarts([...carts, { catalogId: "", searchProduct: "", quantity: 1 }]);
  };

  const removeCartField = (index: number) => {
    const data = [...carts];
    data.splice(index, 1);
    setCarts(data);
    setSalesForm((state: any) => ({ ...state, carts: data }));
  };

  const [salesForm, setSalesForm] = useState({
    storeId: "",
    paymentMethod: "",
    billType: "",
    carts: carts,
    customerName: "",
    customerAddress: "",
    customerEmail: "",
    customerPhone: "",
  });

  const onFormChange = (e: any) => {
    const { name, value } = e.target;
    setSalesForm({
      ...salesForm,
      [name]: value,
    });
  };

  const generateSale = async (e: any) => {
    e.preventDefault();
    var response: any = await generateSaleAction(
      {
        ...salesForm,
        carts: carts.map((cart: any) => {
          return {
            ...cart,
            quantity: Number(cart?.quantity),
          };
        }),
      },
      salesForm?.storeId
    );

    if (response?.success) {
      setGeneratedSale(response?.data);
      setOpenConfirmModal(true);
    }
  };

  const clearSale = () => {
    var emptyCart = {
      catalogId: "",
      searchProduct: "",
      quantity: 1,
    };
    setCarts([{ ...emptyCart }]);
    setSalesForm((state) => ({
      ...state,
      paymentMethod: "",
      billType: "",
      carts: [{ ...emptyCart }],
      customerName: "",
      customerAddress: "",
      customerEmail: "",
      customerPhone: "",
    }));
    clearError();
  };

  const updateSaleStatus = async (status: string) => {
    var isSuccessful: any = await updateSaleStatusAction(
      status,
      generatedSale?.id
    );
    if (isSuccessful && status == ORDER_STATUS[1]) {
      openInNewTab(`/general/invoice/${generatedSale?.code}`);
    }
    setOpenConfirmModal(false);
    setGeneratedSale({});
    clearSale();
  };

  const getAssignedShops = (shops: any) => {
    var shopList: any = [];

    if (shops != null && shops?.length > 0) {
      shopList = [
        ...shops?.map((shop: any) => {
          return {
            name: `${shop?.name} - ${shop?.isActive ? "✅" : "❌"}`,
            value: shop?.id,
          };
        }),
      ];
    }

    if (shopList?.length > 0 && !isEmployer) {
      shopList = [
        ...shopList?.filter(
          (list: any) =>
            list?.value?.toLowerCase() ==
            user?.assignedStoreIds[0]?.toLowerCase()
        ),
      ];
    }
    return shopList;
  };

  const fetchSales = (assignedStore: string, search: any) => {
    if (isEmployer) {
      getBusinessSalesAction({
        ...search,
      });
    } else {
      getStoreSalesAction(assignedStore, { ...search });
    }
  };

  useEffect(() => {
    var activeShops = getAssignedShops(shops);
    if (activeShops?.length < 1) {
      getShopsAction(user?.employerId);
    } else {
      setSalesForm((state) => ({ ...state, storeId: activeShops[0]?.value }));
      searchCatalogAction(activeShops[0]?.value, "");
    }
  }, []);

  useEffect(() => {
    if (salesList?.items?.length < 1) {
      fetchSales(isEmployer ? "" : user?.assignedStoreIds[0], {
        ...search,
      });
    }
  }, []);

  // TODO: Open invoice in an iframe
  // TODO: Change pos view

  return (
    <div className="mt-3">
      <Card extra={"w-full h-full mx-4 px-6 pb-6 sm:overflow-x-auto"}>
        <SubHeader
          title={`${
            salesForm?.storeId?.length > 0
              ? `Checkout - ${
                  shops?.filter((s: any) => s.id == salesForm?.storeId)[0]?.name
                }`
              : "Checkout"
          }`}
          showAction={false}
          showSelect={true}
          selectOptions={getAssignedShops(shops)}
          selectValue={salesForm?.storeId}
          selectChange={(e: any) => {
            setSalesForm({
              paymentMethod: "",
              billType: "",
              carts: [
                {
                  catalogId: "",
                  searchProduct: "",
                  quantity: 1,
                },
              ],
              customerName: "",
              customerAddress: "",
              customerEmail: "",
              customerPhone: "",
              storeId: e.target.value,
            });
            setCarts([
              {
                catalogId: "",
                searchProduct: "",
                quantity: 1,
              },
            ]);
            searchCatalogAction(e.target.value, "");
          }}
        />
        {salesForm?.storeId?.length > 1 ? (
          shops?.filter(
            (shop: any) => shop?.id == salesForm?.storeId && shop?.isActive
          )?.length > 0 ? (
            <>
              {catalogs?.length > 0 ? (
                <form onSubmit={(e: any) => generateSale(e)}>
                  <p className="font-xs text-brand-500">Customer:</p>
                  <div className="flex gap-3">
                    <div className="w-1/3">
                      <InputField
                        variant="auth"
                        extra="mb-3"
                        showLabel={false}
                        label="Customer Name"
                        id="customerName"
                        placeholder="Name"
                        name="customerName"
                        value={salesForm?.customerName}
                        onChange={(e: any) => onFormChange(e)}
                      />
                    </div>
                    <div className="w-1/3">
                      <InputField
                        variant="auth"
                        extra="mb-3"
                        showLabel={false}
                        label="Customer Email"
                        id="customerName"
                        type="email"
                        placeholder="Email"
                        name="customerEmail"
                        value={salesForm?.customerEmail}
                        onChange={(e: any) => onFormChange(e)}
                        onFocus={() => {
                          if (
                            errors?.CustomerEmail &&
                            errors?.CustomerEmail?.length > 0
                          ) {
                            updateError("CustomerEmail");
                          }
                        }}
                        error={errors?.CustomerEmail}
                      />
                    </div>
                    <div className="w-1/3">
                      <InputField
                        variant="auth"
                        extra="mb-3"
                        showLabel={false}
                        label="Customer Phone"
                        id="customerPhone"
                        placeholder="Phone Number"
                        name="customerPhone"
                        value={salesForm?.customerPhone}
                        onChange={(e: any) => onFormChange(e)}
                        onFocus={() => {
                          if (
                            errors?.CustomerPhone &&
                            errors?.CustomerPhone?.length > 0
                          ) {
                            updateError("CustomerPhone");
                          }
                        }}
                        error={errors?.CustomerPhone}
                      />
                    </div>
                  </div>

                  <TextField
                    showLabel={false}
                    ref={null}
                    extra="mb-3"
                    rows={5}
                    variant="auth"
                    label="Customer Address"
                    id="customerAddress"
                    type="text"
                    placeholder="Address"
                    name="customerAddress"
                    value={salesForm?.customerAddress}
                    onChange={(e: any) => onFormChange(e)}
                  />
                  <p className="font-xs text-brand-500">
                    Cart:
                    {errors?.Carts != null && errors?.Carts?.length > 0 && (
                      <span className="ml-2 text-xs text-red-500">
                        {errors?.Carts}
                      </span>
                    )}
                  </p>
                  {carts?.map((cart, index) => (
                    <div className="flex items-center gap-3" key={index}>
                      <div className="w-1/4">
                        <InputField
                          variant="auth"
                          extra="mb-3"
                          showLabel={false}
                          label="Product"
                          id="searchProduct"
                          placeholder="Product"
                          name="searchProduct"
                          value={cart?.searchProduct}
                          list="catalogList"
                          onChange={(e: any) => onCartChange(index, e)}
                          enableDataList={true}
                          dataList={
                            catalogs?.length > 0
                              ? [
                                  ...catalogs?.map((cat: any) => {
                                    return {
                                      name: cat?.product?.name,
                                      value: cat?.product?.name,
                                    };
                                  }),
                                ]
                              : []
                          }
                        />
                      </div>
                      <div className="w-1/4">
                        <InputField
                          variant="auth"
                          extra="mb-3"
                          showLabel={false}
                          label="Quantity"
                          id="catalogId"
                          type="number"
                          name="quantity"
                          value={cart?.quantity}
                          onChange={(e: any) => onCartChange(index, e)}
                          onFocus={() => {
                            if (
                              errors?.[`Carts[${index}].Quantity`] &&
                              errors?.[`Carts[${index}].Quantity`]?.length > 0
                            ) {
                              updateError(`Carts[${index}].Quantity`);
                            }
                          }}
                          error={
                            errors?.[`Carts[${index}].Quantity`] &&
                            errors?.[`Carts[${index}].Quantity`]?.length > 0
                              ? errors?.[`Carts[${index}].Quantity`]
                                  ?.join(", ")
                                  ?.toLowerCase()
                              : ""
                          }
                        />
                      </div>
                      <div className="w-1/4">
                        <InputField
                          variant="auth"
                          extra="mb-3"
                          showLabel={false}
                          label="UnitPrice"
                          id="unitPrice"
                          type="text"
                          name="quantity"
                          value={
                            formatCurrency(
                              catalogs?.filter(
                                (s: any) => s.id == cart.catalogId
                              )[0]?.sellingPrice
                            ) + " (unit price)"
                          }
                          disabled
                        />
                      </div>
                      <div className="flex w-1/4 gap-3">
                        <Button
                          style="flex gap-1 m-0 justify-items-center items-center bg-brand-500 hover:bg-brand-600 dark:text-white-300 p-3"
                          onClick={() => {
                            addCartField();
                          }}
                        >
                          <AiOutlinePlus />
                          <span className="text-xs">Add</span>
                        </Button>
                        {carts?.length > 1 && (
                          <Button
                            style="flex gap-1 m-0 justify-items-center items-center bg-red-500 hover:bg-red-600 dark:text-white-300 p-3"
                            onClick={() => {
                              removeCartField(index);
                            }}
                            disabled={carts?.length == 1}
                            onFocus={() => {
                              if (errors?.Carts && errors?.Carts?.length > 0) {
                                updateError("Carts");
                              }
                            }}
                          >
                            <FiMinus />
                            <span className="text-xs">Delete</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="my-5 bg-gray-100 p-[.5px]" />
                  <div className="flex gap-3">
                    <div className="w-1/4">
                      <SelectField
                        label="Bill Type"
                        extra="mb-3"
                        defaultName="Select Bill Type"
                        defaultValue="0"
                        name="billType"
                        options={
                          BILL_TYPE?.length > 0
                            ? [
                                ...BILL_TYPE?.map((type: any) => {
                                  return {
                                    name: type,
                                    value: type,
                                  };
                                }),
                              ]
                            : []
                        }
                        value={salesForm?.billType}
                        onChange={(e: any) => onFormChange(e)}
                        onFocus={() => {
                          if (
                            errors?.BillType &&
                            errors?.BillType?.length > 0
                          ) {
                            updateError("BillType");
                          }
                        }}
                        error={
                          errors?.BillType && errors?.BillType?.length > 0
                            ? errors?.BillType?.join(", ")?.toLowerCase()
                            : ""
                        }
                      />
                    </div>
                    <div className="w-1/4">
                      <SelectField
                        label="Payment Method"
                        extra="mb-3"
                        defaultName="Select Payment Method"
                        defaultValue="0"
                        name="paymentMethod"
                        options={
                          PAYMENT_METHOD?.length > 0
                            ? [
                                ...PAYMENT_METHOD?.map((mode: any) => {
                                  return {
                                    name: mode,
                                    value: mode,
                                  };
                                }),
                              ]
                            : []
                        }
                        value={salesForm?.paymentMethod}
                        onChange={(e: any) => onFormChange(e)}
                        onFocus={() => {
                          if (
                            errors?.PaymentMethod &&
                            errors?.PaymentMethod?.length > 0
                          ) {
                            updateError("PaymentMethod");
                          }
                        }}
                        error={
                          errors?.PaymentMethod &&
                          errors?.PaymentMethod?.length > 0
                            ? errors?.PaymentMethod?.join(", ")?.toLowerCase()
                            : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <div className="flex w-1/4 gap-3">
                      <Button
                        type="button"
                        onClick={() => {
                          clearSale();
                        }}
                        style="linear mb-5 mt-3 w-full rounded-md bg-red-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200 text-xs"
                      >
                        Clear Cart
                      </Button>
                      <button
                        type="submit"
                        className="linear mb-5 mt-3 w-full rounded-md bg-green-500 py-[12px] text-base text-xs font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200"
                      >
                        Generate Receipt
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <>
                  <p className="font-xs text-brand-500">
                    Sales cannot be made as no product has been listed on
                    store's catalog
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <Link
                      to={`/admin/products`}
                      className={`${customBtn} dark:text-white-300 flex items-center justify-items-center gap-1 bg-green-500 hover:bg-green-600`}
                    >
                      <FaClipboardList />
                      <span className="text-xs">Catalog Item</span>
                    </Link>
                    <Link
                      to={`/admin/store/${salesForm?.storeId}`}
                      className={`${customBtn} dark:text-white-300 flex items-center justify-items-center gap-1 bg-yellow-500 hover:bg-yellow-600`}
                    >
                      <FaClipboardList />
                      <span className="text-xs">View Catalog</span>
                    </Link>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <p className="font-xs text-brand-500">
                Sales cannot be made from an inactive shop location
              </p>
              <div className="mt-5 flex items-center gap-3">
                <Link
                  to={`/admin/store`}
                  className={`${customBtn} dark:text-white-300 flex items-center justify-items-center gap-1 bg-green-500 hover:bg-green-600`}
                >
                  <FaClipboardList />
                  <span className="text-xs">View Stores</span>
                </Link>
              </div>
            </>
          )
        ) : (
          <p>Please choose a store</p>
        )}
      </Card>

      {openConfirmModal && (
        <Modal
          styling="w-2/6 p-5"
          onClose={() => {
            setOpenConfirmModal(false);
            setGeneratedSale({});
          }}
        >
          <div>
            <p className="text-black mb-1 font-bold dark:text-white">
              Final Confirmation
            </p>

            <div className="mx-auto overflow-hidden bg-white">
              <div className="w-full overflow-auto p-6 text-left text-sm">
                <div className="flex text-xs">
                  <div className="flex-grow">
                    {generatedSale?.billType} No:{" "}
                    <span className="font-bold">{generatedSale?.code}</span>{" "}
                    <br />
                    {generatedSale?.customerName !== "Anonymous" && (
                      <span>CUSTOMER: {generatedSale?.customerName}</span>
                    )}
                  </div>
                  <span>{getDate(generatedSale?.dateAdded, true, true)}</span>
                </div>
                <hr className="my-2" />
                <div>
                  <table className="w-full text-xs">
                    <thead>
                      <tr>
                        <th className="w-1/12 py-1 text-center">#</th>
                        <th className="py-1 text-left">Item</th>
                        <th className="w-2/12 py-1 text-center">Qty</th>
                        <th className="w-3/12 py-1 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {generatedSale?.carts != null &&
                        generatedSale?.carts?.length > 0 &&
                        generatedSale?.carts?.map((cart: any) => (
                          <tr>
                            <td
                              className="py-2 text-center"
                              x-text="index+1"
                            ></td>
                            <td className="py-2 text-left">
                              <span>{cart?.productName}</span>
                              <br />
                              <small>
                                {formatCurrency(cart?.unitPriceAtPurchase)}
                              </small>
                            </td>
                            <td className="py-2 text-center">
                              {cart?.quantity}
                            </td>
                            <td className="py-2 text-right">
                              {" "}
                              {formatCurrency(
                                cart?.unitPriceAtPurchase * cart?.quantity
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <hr className="my-2" />
                <div>
                  <div className="flex text-xs font-semibold">
                    <div className="flex-grow">CART TOTAL</div>
                    <div> {formatCurrency(generatedSale?.cartTotal)}</div>
                  </div>
                  <div className="flex text-xs font-semibold">
                    <div className="flex-grow">TAX</div>
                    <div> {formatCurrency(generatedSale?.tax)}</div>
                  </div>
                  <div className="flex text-xs font-semibold">
                    <div className="flex-grow">DELIVERY FEE</div>
                    <div> {formatCurrency(generatedSale?.deliveryFee)}</div>
                  </div>
                  <hr className="my-2" />

                  <div className="flex font-semibold">
                    <div className="flex-grow">TOTAL</div>
                    <div>
                      <span>{formatCurrency(generatedSale?.totalPaid)}</span>
                    </div>
                  </div>
                  <hr className="my-2" />
                  <div className="flex text-xs font-semibold">
                    <div className="flex-grow">PAYMENT MODE</div>
                    <div>{generatedSale?.paymentMethod}</div>
                  </div>
                  <div className="flex text-xs font-semibold">
                    <div className="flex-grow">STATUS</div>
                    <div>{generatedSale?.status}</div>
                  </div>
                </div>
                <hr className="my-2" />
              </div>
            </div>

            <p className="text-center text-xs">
              once confirmation is given, sales cannot be reversed, unless
              approved by the manager
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  updateSaleStatus(ORDER_STATUS[2]);
                }}
                style="linear mb-5 mt-3 w-full rounded-md bg-red-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200 text-xs"
              >
                Cancel
              </Button>
              <button
                onClick={() => {
                  updateSaleStatus(ORDER_STATUS[1]);
                }}
                className="linear mb-5 mt-3 w-full rounded-md bg-green-500 py-[12px] text-base text-xs font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200"
              >
                Confirm Purchase
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PointOfSale;
