import { useEffect } from "react";
import { useLocation } from "react-router";

function ScrollToTop({ children }) {
  const { pathname } = useLocation() || {};

  useEffect(() => {
    if (window) window.scrollTo(0, 0);
  }, [pathname]);

  return children;
}

export default ScrollToTop;
