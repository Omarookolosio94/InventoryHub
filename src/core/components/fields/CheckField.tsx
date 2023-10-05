import React from "react";

export default function CheckField(props: {
  name?: string;
  value?: any;
  checked?: boolean;
  onChange?: any;
  label?: string;
  sublabel: string;
  styling?: string;
  type?: string;
  disabled?: boolean;
  state?: any;
}) {
  const {
    name,
    value,
    disabled,
    state,
    checked,
    onChange,
    label,
    sublabel,
    styling,
    type,
  } = props;

  return (
    <div className={`${styling || ""} relative`}>
      <label htmlFor={name} className="text-text-color block text-xs">
        {label}
      </label>
      <div className="align-items-center flex justify-between gap-2">
        <input
          type={type}
          className={`flex h-12 w-full items-center justify-center rounded-md border bg-white/0 p-3 text-sm outline-none ${
            disabled === true
              ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
              : state === "error"
              ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
              : state === "success"
              ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
              : "border-gray-200 dark:!border-white/10 dark:text-white"
          }`}
          disabled={disabled}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
        />
        <span className="text-black-p capitalize">{sublabel}</span>
      </div>
    </div>
  );
}
