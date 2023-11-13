// Custom components
import React from "react";

export default function SelectField(props: {
  id?: string;
  label?: string;
  extra?: string;
  variant?: string;
  state?: string;
  disabled?: boolean;
  showLabel?: boolean;
  value: string | number;
  onChange?: any;
  onFocus?: any;
  name: string;
  defaultValue?: string | number;
  defaultName?: string;
  options?: any | [];
  error?: any;
}) {
  const {
    label,
    id,
    extra,
    value,
    name,
    onChange,
    onFocus,
    defaultValue,
    defaultName,
    options,
    variant,
    state,
    disabled,
    showLabel,
    error,
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
      <select
        value={value}
        disabled={disabled}
        id={id}
        name={name}
        onChange={onChange}
        onFocus={onFocus}
        className={`mt-2 flex h-12 w-full items-center justify-center rounded-md border bg-white/0 p-3 text-sm outline-none ${
          disabled === true
            ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
            : state === "error"
            ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
            : state === "success"
            ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
            : "border-gray-200 dark:!border-white/10 dark:text-white"
        }`}
      >
        {defaultName?.length > 0 && (
          <option key={defaultValue} value={defaultValue}>
            {defaultName}
          </option>
        )}
        {options?.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      <span className="text-red-500 ">{error}</span>
    </div>
  );
}
