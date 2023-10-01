export default function TableRowData(props: { value: any }) {
  return (
    <td className="min-w-[150px] border-white/0 py-3 pr-4">
      <p className="text-sm text-navy-700 dark:text-white">
        {props?.value}
      </p>
    </td>
  );
}
