/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/style-prop-object */
import { useEffect, useState } from "react";
import SimpleTable from "core/components/table/SimpleTable";
import TableRowData from "core/components/table/TableRowData";
import {
  expandRow,
  formatCurrency,
  formatToFormDate,
  getDate,
} from "core/services/helpers";
import Button from "core/components/button/Button";
import ActionRowData from "core/components/table/ActionRowData";
import { MdCancel, MdCheckCircle } from "react-icons/md";
import SubHeader from "core/components/subHeader";
import Card from "core/components/card";
import Modal from "core/components/modal/Modal";
import InputField from "core/components/fields/InputField";
import CheckField from "core/components/fields/CheckField";
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsFillCaretDownFill,
  BsFillCaretUpFill,
} from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import useProductStore from "core/services/stores/useProductStore";
import SelectField from "core/components/fields/SelectField";
import { RiPriceTag3Fill } from "react-icons/ri";
import TextField from "core/components/fields/TextField";
import useCategoryStore from "core/services/stores/useCategoryStore";
import { FaClipboardList } from "react-icons/fa";
import useCatalogStore from "core/services/stores/useCatalogStore";
import useShopStore from "core/services/stores/useShopStore";
import useUserStore from "core/services/stores/useUserStore";
import imgPlaceholder from "assets/svg/defaultProductImg.svg";
import UploadField from "core/components/fields/UploadField";
import { gallery } from "core/const/const";
import notification from "core/services/notification";

