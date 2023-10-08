/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/style-prop-object */
import { useEffect, useState, useRef } from "react";
import SimpleTable from "core/components/table/SimpleTable";
import TableRowData from "core/components/table/TableRowData";
import { expandRow, getDate } from "core/services/helpers";
import Button from "core/components/button/Button";
import ActionRowData from "core/components/table/ActionRowData";
import SubHeader from "core/components/subHeader";
import Card from "core/components/card";
import Modal from "core/components/modal/Modal";
import InputField from "core/components/fields/InputField";
import { AiFillEdit } from "react-icons/ai";
import { FiDelete } from "react-icons/fi";
import useCategoryStore from "core/services/stores/useCategoryStore";
import { getCategories } from "core/services/api/categoryapi";
import TextField from "core/components/fields/TextField";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import useUserStore from "core/services/stores/useUserStore";

const Categories = () => {
  // TODO: Add access control
  const [expandedRows, setExpandedRows]: any = useState([]);
  const [expandState, setExpandState] = useState({});
  const textfieldRef = useRef(null);
  const user = useUserStore((state) => state.user);
  const errors = useCategoryStore((store) => store.errors);
  const updateError = useCategoryStore((store) => store.updateError);
  const categories = useCategoryStore((store) => store.categories);
  const getCategoryAction = useCategoryStore((store) => store.getCategory);
  const addCategoryAction = useCategoryStore((store) => store.addCategory);
  const updateCategoryAction = useCategoryStore(
    (store) => store.updateCategory
  );
  const deleteCategoryAction = useCategoryStore(
    (store) => store.deleteCategory
  );

  const [selected, setSelected]: any = useState({});
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
  });
  const [updateCategoryForm, setUpdateCategoryForm] = useState({
    name: "",
    description: "",
  });

  const [openAddForm, setOpenAddForm] = useState(false);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);

  const onFormChange = (e: any, form: string = "add") => {
    const { name, value } = e.target;
    switch (form) {
      case "add":
        setCategoryForm({
          ...categoryForm,
          [name]: value,
        });
        break;
      case "update":
        setUpdateCategoryForm({
          ...updateCategoryForm,
          [name]: value,
        });
        break;
      default:
        break;
    }
  };

  const addCategory = async (e: any) => {
    e.preventDefault();
    var status: any = await addCategoryAction({ ...categoryForm });
    if (status) {
      setCategoryForm({
        name: "",
        description: "",
      });
      setOpenAddForm(false);
    }
  };

  const updateCategory = async (e: any) => {
    e.preventDefault();
    await updateCategoryAction(
      {
        ...updateCategoryForm,
      },
      selected?.id
    );
  };

  const deleteCategory = async (e: any, storeId: string) => {
    const response = window.confirm(
      // eslint-disable-next-line quotes
      "Click 'OK' to delete this category'."
    );

    if (!response) return;
    await deleteCategoryAction(storeId);
  };

  const handleExpandRow = async (event: any, id: string) => {
    var newRows = await expandRow(id, expandedRows);
    setExpandState(newRows?.obj);
    setExpandedRows(newRows?.newExpandedRows);
  };

  useEffect(() => {
    if (categories?.length < 1) {
      getCategoryAction(user?.employerId);
    }
  }, []);

  return (
    <div className="mt-3">
      <Card extra={"w-full h-full mx-4 px-6 pb-6 sm:overflow-x-auto"}>
        <SubHeader
          title="Categories"
          action="Add Category"
          actionFunc={() => setOpenAddForm(true)}
        />
        <SimpleTable
          headers={[
            "Name",
            "Added By",
            "Updated By",
            "Date Added",
            "Last Updated",
            "Actions",
          ]}
        >
          {categories != null && categories?.length > 0 ? (
            categories.map((category: any) => (
              <>
                <tr key={category?.id}>
                  <TableRowData value={category?.name} />
                  <TableRowData value={category?.addedBy} />
                  <TableRowData value={category?.updatedBy} />
                  <TableRowData value={getDate(category?.dateAdded)} />
                  <TableRowData value={getDate(category?.lastUpdated)} />
                  <ActionRowData>
                    <Button
                      style="flex gap-1 justify-items-center items-center bg-gray-500 hover:bg-gray-600 dark:text-white-300"
                      onClick={(e: any) => handleExpandRow(e, category?.id)}
                    >
                      {!expandedRows.includes(category?.id) ? (
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
                    <Button
                      style="flex gap-1 justify-items-center items-center bg-yellow-500 hover:bg-yellow-600 dark:text-white-300"
                      onClick={() => {
                        setSelected({ ...category });
                        setUpdateCategoryForm({
                          name: category?.name,
                          description: category?.description,
                        });
                        setOpenUpdateForm(true);
                      }}
                    >
                      <AiFillEdit />
                      <span className="text-xs">Edit</span>
                    </Button>
                    <Button
                      style="flex gap-1 justify-items-center items-center bg-red-500 hover:bg-red-600 dark:text-white-300"
                      onClick={(e: any) => {
                        deleteCategory(e, category?.id);
                      }}
                    >
                      <FiDelete />
                      <span className="text-xs">Delete</span>
                    </Button>
                  </ActionRowData>
                </tr>
                {expandedRows.includes(category?.id) ? (
                  <tr>
                    <td
                      className="border-[1px] border-gray-200 text-sm"
                      colSpan={6}
                    >
                      <ul className="p-5">
                        <li className="mb-5 flex gap-3">
                          <div className="w-3/3">
                            <span className="mr-1 font-bold text-brand-500 dark:text-white">
                              Description:
                            </span>{" "}
                            <br />
                            <span>
                              {category?.description ?? "no desciption"}
                            </span>
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
              <TableRowData colSpan={7} value="No data yet" />
            </tr>
          )}
        </SimpleTable>
      </Card>

      {openAddForm && (
        <Modal
          styling="w-3/6 p-5"
          onClose={() => {
            setOpenAddForm(false);
          }}
        >
          <form onSubmit={(e) => addCategory(e)}>
            <p className="mb-5 font-bold dark:text-white">Add New Category</p>
            <InputField
              variant="auth"
              extra="mb-3"
              label="Name*"
              id="name"
              type="text"
              name="name"
              value={categoryForm?.name}
              onChange={(e: any) => onFormChange(e, "add")}
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
              value={categoryForm?.description}
              onChange={(e: any) => onFormChange(e, "add")}
              onFocus={() => {
                if (errors?.Description && errors?.Description?.length > 0) {
                  updateError("Description");
                }
              }}
              error={errors?.Description}
            />

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => setOpenAddForm(false)}
                style="linear mb-5 mt-3 w-full rounded-md bg-red-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200 text-xs"
              >
                Cancel
              </Button>
              <button className="linear mb-5 mt-3 w-full rounded-md bg-green-500 py-[12px] text-base text-xs font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200">
                Add category
              </button>
            </div>
          </form>
        </Modal>
      )}

      {openUpdateForm && (
        <Modal
          styling="w-3/6 p-5"
          onClose={() => {
            setOpenUpdateForm(false);
            setSelected({});
          }}
        >
          <form onSubmit={(e) => updateCategory(e)}>
            <p className="mb-5 font-bold dark:text-white">Update Category</p>
            <InputField
              variant="auth"
              extra="mb-3"
              label="Name*"
              id="name"
              type="text"
              name="name"
              value={updateCategoryForm?.name}
              onChange={(e: any) => onFormChange(e, "update")}
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
              value={updateCategoryForm?.description}
              onChange={(e: any) => onFormChange(e, "update")}
              onFocus={() => {
                if (errors?.Description && errors?.Description?.length > 0) {
                  updateError("Description");
                }
              }}
              error={errors?.Description}
            />

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => {
                  setOpenUpdateForm(false);
                  setSelected({});
                }}
                style="linear mb-5 mt-3 w-full rounded-md bg-red-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200 text-xs"
              >
                Cancel
              </Button>
              <button className="linear mb-5 mt-3 w-full rounded-md bg-green-500 py-[12px] text-base text-xs font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200">
                Update category
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Categories;
