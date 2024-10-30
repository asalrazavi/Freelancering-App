export default function Sidebar({ children }) {
  return (
    <div className="row-span-2 row-start-1 bg-secondary-0 border-l border-gray-200 p-4">
      <ul className="flex flex-col gap-y-4">{children}</ul>
    </div>
  );
}
