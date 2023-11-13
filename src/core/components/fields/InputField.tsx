// Custom components
import React from "react";

function InputField(props: {
  id: string;
  label: string;
  extra: string;
  placeholder?: string;
  variant: string;
  state?: string;
  disabled?: boolean;
  type?: string;
  name?: string;
  onChange?: any;
  onFocus?: any;
  onBlur?: any;
  value?: string | number;
  error?: string;
  dataList?: any;
  enableDataList?: boolean;
  list?: string;
  showLabel?: boolean;
  instruction?: string;
}) {
  const {
    name,
    onChange,
    onFocus,
    onBlur,
    label,
    id,
    extra,
    type,
    placeholder,
    variant,
    state,
    disabled,
    value,
    error,
    dataList = [],
    enableDataList = false,
    list,
    showLabel = true,
    instruction,
  } = props;

  return (
    <div className={`${extra}`}>
      {showLabel && (
        <label
          htmlFor={id}
          className={`text-sm text-navy-700 dark:text-white ${
            variant === "auth" ? "ml-1.5 font-medium" : "ml-3 font-bold"
          }`}
        >
          {label}
        </label>
      )}
      <input
        disabled={disabled}
        type={type}
        id={id}
        autoComplete="on"
        name={name}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        value={value}
        list={list}
        aria-autocomplete="none"
        className={`mt-2 flex h-12 w-full items-center justify-center rounded-md border bg-white/0 p-3 text-sm outline-none ${
          disabled === true
            ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
            : state === "error"
            ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
            : state === "success"
            ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
            : "border-gray-200 dark:!border-white/10 dark:text-white"
        }`}
      />
      {enableDataList && dataList?.length > 0 && (
        <datalist id={list}>
          {dataList.map((data: any) => (
            <option key={data?.value} value={data?.value}>
              {data?.name}
            </option>
          ))}
        </datalist>
      )}
      <span className="text-xs text-gray-500">{instruction}</span>
      <span className="text-red-500 ">{error}</span>
    </div>
  );
}

export default InputField;
