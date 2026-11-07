// Light/dark theme. Dark is the default; the last choice is remembered.
// index.html applies the saved theme before first paint so there is no flash.
// Colours themselves live in theme.css, keyed off <html data-theme="...">.
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({ theme: "dark", toggleTheme: () => {} });

const readSaved = () => {
  try { return localStorage.getItem("theme") === "light" ? "light" : "dark"; }
  catch { return "dark"; }
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readSaved);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("theme", theme); } catch { /* storage unavailable */ }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
