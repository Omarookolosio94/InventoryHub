export default function TableRowData({
  value = "",
  colSpan = 1,
  style = "",
  onClick = () => {},
  enableAction = false,
}: {
  style?: any;
  onClick?: any;
  value: any;
  enableAction?: boolean;
  colSpan?: number;
}) {
  return (
    <td
      colSpan={colSpan}
      className={`min-w-[150px] border-white/0 py-3 pr-4 ${style}`}
    >
      <p
        onClick={onClick}
        className={`text-sm text-navy-700 dark:text-white ${
          enableAction && "cursor-pointer hover:text-brand-600"
        }`}
      >
        {value}
      </p>
    </td>
  );
}
