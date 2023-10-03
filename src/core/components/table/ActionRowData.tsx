export default function ActionRowData({
  children,
  colSpan = 1,
  style = "",
}: {
  style?: any;
  children: any;
  colSpan?: number;
}) {
  return (
    <td
      colSpan={colSpan}
      className={`min-w-[150px] border-white/0 py-3 pr-4 ${style}`}
    >
      <div className="flex items-center justify-items-center gap-3">
        {children}
      </div>
    </td>
  );
}
