import reSizeField from "core/services/resizeField";
import React, { useRef } from "react";

function TextField(props: {
  styling?: string;
  extra?: string;
  showLabel?: boolean;
  ref?: any;
  rows?: number;
  id: string;
  label: string;
  variant: string;
  state?: string;
  disabled?: boolean;
  type?: string;
  name?: string;
  onChange?: any;
  onFocus?: any;
  value?: string | number;
  error?: string;
}) {
  const {
    name,
    ref,
    rows = 3,
    showLabel = true,
    styling,
    extra,
    onChange,
    onFocus,
    label,
    id,
    variant,
    state,
    disabled,
    value,
  } = props;

  const textAreaRef = useRef(ref);
  reSizeField(textAreaRef.current, value);

  return (
    <div className={`${extra} relative`}>
      {showLabel && (
        <label
          htmlFor={name}
          className={`text-sm text-navy-700 dark:text-white ${
            variant === "auth" ? "ml-1.5 font-medium" : "ml-3 font-bold"
          }`}
        >
          {label}
        </label>
      )}{" "}
      <div className="flex flex-col gap-2 md:flex-row">
        <textarea
          className={`mt-2 flex h-12 w-full items-center justify-center rounded-md border bg-white/0 p-3 text-sm outline-none ${
            disabled === true
              ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
              : state === "error"
              ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
              : state === "success"
              ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
              : "border-gray-200 dark:!border-white/10 dark:text-white"
          } ${styling}`}
          id={id}
          name={name}
          value={value}
          ref={textAreaRef}
          rows={rows}
          onFocus={onFocus}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

export default TextField;


// TODO: Fix the default row sizing of text inputs