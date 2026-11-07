// Slim header like Ben-geo's: signature on the left, text links + theme icon on the right.
// The active page gets an accent underline. Scrolls away with the page.
import { Link, useLocation } from "react-router-dom";
import Signature from "./Signature";
import ThemeToggle from "./ThemeToggle";

const pages = [
  { label: "Home", path: "/" },
  { label: "Research", path: "/research" },
  { label: "Leadership", path: "/leadership" },
  { label: "Skills", path: "/skills" },
];

export default function TopBar() {
  const { pathname } = useLocation();

  return (
    <header className="absolute inset-x-0 top-0 z-50 flex h-14 items-center justify-between px-4 sm:px-8">
      <Signature />
      <nav aria-label="Main" className="ml-auto flex items-center gap-3.5 sm:gap-6">
        {pages.map((p) => {
          const active = p.path === "/" ? pathname === "/" : pathname.startsWith(p.path);
          return (
            <Link
              key={p.path}
              to={p.path}
              aria-current={active ? "page" : undefined}
              className={`text-sm sm:text-[15px] transition-colors hover:text-fg
                ${active
                  ? "text-fg underline decoration-accent-solid decoration-2 underline-offset-[6px]"
                  : "text-muted"}`}
            >
              {p.label}
            </Link>
          );
        })}
        <ThemeToggle />
      </nav>
    </header>
  );
}
