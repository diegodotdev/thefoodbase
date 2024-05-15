export default function PageHeader({
  title,
  breadcrumb,
}: {
  title: string;
  breadcrumb: string;
}) {
  return (
    <div className="w-full flex justify-between items-center py-5">
      <p className="text-4xl font-[600]">{title}</p>
      <p className="hidden md:inline text-sm text-gray-400">{breadcrumb}</p>
    </div>
  );
}
