import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE = process.env.DJANGO_API_BASE; // server-only
const COOKIE = "admin_token";

// Reject cross-origin mutations (lightweight CSRF defense on top of SameSite).
function sameOrigin(req) {
  const origin = req.headers.get("origin");
  if (!origin) return true; // same-origin GETs often omit Origin
  const host = req.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

async function forward(req, segments) {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  if (req.method !== "GET" && !sameOrigin(req)) {
    return NextResponse.json({ error: "Bad origin." }, { status: 403 });
  }

  // DRF's router expects a trailing slash; preserve query string.
  let path = (segments || []).join("/");
  if (!path.endsWith("/")) path += "/";
  const search = new URL(req.url).search;
  const target = `${API_BASE}/dashboard-api/${path}${search}`;

  const init = {
    method: req.method,
    headers: {
      Authorization: `Token ${token}`,
      Accept: "application/json",
    },
  };

  if (!["GET", "HEAD"].includes(req.method)) {
    const bodyText = await req.text();
    if (bodyText) {
      init.body = bodyText;
      init.headers["Content-Type"] =
        req.headers.get("content-type") || "application/json";
    }
  }

  try {
    const res = await fetch(target, init);
    if (res.status === 204) return new NextResponse(null, { status: 204 });
    const data = await res.json().catch(() => null);
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Admin proxy error:", err);
    return NextResponse.json(
      { error: "Could not reach the server." },
      { status: 502 }
    );
  }
}

export async function GET(req, { params }) {
  const { path } = await params;
  return forward(req, path);
}
export async function POST(req, { params }) {
  const { path } = await params;
  return forward(req, path);
}
export async function PUT(req, { params }) {
  const { path } = await params;
  return forward(req, path);
}
export async function PATCH(req, { params }) {
  const { path } = await params;
  return forward(req, path);
}
export async function DELETE(req, { params }) {
  const { path } = await params;
  return forward(req, path);
}
