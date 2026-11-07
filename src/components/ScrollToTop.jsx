import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// scroll back to the top whenever the route changes
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [pathname]);
  return null;
}
