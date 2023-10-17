/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/style-prop-object */
import { useEffect, useState } from "react";
import SimpleTable from "core/components/table/SimpleTable";
import TableRowData from "core/components/table/TableRowData";
import { expandRow, formatCurrency, getDate } from "core/services/helpers";
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
import useCategoryStore from "core/services/stores/useCategoryStore";
import { useNavigate, useParams } from "react-router-dom";
import useCatalogStore from "core/services/stores/useCatalogStore";
import useUserStore from "core/services/stores/useUserStore";

const Catalogs = () => {
  const [expandedRows, setExpandedRows]: any = useState([]);
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [, setExpandState] = useState({});
  const user = useUserStore((store) => store.user);
  const access = useUserStore((store) => store.access);
  const isEmployer = useUserStore((store) => store.isEmployer);
  const errors = useCatalogStore((store) => store.errors);
  const updateError = useCatalogStore((store) => store.updateError);
  const clearError = useCatalogStore((store) => store.clearError);
  const categories = useCategoryStore((store) => store.categories);
  const getCategories = useCategoryStore((store) => store.getCategory);
  const catalogList: any = useCatalogStore((store) => store.catalogList);
  const getCatalogs = useCatalogStore((store) => store.getCatalogs);
  const updateCatalogAction = useCatalogStore((store) => store.updateCatalog);

  const [selected, setSelected]: any = useState({});
  const [category, setCategory]: any = useState("");

  const [updateCatalogForm, setUpdateCatalogForm] = useState({
    stock: 0,
    differentialPercent: 0,
    isListed: true,
  });

  const [openUpdateForm, setOpenUpdateForm] = useState(false);

  const onFormChange = (e: any, form: string) => {
    const { name, value } = e.target;
    switch (form) {
      case "update":
        setUpdateCatalogForm({
          ...updateCatalogForm,
          [name]: name === "isListed" ? value == "true" : value,
        });
        break;
      default:
        break;
    }
  };

  const updateCatalog = async (e: any) => {
    e.preventDefault();
    await updateCatalogAction(
      {
        ...updateCatalogForm,
        differentialPercent: Number(updateCatalogForm?.differentialPercent),
        stock: Number(updateCatalogForm?.stock),
      },
      selected?.id
    );
  };

  const handleExpandRow = async (event: any, id: string) => {
    var newRows = await expandRow(id, expandedRows);
    setExpandState(newRows?.obj);
    setExpandedRows(newRows?.newExpandedRows);
  };

  // TODO: Add identifiers for out of stock and instock

  useEffect(() => {
    getCatalogs(storeId, {
      category,
      page: 1,
      count: 20,
    });

    if (categories?.length < 1) {
      getCategories(user?.employerId);
    }
  }, []);

  return (
    <div className="mt-3">
      <Card extra={"w-full h-full mx-4 px-6 pb-6 sm:overflow-x-auto"}>
        <SubHeader
          title={`${
            catalogList?.items?.length > 0
              ? catalogList?.items[0]?.storeName + "'s Catalog"
              : "Catalog"
          }`}
          actionFunc={() => {
            navigate(-1);
          }}
          action="Back"
          icon={<BsChevronDoubleLeft />}
        />
        <SimpleTable
          headers={[
            "Product Name",
            "Category",
            "Selling Price",
            "Stock",
            "Differential (%)",
            "On Shelf",
            "On Warehouse",
            "Actions",
          ]}
        >
          {catalogList != null && catalogList?.items?.length > 0 ? (
            catalogList.items.map((catalog: any) => (
              <>
                <tr key={catalog?.id}>
                  <TableRowData
                    enableAction={true}
                    onClick={() => {
                      navigate("/admin/products");
                    }}
                    value={catalog?.product?.name}
                  />
                  <TableRowData
                    value={
                      catalog?.product?.category?.name != null &&
                      catalog?.product?.category?.name?.length > 0
                        ? catalog?.product?.category?.name
                        : "no category"
                    }
                  />
                  <TableRowData value={formatCurrency(catalog?.sellingPrice)} />
                  <TableRowData style="min-w-[50px]" value={catalog?.stock} />
                  <TableRowData
                    style="min-w-[50px]"
                    value={catalog?.differentialPercent}
                  />
                  <ActionRowData style="min-w-[50px]">
                    <div className="flex cursor-pointer">
                      {catalog?.isListed ? (
                        <>
                          <MdCheckCircle className="me-1 text-green-500 dark:text-green-300" />
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
                  <ActionRowData style="min-w-[50px]">
                    <div className="flex cursor-pointer">
                      {catalog?.product?.isListed ? (
                        <>
                          <MdCheckCircle className="me-1 text-green-500 dark:text-green-300" />
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
                      onClick={(e: any) => handleExpandRow(e, catalog?.id)}
                    >
                      {!expandedRows.includes(catalog?.id) ? (
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

                    {isEmployer ||
                    (access?.catalog?.includes("UPDATE") &&
                      user?.assignedStoreIds.includes(
                        catalog?.storeId?.toUpperCase()
                      )) ? (
                      <Button
                        style="flex gap-1 justify-items-center items-center bg-yellow-500 hover:bg-yellow-600 dark:text-white-300"
                        onClick={() => {
                          setSelected({ ...catalog });
                          setUpdateCatalogForm({
                            differentialPercent: catalog?.differentialPercent,
                            isListed: catalog?.isListed,
                            stock: catalog?.stock,
                          });
                          setOpenUpdateForm(true);
                        }}
                      >
                        <AiFillEdit />
                        <span className="text-xs">Edit</span>
                      </Button>
                    ) : (
                      <></>
                    )}
                  </ActionRowData>
                </tr>
                {expandedRows.includes(catalog?.id) ? (
                  <tr>
                    <td
                      className="border-[1px] border-gray-200 text-sm"
                      colSpan={8}
                    >
                      <ul className="p-5">
                        <li className="mb-5 flex gap-3">
                          <div className="w-1/4">
                            <span className="mr-1 font-bold text-brand-500 dark:text-white">
                              Added By:
                            </span>
                            <span>{catalog?.addedBy}</span>
                          </div>
                          <div className="w-1/4">
                            <span className="mr-1 font-bold text-brand-500 dark:text-white">
                              Date Added:
                            </span>
                            <span>
                              {getDate(catalog?.dateAdded, true, false)}
                            </span>
                          </div>
                          <div className="w-1/4">
                            <span className="mr-1 font-bold text-brand-500 dark:text-white">
                              Last Updated By:
                            </span>
                            <span>{catalog?.updatedBy}</span>
                          </div>
                          <div className="w-1/4">
                            <span className="mr-1 font-bold text-brand-500 dark:text-white">
                              Last Update Date:
                            </span>
                            <span>
                              {getDate(catalog?.lastUpdated, true, false)}
                            </span>
                          </div>
                        </li>
                        <li className="border-gry-500 mb-5 border-b p-1"></li>
                        <li className="mb-5 flex gap-3">
                          <div className="w-1/3">
                            <span className="mr-1 font-bold text-brand-500 dark:text-white">
                              Cost Price:
                            </span>
                            <span>
                              {formatCurrency(catalog?.product?.costPrice)}
                            </span>
                          </div>
                          <div className="w-1/3">
                            <span className="mr-1 font-bold text-brand-500 dark:text-white">
                              Selling Price:
                            </span>
                            <span>
                              {formatCurrency(catalog?.product?.sellingPrice)}
                            </span>
                          </div>
                          <div className="w-1/3">
                            <span className="mr-1 font-bold text-brand-500 dark:text-white">
                              Discount Percent:
                            </span>
                            <span>{catalog?.product?.discountPercent}</span>
                          </div>
                        </li>
                        <li className="mb-5 flex gap-3">
                          <div className="w-1/3">
                            <span className="mr-1 font-bold text-brand-500 dark:text-white">
                              Tags:
                            </span>
                            <span>{catalog?.product?.tags ?? "no tags"}</span>
                          </div>
                          <div className="w-1/3">
                            <span className="mr-1 font-bold text-brand-500 dark:text-white">
                              Size:
                            </span>
                            <span>{catalog?.product?.size}</span>
                          </div>
                          <div className="w-1/3">
                            <span className="mr-1 font-bold text-brand-500 dark:text-white">
                              Color:
                            </span>
                            <span>{catalog?.product?.color}</span>
                          </div>
                        </li>
                        <li className="mb-5 flex gap-3">
                          <div className="w-1/3">
                            <span className="mr-1 font-bold text-brand-500 dark:text-white">
                              Manufactured By:
                            </span>
                            <span>{catalog?.product?.manufacturedBy}</span>
                          </div>
                          <div className="w-1/3">
                            <span className="mr-1 font-bold text-brand-500 dark:text-white">
                              Manufacturing Date:
                            </span>
                            <span>
                              {getDate(
                                catalog?.product?.manufacturingDate,
                                true,
                                false
                              )}
                            </span>
                          </div>
                          <div className="w-1/3">
                            <span className="mr-1 font-bold text-brand-500 dark:text-white">
                              Expiry Date:
                            </span>
                            <span>
                              {getDate(
                                catalog?.product?.expiringDate,
                                true,
                                false
                              )}
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
                              {catalog?.product?.description ?? "no desciption"}
                            </span>
                          </div>
                        </li>
                        <li className="mb-5 flex gap-3">
                          <div className="w-3/3">
                            <span className="mr-1 font-bold text-brand-500 dark:text-white">
                              Comments:
                            </span>{" "}
                            <br />
                            <span>{catalog?.product?.comments}</span>
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
              <TableRowData colSpan={8} value="No catalog yet" />
            </tr>
          )}

          <tr>
            <TableRowData colSpan={6} value="Showing 20 entries" />
            <ActionRowData colSpan={2}>
              <Button
                disabled={catalogList?.currentPage === 1}
                style="flex gap-1 justify-items-center items-center"
                onClick={() => {
                  getCatalogs(storeId, {
                    category,
                    page: catalogList?.currentPage - 1,
                    count: 20,
                  });
                }}
              >
                <BsChevronDoubleLeft className="" />
                <span className="text-xs">Prev</span>
              </Button>
              <Button style="flex gap-1 bg-green-500 hover:bg-green-600">
                <span className="text-xs">
                  {catalogList?.currentPage} / {catalogList?.totalPage}
                </span>
              </Button>
              <Button
                disabled={catalogList?.currentPage === catalogList?.totalPage}
                style="flex gap-1 justify-items-center items-center"
                onClick={() => {
                  getCatalogs(storeId, {
                    category,
                    page: catalogList?.currentPage + 1,
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

      {openUpdateForm && (
        <Modal
          styling="w-3/6 p-5"
          onClose={() => {
            setOpenUpdateForm(false);
            setSelected({});
            clearError();
          }}
        >
          <form onSubmit={(e) => updateCatalog(e)}>
            <p className="mb-5 font-bold dark:text-white">
              Update Catalog in Store
            </p>
            <InputField
              variant="auth"
              extra="mb-3"
              label="Stock*"
              id="stock"
              type="number"
              name="stock"
              value={updateCatalogForm?.stock}
              onChange={(e: any) => onFormChange(e, "update")}
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
              label="Differential Percent (%)"
              id="differentialPercent"
              type="number"
              name="differentialPercent"
              value={updateCatalogForm?.differentialPercent}
              onChange={(e: any) => onFormChange(e, "update")}
            />

            <div className="flex flex-col justify-items-center gap-2 dark:text-white">
              <span>List on Shelf:</span>
              <span>
                <CheckField
                  styling="mr-6 inline-block"
                  checked={updateCatalogForm?.isListed === true}
                  sublabel="yes"
                  type="radio"
                  value="true"
                  name="isListed"
                  onChange={(e: any) => onFormChange(e, "update")}
                />
                <CheckField
                  styling="inline-block"
                  checked={updateCatalogForm?.isListed === false}
                  sublabel="no"
                  type="radio"
                  value="false"
                  name="isListed"
                  onChange={(e: any) => onFormChange(e, "update")}
                />
              </span>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => {
                  setOpenUpdateForm(false);
                  setSelected({});
                  clearError();
                }}
                style="linear mb-5 mt-3 w-full rounded-md bg-red-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200 text-xs"
              >
                Cancel
              </Button>
              <button className="linear mb-5 mt-3 w-full rounded-md bg-green-500 py-[12px] text-base text-xs font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200">
                Update
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Catalogs;
