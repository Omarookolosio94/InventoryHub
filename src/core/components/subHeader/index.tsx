import React from "react";
import Button from "core/components/button/Button";
import InputField from "../fields/InputField";
import SelectField from "../fields/SelectField";
import { FaFileExport } from "react-icons/fa";
import { ExportButton } from "../button/ExportButton";

export default function SubHeader(props: {
  title: string;
  action?: string;
  actionFunc?: any;
  showAction?: boolean;
  icon?: any;
  showSearch?: boolean;
  searchValue?: any;
  searchAction?: any;
  searchChange?: any;
  showSelect?: boolean;
  selectOptions?: any;
  selectChange?: any;
  selectValue?: any;
  showExport?: boolean;
  exportAction?: any;
  searchPlaceholder?: string;
  searchLabel?: string;
  searchType?: string;
  exportFileName?: string;
  exportData?: any;
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
    showExport = false,
    exportFileName,
    exportData,
    searchPlaceholder = "search",
    searchLabel = "Search",
    searchType = "text",
  } = props;

  return (
    <div className="align-item-center mt-5 flex items-center justify-between py-2">
      <div className="flex w-[400px] items-center justify-between">
        <p className="text-black-p font-arial text-base font-bold">{title}</p>
        {showSearch && (
          <div className="hide-print">
            <InputField
              label={searchLabel}
              extra=""
              variant="auth"
              showLabel={false}
              id="search"
              type={searchType}
              name="search"
              placeholder={searchPlaceholder}
              value={searchValue}
              onBlur={searchAction}
              onChange={searchChange}
            />
          </div>
        )}
      </div>
      <div className="flex gap-3">
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

        {showExport && (
          <ExportButton data={exportData} filename={exportFileName} />
        )}

        {showAction && (
          <Button
            style="flex gap-1 justify-items-center items-center hide-print"
            onClick={() => actionFunc()}
          >
            {icon && icon}
            <span className="text-xs">{action}</span>
          </Button>
        )}
      </div>
    </div>
  );
}
