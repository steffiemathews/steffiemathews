// Small pill used for tags (timeline) and skill items.
export default function Tag({ size = "sm", children }) {
  const sizing = size === "xs" ? "text-xs px-2.5 py-0.5" : "text-sm px-3 py-1";
  return (
    <span className={`inline-block mr-2 mb-2 rounded-full border border-chip-border bg-chip font-medium ${sizing}`}>
      {children}
    </span>
  );
}
