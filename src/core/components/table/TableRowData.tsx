export default function TableRowData({
  value = "",
  colSpan = 1,
  style = "",
}: {
  style?: any;
  value: any;
  colSpan?: number;
}) {
  return (
    <td
      colSpan={colSpan}
      className={`min-w-[150px] border-white/0 py-3 pr-4 ${style}`}
    >
      <p className="text-sm text-navy-700 dark:text-white">{value}</p>
    </td>
  );
}
