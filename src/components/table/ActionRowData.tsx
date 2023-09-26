export default function ActionRowData({ children }: { children: any }) {
  return (
    <td className="min-w-[150px] border-white/0 py-3 pr-4">
      <div className="flex gap-3 items-center">{children}</div>
    </td>
  );
}
