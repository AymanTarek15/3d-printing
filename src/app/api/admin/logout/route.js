import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE = process.env.DJANGO_API_BASE || process.env.NEXT_PUBLIC_API_BASE;
const COOKIE = "admin_token";

export async function POST() {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;

  // Best-effort: invalidate the token server-side too.
  if (token) {
    try {
      await fetch(`${API_BASE}/dashboard-api/auth/logout/`, {
        method: "POST",
        headers: { Authorization: `Token ${token}` },
      });
    } catch {
      /* ignore — we still clear the cookie below */
    }
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
