// The one card style used everywhere (home, timeline, skills).
export default function Card({ className = "", children }) {
  return (
    <div
      className={`p-5 sm:p-6 rounded-2xl border border-card-border bg-card shadow-card
        transition-shadow duration-200 hover:shadow-card-hover ${className}`}
    >
      {children}
    </div>
  );
}
