export default function Button({
  style = "",
  children = <div></div>,
  disabled = false,
  onClick = () => {},
  type = "button",
}: any) {
  return (
    <button
      className={`pointer-events-auto rounded-md bg-indigo-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500 ${style} `}
      type={type === "submit" ? "submit" : "button"}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
