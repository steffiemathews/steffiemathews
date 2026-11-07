import { useTheme } from "../theme/ThemeContext";

// Sun/moon icon (like Ben-geo): shows the mode you'd switch to.
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const light = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      title={light ? "Dark mode" : "Light mode"}
      className="p-1 text-muted hover:text-fg transition-colors"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8"
           strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {light
          ? <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
          : <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>}
      </svg>
    </button>
  );
}
