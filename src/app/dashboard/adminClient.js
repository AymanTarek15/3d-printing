// Client-side helper: talks ONLY to same-origin /api/admin/* (the BFF proxy).
// The proxy injects the admin token server-side; the browser never sees it.

async function request(path, { method = "GET", body } = {}) {
  const res = await fetch(`/api/admin/${path}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401) {
    // Session expired / not authed — send back to login.
    if (typeof window !== "undefined") window.location.href = "/dashboard/login";
    throw new Error("Not authenticated");
  }

  if (res.status === 204) return null;

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const msg =
      (data && (data.detail || Object.values(data).flat?.().join(" "))) ||
      `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data;
}

export const adminApi = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body }),
  patch: (path, body) => request(path, { method: "PATCH", body }),
  put: (path, body) => request(path, { method: "PUT", body }),
  del: (path) => request(path, { method: "DELETE" }),
};

// DRF list endpoints may return an array or {results:[...]}.
export function asList(data) {
  if (Array.isArray(data)) return data;
  return data?.results || [];
}
