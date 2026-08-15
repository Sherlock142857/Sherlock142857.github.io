import { useCallback, useEffect, useState } from "react";

export type Route = { name: "home" } | { name: "field"; fieldId: string };

function parseHash(hash: string): Route {
  const path = hash.replace(/^#/, "") || "/";
  const parts = path.split("/").filter(Boolean);
  if (parts[0] === "field" && parts[1]) {
    return { name: "field", fieldId: parts[1] };
  }
  return { name: "home" };
}

function toHash(route: Route): string {
  return route.name === "field" ? `#/field/${route.fieldId}` : "#/";
}

/**
 * Minimal hash-based router. Hash routing is chosen deliberately:
 *
 *  - it needs no server rewrite rules, so the static build works on GitHub
 *    Pages, Vercel, Netlify, or a plain file server;
 *  - deep links and the browser back button work out of the box;
 *  - routes are derived from field ids, so adding a field never touches this
 *    file.
 */
export function useHashRoute(): [Route, (route: Route) => void] {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = useCallback((next: Route) => {
    const hash = toHash(next);
    if (window.location.hash !== hash) {
      window.location.hash = hash;
    } else {
      setRoute(next);
    }
  }, []);

  return [route, navigate];
}
