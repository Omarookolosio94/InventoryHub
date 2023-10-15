import React from "react";
import Button from "core/components/button/Button";
import InputField from "../fields/InputField";
import SelectField from "../fields/SelectField";

export default function SubHeader(props: {
  title: string;
  action?: string;
  actionFunc?: any;
  showAction?: boolean;
  icon?: any;
  showSearch?: boolean;
  searchValue?: string;
  searchAction?: any;
  searchChange?: any;
  showSelect?: boolean;
  selectOptions?: any;
  selectChange?: any;
  selectValue?: any;
}) {
  const {
    title,
    action,
    actionFunc,
    showSearch = false,
    showAction = true,
    searchValue,
    searchAction,
    searchChange,
    icon,
    showSelect = false,
    selectOptions = [],
    selectChange,
    selectValue = "",
  } = props;

  return (
    <div className="align-item-center mt-5 flex justify-between items-center py-2">
      <div className="flex gap-3">
        <p className="text-black-p font-arial text-base font-bold">{title}</p>
      </div>
      <div className="flex gap-3">
        {showAction && (
          <Button
            style="flex gap-1 justify-items-center items-center"
            onClick={() => actionFunc()}
          >
            {icon && icon}
            <span className="text-xs">{action}</span>
          </Button>
        )}

        {showSearch && (
          <InputField
            label="Search"
            extra=""
            variant="auth"
            showLabel={false}
            id="search"
            type="text"
            name="search"
            placeholder="search"
            value={searchValue}
            onBlur={searchAction}
            onChange={searchChange}
          />
        )}

        {showSelect && (
          <SelectField
            label="Choose"
            showLabel={false}
            extra=""
            defaultName="Select an Option"
            defaultValue=""
            name="select"
            options={selectOptions}
            value={selectValue}
            onChange={selectChange}
          />
        )}
      </div>
    </div>
  );
}