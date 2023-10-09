export default function Button({
  style = "",
  children = <div></div>,
  disabled = false,
  onClick = () => { },
  onFocus = () => {},
  type = "button",
}: any) {
  return (
    <button
      className={`pointer-events-auto rounded-md text-xs bg-brand-500 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-brand-600 disabled:cursor-not-allowed ${style} `}
      type={type === "submit" ? "submit" : "button"}
      onClick={onClick}
      onFocus={onFocus}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