const Products = () => {
  // TODO: Add access control
  const [expandedRows, setExpandedRows]: any = useState([]);
  const [expandState, setExpandState] = useState({});

  const [displayedImg, setDisplayedImg] = useState<any>("");
  const [openGallery, setOpenGallery] = useState(false);

  const errors = useProductStore((store) => store.errors);
  const user = useUserStore((store) => store.user);
  const access = useUserStore((store) => store.access);
  const isEmployer = useUserStore((store) => store.isEmployer);

  const updateError = useProductStore((store) => store.updateError);
  const clearError = useProductStore((store) => store.clearError);
  const productList = useProductStore((store) => store.productList);

  const getProducts = useProductStore((store) => store.getProducts);
  const addProductAction = useProductStore((store) => store.addProduct);
  const categories = useCategoryStore((store) => store.categories);
  const getCategory = useCategoryStore((store) => store.getCategory);
  const updateProductDetailAction = useProductStore(
    (store) => store.updateProductDetail
  );
  const updateProductPriceAction = useProductStore(
    (store) => store.updateProductPrice
  );
  const updateProductListingAction = useProductStore(
    (store) => store.updateProductListing
  );
  const updateGalleryAction = useProductStore((store) => store.updateGallery);

  const shops = useShopStore((store) => store.shops);
  const getShops = useShopStore((store) => store.getShops);
  const addCatalogAction = useCatalogStore((store) => store.addCatalog);

  const [selected, setSelected]: any = useState({});

  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    categoryId: "",
    tags: "",
    manufacturedBy: "",
    size: "",
    color: "",
    comments: "",
    costPrice: 0,
    sellingPrice: 0,
    discountPercent: 0,
    isListed: true,
    unit: "",
    itemPerPack: 1,
    manufacturingDate: "",
    expiringDate: "",
    gallery: [],
  });

  const [category, setCategory] = useState("");

  const [updateDetailForm, setUpdateDetailForm] = useState({
    name: "",
    description: "",
    categoryId: "",
    tags: "",
    manufacturedBy: "",
    size: "",
    color: "",
    unit: "",
    itemPerPack: 1,
    comments: "",
    manufacturingDate: "",
    expiringDate: "",
  });

  const [updatePriceForm, setUpdatePriceForm] = useState({
    costPrice: 0,
    sellingPrice: 0,
    discountPercent: 0,
  });

  const [catalogForm, setCatalogForm] = useState({
    stock: 0,
    differentialPercent: 0,
    isListed: true,
    productId: "",
    storeId: "",
  });

  const [openAddForm, setOpenAddForm] = useState(false);
  const [openCatalogForm, setOpenCatalogForm] = useState(false);
  const [openUpdateDetailForm, setOpenUpdateDetailForm] = useState(false);
  const [openUpdatePriceForm, setOpenUpdatePriceForm] = useState(false);
  const [openUpdateListingForm, setOpenUpdateListingForm] = useState(false);
  const [isListed, setIsListed] = useState(false);

  const [updateGalleryForm, setUpdateGalleryForm] = useState({
    gallery: [],
  });

  const onFormChange = (e: any, form: string) => {
    const { name, value } = e.target;
    switch (form) {
      case "product":
        setProductForm({
          ...productForm,
          [name]: name === "isListed" ? value == "true" : value,
        });
        break;
      case "updateDetail":
        setUpdateDetailForm({
          ...updateDetailForm,
          [name]: value,
        });
        break;
      case "updatePrice":
        setUpdatePriceForm({
          ...updatePriceForm,
          [name]: value,
        });
        break;
      case "updateListing":
        setIsListed(value == "true");
        break;
      case "catalog":
        setCatalogForm({
          ...catalogForm,
          [name]: name === "isListed" ? value == "true" : value,
        });
        break;
      default:
        break;
    }
  };

  const removeImage = (index: number) => {
    setProductForm((state) => ({
      ...state,
      gallery: [...state?.gallery?.filter((file, i) => i !== index)],
    }));
  };

  const addProduct = async (e: any) => {
    e.preventDefault();
    var status: any = await addProductAction({
      ...productForm,
      costPrice: Number(productForm?.costPrice),
      sellingPrice: Number(productForm?.sellingPrice),
      discountPercent: Number(productForm?.discountPercent),
      itemPerPack: Number(productForm.itemPerPack),
    });

    if (status) {
      setProductForm({
        name: "",
        description: "",
        categoryId: "",
        tags: "",
        manufacturedBy: "",
        size: "",
        color: "",
        comments: "",
        unit: "",
        itemPerPack: 1,
        costPrice: 0,
        sellingPrice: 0,
        discountPercent: 0,
        isListed: true,
        manufacturingDate: "",
        expiringDate: "",
        gallery: [],
      });
      setOpenAddForm(false);
    }
  };

  const addCatalog = async (e: any) => {
    e.preventDefault();
    var status: any = await addCatalogAction({
      ...catalogForm,
      differentialPercent: Number(catalogForm?.differentialPercent),
      stock: Number(catalogForm?.stock),
    });
    if (status) {
      setCatalogForm({
        stock: 0,
        differentialPercent: 0,
        isListed: true,
        productId: "",
        storeId: "",
      });
      setOpenCatalogForm(false);
    }
  };

  const updateProductDetail = async (e: any) => {
    e.preventDefault();
    await updateProductDetailAction(
      {
        ...updateDetailForm,
        itemPerPack: Number(updateDetailForm.itemPerPack),
      },
      selected?.id
    );
  };

  const updateProductPrice = async (e: any) => {
    e.preventDefault();
    await updateProductPriceAction(
      {
        ...updatePriceForm,
        costPrice: Number(updatePriceForm?.costPrice),
        sellingPrice: Number(updatePriceForm?.sellingPrice),
        discountPercent: Number(updatePriceForm?.discountPercent),
      },
      selected?.id
    );
  };

  const updateProductListing = async (e: any) => {
    e.preventDefault();
    await updateProductListingAction(
      {
        isListed,
      },
      selected?.id
    );
  };

  const updateGallery = async (e: any) => {
    e.preventDefault();

    if (updateGalleryForm?.gallery?.length > 0) {
      if (
        window.confirm(
          "All images in this product gallery, will be updated. Do you still want to proceed"
        )
      ) {
        await updateGalleryAction(updateGalleryForm, selected?.id);
      }
    } else {
      notification({
        type: "error",
        message: "Please upload images",
      });
    }
  };

  const handleExpandRow = async (event: any, id: string) => {
    var newRows = await expandRow(id, expandedRows);
    setExpandState(newRows?.obj);
    setExpandedRows(newRows?.newExpandedRows);
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

  useEffect(() => {
    productList?.items?.length < 1 &&
      getProducts(user?.employerId, {
        category,
        page: 1,
        count: 20,
      });

    if (shops?.length < 1) {
      getShops(user?.employerId);
    }

    categories?.length < 1 && getCategory(user?.employerId);
  }, []);

  return (
    <div className="mt-3">
      <Card extra={"w-full h-full mx-4 px-6 pb-6 sm:overflow-x-auto"}>
        <SubHeader
          title="Your Products"
          action="Add Product"
          showAction={access?.product?.includes("WRITE")}
          actionFunc={() => setOpenAddForm(true)}
        />
        <SimpleTable
          headers={[
            "Name",
            "Category",
            "Cost Price",
            "Selling Price",
            "Discount (%)",
            "On Shelf",
            "Actions",
          ]}
        >
          {productList != null && productList?.items?.length > 0 ? (
            productList.items.map((product) => (
              <>
                <tr key={product?.id}>
                  <ActionRowData style="min-w-[50px]">
                    <div
                      className="flex items-center gap-2 hover:cursor-pointer"
                      onClick={() => {
                        setSelected(product);
                        setOpenGallery(true);
                      }}
                    >
                      <img
                        src={
                          product?.gallery?.length > 0
                            ? product?.gallery[0]?.url
                            : imgPlaceholder
                        }
                        alt=""
                        className="h-[50px] w-[50px] rounded-[5px]"
                      />
                      <p>{product?.name}</p>
                    </div>
                  </ActionRowData>
                  <TableRowData
                    value={
                      product?.category?.name != null &&
                      product?.category?.name?.length > 0
                        ? product?.category?.name
                        : "no category"
                    }
                  />
                  <ActionRowData style="min-w-[50px]">
                    <div
                      className={`flex ${
                        access?.product?.includes("UPDATE")
                          ? "cursor-pointer"
                          : "cursor-not-allowed"
                      } hover:text-brand-500 dark:hover:text-white`}
                      onClick={() => {
                        if (access?.product?.includes("UPDATE")) {
                          setSelected({ ...product });
                          setUpdatePriceForm({
                            ...product,
                          });
                          setOpenUpdatePriceForm(true);
                        }
                      }}
                    >
                      <>
                        <RiPriceTag3Fill className="mr-1" />
                        <span className="text-xs">
                          {formatCurrency(product?.costPrice)}
                        </span>
                      </>
                    </div>
                  </ActionRowData>

                  <ActionRowData style="min-w-[50px]">
                    <div
                      className={`flex ${
                        access?.product?.includes("UPDATE")
                          ? "cursor-pointer"
                          : "cursor-not-allowed"
                      } hover:text-brand-500 dark:hover:text-white`}
                      onClick={() => {
                        if (access?.product?.includes("UPDATE")) {
                          setSelected({ ...product });
                          setUpdatePriceForm({
                            ...product,
                          });
                          setOpenUpdatePriceForm(true);
                        }
                      }}
                    >
                      <>
                        <RiPriceTag3Fill className="mr-1" />
                        <span className="text-xs">
                          {formatCurrency(product?.sellingPrice)}
                        </span>
                      </>
                    </div>
                  </ActionRowData>

                  <TableRowData
                    value={product?.discountPercent}
                    style="min-w-[50px]"
                  />
                  <ActionRowData style="min-w-[50px]">
                    <div
                      className={`flex ${
                        access?.product?.includes("UPDATE")
                          ? "cursor-pointer"
                          : "cursor-not-allowed"
                      }`}
                      onClick={() => {
                        if (access?.product?.includes("UPDATE")) {
                          setSelected({ ...product });
                          setIsListed(product?.isListed);
                          setOpenUpdateListingForm(true);
                        }
                      }}
                    >
                      {product?.isListed ? (
                        <>
                          <MdCheckCircle className="mr-1 text-green-500 dark:text-green-300" />
                          <span className="text-xs text-green-600">yes</span>
                        </>
                      ) : (
                        <>
                          <MdCancel className="me-1 text-red-500 dark:text-red-300" />
                          <span className="text-xs text-red-600">no</span>
                        </>
                      )}
                    </div>
                  </ActionRowData>
                  <ActionRowData>
                    <Button
                      style="flex gap-1 justify-items-center items-center bg-gray-500 hover:bg-gray-600 dark:text-white-300"
                      onClick={(e: any) => handleExpandRow(e, product?.id)}
                    >
                      {!expandedRows.includes(product?.id) ? (
                        <>
                          <BsFillCaretDownFill />
                          <span className="text-xs">View</span>
                        </>
                      ) : (
                        <>
                          <BsFillCaretUpFill />
                          <span className="text-xs">Close</span>
                        </>
                      )}
                    </Button>
                    {access?.product?.includes("UPDATE") && (
                      <>
                        <Button
                          style="flex gap-1 justify-items-center items-center bg-yellow-500 hover:bg-yellow-600 dark:text-white-300"
                          disabled={!access?.product?.includes("UPDATE")}
                          onClick={() => {
                            setSelected({ ...product });
                            setUpdateDetailForm({
                              ...product,
                              expiringDate: formatToFormDate(
                                product?.expiringDate
                              ),
                              manufacturingDate: formatToFormDate(
                                product?.manufacturingDate
                              ),
                            });
                            setOpenUpdateDetailForm(true);
                          }}
                        >
                          <AiFillEdit />
                          <span className="text-xs">Edit</span>
                        </Button>
                      </>
                    )}

                    {access?.product?.includes("UPDATE") &&
                      product?.isListed && (
                        <Button
                          style="flex gap-1 justify-items-center items-center bg-green-500 hover:bg-green-600 dark:text-white-300"
                          disabled={!access?.product?.includes("UPDATE")}
                          onClick={() => {
                            setSelected({ ...product });
                            setCatalogForm({
                              ...catalogForm,
                              productId: product?.id,
                            });
                            setOpenCatalogForm(true);
                          }}
                        >
                          <FaClipboardList />
                          <span className="text-xs">Catalog Item</span>
                        </Button>
                      )}
                  </ActionRowData>
                </tr>
                {expandedRows.includes(product?.id) ? (
                  <tr>
                    <td
                      className="border-[1px] border-gray-200 text-sm"
                      colSpan={7}
                    >
                      <ul className="p-5">
                        <li className="mb-5 flex gap-3">
                          <div className="w-1/4">
                            <span className="mr-1 font-bold text-brand-500 dark:text-white">
                              Added By:
                            </span>
                            <span>{product?.addedBy}</span>
                          </div>
                          <div className="w-1/4">
                            <span className="mr-1 font-bold text-brand-500 dark:text-white">
                              Date Added:
                            </span>
                            <span>
                              {getDate(product?.dateAdded, true, false)}
                            </span>
                          </div>
                          <div className="w-1/4">
                            <span className="mr-1 font-bold text-brand-500 dark:text-white">
                              Last Updated By:
                            </span>
                            <span>{product?.updatedBy}</span>
                          </div>
                          <div className="w-1/4">
                            <span className="mr-1 font-bold text-brand-500 dark:text-white">
                              Last Update Date:
                            </span>
                            <span>
                              {getDate(product?.lastUpdated, true, false)}
                            </span>
                          </div>
                        </li>
                        <li className="mb-5 flex gap-3">
                          <div className="w-1/3">
                            <span className="mr-1 font-bold text-brand-500 dark:text-white">
                              Unit:
                            </span>
                            <span>{product?.unit}</span>
                          </div>
                          <div className="w-1/3">
                            <span className="mr-1 font-bold text-brand-500 dark:text-white">
                              Item per pack:
                            </span>
                            <span>{product?.itemPerPack}</span>
                          </div>
                          <div className="w-1/3">
                            <span className="mr-1 font-bold text-brand-500 dark:text-white">
                              Size:
                            </span>
                            <span>{product?.size}</span>
                          </div>
                          <div className="w-1/3">
                            <span className="mr-1 font-bold text-brand-500 dark:text-white">
                              Color:
                            </span>
                            <span>{product?.color}</span>
                          </div>
                        </li>
                        <li className="mb-5 flex gap-3">
                          <div className="w-1/3">
                            <span className="mr-1 font-bold text-brand-500 dark:text-white">
                              Manufactured By:
                            </span>
                            <span>{product?.manufacturedBy}</span>
                          </div>
                          <div className="w-1/3">
                            <span className="mr-1 font-bold text-brand-500 dark:text-white">
                              Manufacturing Date:
                            </span>
                            <span>
                              {getDate(product?.manufacturingDate, true, false)}
                            </span>
                          </div>
                          <div className="w-1/3">
                            <span className="mr-1 font-bold text-brand-500 dark:text-white">
                              Expiry Date:
                            </span>
                            <span>
                              {getDate(product?.expiringDate, true, false)}
                            </span>
                          </div>
                        </li>
                        <li className="mb-5 flex gap-3">
                          <div className="w-3/3">
                            <span className="mr-1 font-bold text-brand-500 dark:text-white">
                              Description:
                            </span>{" "}
                            <br />
                            <span>
                              {product?.description ?? "no desciption"}
                            </span>
                          </div>
                        </li>
                        <li className="mb-5 flex gap-3">
                          <div className="w-3/3">
                            <span className="mr-1 font-bold text-brand-500 dark:text-white">
                              Comments:
                            </span>{" "}
                            <br />
                            <span>{product?.comments}</span>
                          </div>
                        </li>
                      </ul>
                    </td>
                  </tr>
                ) : (
                  <tr></tr>
                )}
              </>
            ))
          ) : (
            <tr>
              <TableRowData colSpan={7} value="No products yet" />
            </tr>
          )}

          <tr>
            <TableRowData
              colSpan={5}
              value={`Showing ${productList?.items?.length} of ${productList?.totalItem} entries`}
            />
            <ActionRowData colSpan={2}>
              <Button
                disabled={productList?.currentPage === 1}
                style="flex gap-1 justify-items-center items-center"
                onClick={() => {
                  getProducts(user?.employerId, {
                    category,
                    page: productList?.currentPage - 1,
                    count: 20,
                  });
                }}
              >
                <BsChevronDoubleLeft className="" />
                <span className="text-xs">Prev</span>
              </Button>
              <Button style="flex gap-1 bg-green-500 hover:bg-green-600">
                <span className="text-xs">
                  {productList?.currentPage} / {productList?.totalPage}
                </span>
              </Button>
              <Button
                disabled={productList?.currentPage === productList?.totalPage}
                style="flex gap-1 justify-items-center items-center"
                onClick={() => {
                  getProducts(user?.employerId, {
                    category,
                    page: productList?.currentPage + 1,
                    count: 20,
                  });
                }}
              >
                <span className="text-xs">Next</span>
                <BsChevronDoubleRight className="text-xs" />
              </Button>
            </ActionRowData>
          </tr>
        </SimpleTable>
      </Card>

      {openAddForm && (
        <Modal styling="w-3/6 p-5" onClose={() => setOpenAddForm(false)}>
          <form
            onSubmit={(e) => {
              addProduct(e);
              clearError();
            }}
          >
            <p className="text-black mb-5 dark:text-white">
              New Product Information
            </p>
            <InputField
              variant="auth"
              extra="mb-3"
              label="Name*"
              id="name"
              type="text"
              name="name"
              value={productForm?.name}
              onChange={(e: any) => onFormChange(e, "product")}
              onFocus={() => {
                if (errors?.Name && errors?.Name?.length > 0) {
                  updateError("Name");
                }
              }}
              error={errors?.Name}
            />

            <TextField
              ref={null}
              extra="mb-3"
              rows={5}
              variant="auth"
              label="Description"
              id="description"
              type="text"
              name="description"
              value={productForm?.description}
              onChange={(e: any) => onFormChange(e, "product")}
            />

            <div className="flex gap-3">
              <div className="w-1/3">
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Cost Price"
                  id="costPrice"
                  type="number"
                  name="costPrice"
                  value={productForm?.costPrice}
                  onChange={(e: any) => onFormChange(e, "product")}
                  onFocus={() => {
                    if (errors?.CostPrice && errors?.CostPrice?.length > 0) {
                      updateError("CostPrice");
                    }
                  }}
                  error={errors?.CostPrice}
                />
              </div>
              <div className="w-1/3">
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Selling Price"
                  id="sellingPrice"
                  type="number"
                  name="sellingPrice"
                  value={productForm?.sellingPrice}
                  onChange={(e: any) => onFormChange(e, "product")}
                  onFocus={() => {
                    if (
                      errors?.SellingPrice &&
                      errors?.SellingPrice?.length > 0
                    ) {
                      updateError("SellingPrice");
                    }
                  }}
                  error={errors?.SellingPrice}
                />
              </div>
              <div className="w-1/3">
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Discount Percent"
                  id="discountPercent"
                  type="number"
                  name="discountPercent"
                  value={productForm?.discountPercent}
                  onChange={(e: any) => onFormChange(e, "product")}
                  onFocus={() => {
                    if (
                      errors?.DiscountPercent &&
                      errors?.DiscountPercent?.length > 0
                    ) {
                      updateError("DiscountPercent");
                    }
                  }}
                  error={errors?.DiscountPercent}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1/3">
                <SelectField
                  label="Choose Category"
                  extra="mb-3"
                  defaultName="Select Product Category"
                  defaultValue="0"
                  name="categoryId"
                  options={
                    categories?.length > 0
                      ? [
                          ...categories?.map((cat: Category) => {
                            return {
                              name: cat?.name,
                              value: cat?.id,
                            };
                          }),
                        ]
                      : []
                  }
                  value={productForm?.categoryId}
                  onChange={(e: any) => onFormChange(e, "product")}
                  showLabel={true}
                />
              </div>
              <div className="w-1/3">
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Units"
                  placeholder=""
                  id="unit"
                  type="text"
                  name="unit"
                  value={productForm?.unit}
                  onChange={(e: any) => onFormChange(e, "product")}
                />
              </div>
              <div className="w-1/3">
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Items per pack"
                  id="itemPerPack"
                  type="number"
                  name="itemPerPack"
                  value={productForm?.itemPerPack}
                  onChange={(e: any) => onFormChange(e, "product")}
                  onFocus={() => {
                    if (
                      errors?.ItemPerPack &&
                      errors?.ItemPerPack?.length > 0
                    ) {
                      updateError("ItemPerPack");
                    }
                  }}
                  error={errors?.ItemPerPack}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1/3">
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Size"
                  placeholder=""
                  id="size"
                  type="text"
                  name="size"
                  value={productForm?.size}
                  onChange={(e: any) => onFormChange(e, "product")}
                />
              </div>
              <div className="w-1/3">
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Color"
                  placeholder="red, green, blue"
                  id="color"
                  type="text"
                  name="color"
                  value={productForm?.color}
                  onChange={(e: any) => onFormChange(e, "product")}
                />
              </div>
              <div className="flex w-1/3 flex-col justify-items-center gap-2 dark:text-white">
                <span>List on Shelf:</span>
                <span>
                  <CheckField
                    styling="mr-6 inline-block"
                    checked={productForm.isListed === true}
                    sublabel="yes"
                    type="radio"
                    value="true"
                    name="isListed"
                    onChange={(e: any) => onFormChange(e, "product")}
                  />
                  <CheckField
                    styling="inline-block"
                    checked={productForm.isListed === false}
                    sublabel="no"
                    type="radio"
                    value="false"
                    name="isListed"
                    onChange={(e: any) => onFormChange(e, "product")}
                  />
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1/2">
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Manufacturing Date"
                  id="manufacturingDate"
                  type="date"
                  name="manufacturingDate"
                  value={productForm?.manufacturingDate}
                  onChange={(e: any) => onFormChange(e, "product")}
                  onFocus={() => {
                    if (
                      errors?.ManufacturingDate &&
                      errors?.ManufacturingDate?.length > 0
                    ) {
                      updateError("ManufacturingDate");
                    }
                  }}
                  error={errors?.ManufacturingDate}
                />
              </div>
              <div className="w-1/2">
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Expiring Date"
                  id="expiringDate"
                  type="date"
                  name="expiringDate"
                  value={productForm?.expiringDate}
                  onChange={(e: any) => onFormChange(e, "product")}
                  onFocus={() => {
                    if (
                      errors?.ExpiringDate &&
                      errors?.ExpiringDate?.length > 0
                    ) {
                      updateError("ExpiringDate");
                    }
                  }}
                  error={errors?.ExpiringDate}
                />
              </div>
            </div>

            <TextField
              ref={null}
              extra="mb-3"
              rows={5}
              variant="auth"
              label="Additional Comments"
              id="comments"
              type="text"
              name="comments"
              value={productForm?.comments}
              onChange={(e: any) => onFormChange(e, "product")}
            />

            <UploadField
              boxStyle="mb-[24px]"
              label="Upload picture of products"
              name="gallery"
              onChange={setProductForm}
            />

            <div className="mb-5 flex flex-wrap gap-2">
              {productForm &&
                productForm?.gallery?.length > 0 &&
                Array.from(productForm?.gallery)?.map(
                  (file: any, index: number) => (
                    <div key={file?.name} className="h-[80px] w-[80px]">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`logo${index}`}
                      />
                    </div>
                  )
                )}
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => {
                  setOpenAddForm(false);
                  clearError();
                }}
                style="linear mb-5 mt-3 w-full rounded-md bg-red-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200 text-xs"
              >
                Cancel
              </Button>
              <button className="linear mb-5 mt-3 w-full rounded-md bg-green-500 py-[12px] text-base text-xs font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200">
                Add Product
              </button>
            </div>
          </form>
        </Modal>
      )}

      {openUpdateDetailForm && (
        <Modal
          styling="w-3/6 p-5"
          onClose={() => {
            setOpenUpdateDetailForm(false);
            setSelected({});
            clearError();
          }}
        >
          <form onSubmit={(e) => updateProductDetail(e)}>
            <p className="text-black mb-5 dark:text-white">
              Update Product Detail
            </p>
            <InputField
              variant="auth"
              extra="mb-3"
              label="Name*"
              id="name"
              type="text"
              name="name"
              value={updateDetailForm?.name}
              onChange={(e: any) => onFormChange(e, "updateDetail")}
              onFocus={() => {
                if (errors?.Name && errors?.Name?.length > 0) {
                  updateError("Name");
                }
              }}
              error={errors?.Name}
            />

            <TextField
              ref={null}
              extra="mb-3"
              rows={5}
              variant="auth"
              label="Description"
              id="description"
              type="text"
              name="description"
              value={updateDetailForm?.description}
              onChange={(e: any) => onFormChange(e, "updateDetail")}
            />

            <div className="flex gap-3">
              <div className="w-1/3">
                <SelectField
                  label="Choose Category"
                  extra="mb-3"
                  defaultName="Select Product Category"
                  defaultValue="0"
                  name="categoryId"
                  options={
                    categories?.length > 0
                      ? [
                          ...categories?.map((cat: Category) => {
                            return {
                              name: cat?.name,
                              value: cat?.id,
                            };
                          }),
                        ]
                      : []
                  }
                  value={updateDetailForm?.categoryId}
                  onChange={(e: any) => onFormChange(e, "updateDetail")}
                  showLabel={true}
                />
              </div>
              <div className="w-1/3">
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Units"
                  placeholder=""
                  id="unit"
                  type="text"
                  name="unit"
                  value={updateDetailForm?.unit}
                  onChange={(e: any) => onFormChange(e, "updateDetail")}
                />
              </div>
              <div className="w-1/3">
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Items per pack"
                  id="itemPerPack"
                  type="number"
                  name="itemPerPack"
                  value={updateDetailForm?.itemPerPack}
                  onChange={(e: any) => onFormChange(e, "updateDetail")}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1/2">
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Size"
                  placeholder=""
                  id="size"
                  type="text"
                  name="size"
                  value={updateDetailForm?.size}
                  onChange={(e: any) => onFormChange(e, "updateDetail")}
                />
              </div>
              <div className="w-1/2">
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Color"
                  placeholder="red, green, blue"
                  id="color"
                  type="text"
                  name="color"
                  value={updateDetailForm?.color}
                  onChange={(e: any) => onFormChange(e, "updateDetail")}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1/2">
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Manufacturing Date"
                  id="manufacturingDate"
                  type="date"
                  name="manufacturingDate"
                  value={updateDetailForm?.manufacturingDate}
                  onChange={(e: any) => onFormChange(e, "updateDetail")}
                  onFocus={() => {
                    if (
                      errors?.ManufacturingDate &&
                      errors?.ManufacturingDate?.length > 0
                    ) {
                      updateError("ManufacturingDate");
                    }
                  }}
                  error={errors?.ManufacturingDate}
                />
              </div>
              <div className="w-1/2">
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Expiring Date"
                  id="expiringDate"
                  type="date"
                  name="expiringDate"
                  value={updateDetailForm?.expiringDate}
                  onChange={(e: any) => onFormChange(e, "updateDetail")}
                  onFocus={() => {
                    if (
                      errors?.ExpiringDate &&
                      errors?.ExpiringDate?.length > 0
                    ) {
                      updateError("ExpiringDate");
                    }
                  }}
                  error={errors?.ExpiringDate}
                />
              </div>
            </div>

            <TextField
              ref={null}
              extra="mb-3"
              rows={5}
              variant="auth"
              label="Additional Comments"
              id="comments"
              type="text"
              name="comments"
              value={updateDetailForm?.comments}
              onChange={(e: any) => onFormChange(e, "updateDetail")}
            />

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => {
                  setOpenUpdateDetailForm(false);
                  setSelected({});
                  clearError();
                }}
                style="linear mb-5 mt-3 w-full rounded-md bg-red-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200 text-xs"
              >
                Cancel
              </Button>
              <button className="linear mb-5 mt-3 w-full rounded-md bg-green-500 py-[12px] text-base text-xs font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200">
                Update Detail
              </button>
            </div>
          </form>
        </Modal>
      )}

      {openUpdatePriceForm && (
        <Modal
          styling="w-1/5 p-5"
          onClose={() => {
            setOpenUpdatePriceForm(false);
            setSelected({});
            clearError();
          }}
        >
          <form onSubmit={(e) => updateProductPrice(e)}>
            <p className="text-black mb-5 dark:text-white">
              Update Price Detail
            </p>

            <InputField
              variant="auth"
              extra="mb-3"
              label="Cost Price"
              id="costPrice"
              type="number"
              name="costPrice"
              value={updatePriceForm?.costPrice}
              onChange={(e: any) => onFormChange(e, "updatePrice")}
              onFocus={() => {
                if (errors?.CostPrice && errors?.CostPrice?.length > 0) {
                  updateError("CostPrice");
                }
              }}
              error={errors?.CostPrice}
            />
            <InputField
              variant="auth"
              extra="mb-3"
              label="Selling Price"
              id="sellingPrice"
              type="number"
              name="sellingPrice"
              value={updatePriceForm?.sellingPrice}
              onChange={(e: any) => onFormChange(e, "updatePrice")}
              onFocus={() => {
                if (errors?.SellingPrice && errors?.SellingPrice?.length > 0) {
                  updateError("SellingPrice");
                }
              }}
              error={errors?.SellingPrice}
            />
            <InputField
              variant="auth"
              extra="mb-3"
              label="Discount Percent"
              id="discountPercent"
              type="number"
              name="discountPercent"
              value={updatePriceForm?.discountPercent}
              onChange={(e: any) => onFormChange(e, "updatePrice")}
              onFocus={() => {
                if (
                  errors?.DiscountPercent &&
                  errors?.DiscountPercent?.length > 0
                ) {
                  updateError("DiscountPercent");
                }
              }}
              error={errors?.DiscountPercent}
            />

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => {
                  setOpenUpdatePriceForm(false);
                  setSelected({});
                  clearError();
                }}
                style="linear mb-5 mt-3 w-full rounded-md bg-red-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200 text-xs"
              >
                Cancel
              </Button>
              <button className="linear mb-5 mt-3 w-full rounded-md bg-green-500 py-[12px] text-base text-xs font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200">
                Update Pricing
              </button>
            </div>
          </form>
        </Modal>
      )}

      {openUpdateListingForm && (
        <Modal
          styling="w-1/5 p-5"
          onClose={() => {
            setOpenUpdateListingForm(false);
            setSelected({});
            clearError();
          }}
        >
          <form onSubmit={(e) => updateProductListing(e)}>
            <p className="text-black mb-5 dark:text-white">Update Listing?</p>
            <div className="flex flex-col justify-items-center gap-2 dark:text-white">
              <span>List on Shelf:</span>
              <span>
                <CheckField
                  styling="mr-6 inline-block"
                  checked={isListed === true}
                  sublabel="yes"
                  type="radio"
                  value="true"
                  name="isListed"
                  onChange={(e: any) => onFormChange(e, "updateListing")}
                />
                <CheckField
                  styling="inline-block"
                  checked={isListed === false}
                  sublabel="no"
                  type="radio"
                  value="false"
                  name="isListed"
                  onChange={(e: any) => onFormChange(e, "updateListing")}
                />
              </span>
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => {
                  setOpenUpdateListingForm(false);
                  setSelected({});
                  clearError();
                }}
                style="linear mb-5 mt-3 w-full rounded-md bg-red-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200 text-xs"
              >
                Cancel
              </Button>
              <button className="linear mb-5 mt-3 w-full rounded-md bg-green-500 py-[12px] text-base text-xs font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200">
                Update Listing
              </button>
            </div>
          </form>
        </Modal>
      )}

      {openCatalogForm && (
        <Modal
          styling="w-2/6 p-5"
          onClose={() => {
            setOpenCatalogForm(false);
            setSelected({});
            clearError();
          }}
        >
          <form onSubmit={(e) => addCatalog(e)}>
            <p className="text-black mb-5 font-bold dark:text-white">
              Add Product To Store Catalog
            </p>

            <SelectField
              label="Choose Shop"
              extra="mb-3"
              defaultName="Select Shop"
              defaultValue="0"
              name="storeId"
              options={getAssignedShops(shops)}
              value={catalogForm?.storeId}
              onChange={(e: any) => onFormChange(e, "catalog")}
              showLabel={true}
            />

            <InputField
              variant="auth"
              extra="mb-3"
              label="Stock"
              id="stock"
              type="number"
              name="stock"
              value={catalogForm?.stock}
              onChange={(e: any) => onFormChange(e, "catalog")}
              onFocus={() => {
                if (errors?.Stock && errors?.Stock?.length > 0) {
                  updateError("Stock");
                }
              }}
              error={errors?.Stock}
            />

            <InputField
              variant="auth"
              extra="mb-3"
              label="Differential Percent"
              id="differentialPercent"
              type="number"
              name="differentialPercent"
              value={catalogForm?.differentialPercent}
              onChange={(e: any) => onFormChange(e, "catalog")}
              onFocus={() => {
                if (
                  errors?.DifferentialPercent &&
                  errors?.DifferentialPercent?.length > 0
                ) {
                  updateError("DifferentialPercent");
                }
              }}
              instruction="* set custom pricing which can be a higher or lesser than the initial product price"
              error={errors?.DifferentialPercent}
            />

            <div className="flex flex-col justify-items-center gap-2 dark:text-white">
              <span>List In Shop:</span>
              <span>
                <CheckField
                  styling="mr-6 inline-block"
                  checked={catalogForm?.isListed === true}
                  sublabel="yes"
                  type="radio"
                  value="true"
                  name="isListed"
                  onChange={(e: any) => onFormChange(e, "catalog")}
                />
                <CheckField
                  styling="inline-block"
                  checked={catalogForm?.isListed === false}
                  sublabel="no"
                  type="radio"
                  value="false"
                  name="isListed"
                  onChange={(e: any) => onFormChange(e, "catalog")}
                />
              </span>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => {
                  setOpenCatalogForm(false);
                  setSelected({});
                  clearError();
                }}
                style="linear mb-5 mt-3 w-full rounded-md bg-red-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200 text-xs"
              >
                Cancel
              </Button>
              <button className="linear mb-5 mt-3 w-full rounded-md bg-green-500 py-[12px] text-base text-xs font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200">
                Add To Catalog
              </button>
            </div>
          </form>
        </Modal>
      )}

      {openGallery && (
        <Modal
          styling="w-4/6 p-5"
          onClose={() => {
            setOpenGallery(false);
            setSelected({});
            clearError();
          }}
        >
          <div className="mb-5 flex w-full flex-col-reverse gap-3 sm:flex-row">
            <div className="flex w-full justify-center gap-5 sm:block sm:w-[80px]">
              <div
                className={`${gallery}`}
                onClick={() => setDisplayedImg(imgPlaceholder)}
              >
                <img src={imgPlaceholder} alt="" className="h-2/3 w-2/3" />
              </div>
              <div
                className={`${gallery}`}
                onClick={() => setDisplayedImg(imgPlaceholder)}
              >
                <img src={imgPlaceholder} alt="" className="h-2/3 w-2/3" />
              </div>
              <div
                className={`${gallery}`}
                onClick={() => setDisplayedImg(imgPlaceholder)}
              >
                <img src={imgPlaceholder} alt="" className="h-2/3 w-2/3" />
              </div>
              <div
                className={`${gallery} !mb-0`}
                onClick={() => setDisplayedImg(imgPlaceholder)}
              >
                <img src={imgPlaceholder} alt="" className="h-2/3 w-2/3" />
              </div>
            </div>
            <div className="flex h-auto w-full items-center justify-center rounded-[4px] border bg-[#f5f5f5] py-5 sm:py-0">
              <div className="flex items-center justify-center">
                <img src={displayedImg} alt="" className="" />
              </div>
            </div>
          </div>

          <form onSubmit={(e) => updateGallery(e)}>
            <p className="text-black mb-5 font-bold dark:text-white">
              Product Gallery Update
            </p>

            <UploadField
              boxStyle="mb-[24px]"
              label="Upload picture of products"
              name="gallery"
              onChange={setUpdateGalleryForm}
            />

            <div className="mb-5 flex flex-wrap gap-2">
              {updateGalleryForm &&
                updateGalleryForm?.gallery?.length > 0 &&
                Array.from(updateGalleryForm?.gallery)?.map(
                  (file: any, index: number) => (
                    <div key={file?.name} className="h-[80px] w-[80px]">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`logo${index}`}
                      />
                    </div>
                  )
                )}
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => {
                  setOpenCatalogForm(false);
                  setSelected({});
                  clearError();
                }}
                style="linear mb-5 mt-3 w-full rounded-md bg-red-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200 text-xs"
              >
                Cancel
              </Button>
              <button className="linear mb-5 mt-3 w-full rounded-md bg-green-500 py-[12px] text-base text-xs font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200">
                Update Gallery
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Products;
