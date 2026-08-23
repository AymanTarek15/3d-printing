const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

// How long to wait for the backend before giving up. Keeps a slow/sleeping
// backend (e.g. Render free-tier cold start) from hanging the whole render.
const DEFAULT_TIMEOUT_MS = 10000;

/**
 * Resilient GET helper for server-side data fetching.
 * - Never throws: returns `fallback` on any error (network, timeout, non-2xx, bad JSON).
 * - Aborts after `timeoutMs` so the page can render its empty state instead of a 500.
 * - Normalizes DRF-style `{ results: [...] }` payloads when `fallback` is an array.
 */
async function apiGet(path, { fallback = [], timeoutMs = DEFAULT_TIMEOUT_MS } = {}) {
  if (!API_BASE) {
    console.error("NEXT_PUBLIC_API_BASE is not set — skipping fetch:", path);
    return fallback;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });

    if (!res.ok) {
      console.error(`Fetch ${path} failed:`, res.status);
      return fallback;
    }

    // 204 No Content (e.g. no active season) has an empty body.
    if (res.status === 204) return fallback;

    const data = await res.json();

    if (Array.isArray(fallback)) {
      return Array.isArray(data) ? data : data?.results || fallback;
    }
    return data ?? fallback;
  } catch (err) {
    const reason = err?.name === "AbortError" ? "timed out" : err?.message;
    console.error(`Fetch ${path} error (${reason})`);
    return fallback;
  } finally {
    clearTimeout(timer);
  }
}

// All active categories
export async function getCategories() {
  return apiGet("/product/category-filter/?active=true", { fallback: [] });
}

// Active season / event (single object, or {} when none is active)
export async function getSeason() {
  return apiGet("/product/season-change/", { fallback: {} });
}

// Bestselling active products
export async function getBestSelling() {
  return apiGet("/product/list-filter/?active=true&best_selling=true", { fallback: [] });
}

// Active products in a specific category
export async function getSpecificCategory(slug) {
  return apiGet(
    `/product/list-filter/?active=true&category__name=${encodeURIComponent(slug)}`,
    { fallback: [] }
  );
}

// All active products
export async function getAllProducts() {
  return apiGet("/product/list-filter/?active=true", { fallback: [] });
}

// A single product by title (returns a list; caller takes [0])
export async function getProduct(slug) {
  return apiGet(`/product/list-filter/?title=${encodeURIComponent(slug)}`, { fallback: [] });
}

export async function postCheckout(payload) {
  const res = await fetch(`${API_BASE}/product/shipping/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  return res;
}
