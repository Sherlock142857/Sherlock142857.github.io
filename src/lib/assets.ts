/**
 * Resolve an asset path (relative to the public directory) against the
 * configured base URL. This keeps image references working from a domain root
 * and from a GitHub Pages sub-path without hardcoding anything.
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL;
  const clean = path.replace(/^\/+/, "");
  return `${base}${clean}`;
}
