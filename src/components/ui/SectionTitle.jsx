export default function SectionTitle({ className = "mb-8", children }) {
  return <h2 className={`text-2xl md:text-3xl font-bold ${className}`}>{children}</h2>;
}
