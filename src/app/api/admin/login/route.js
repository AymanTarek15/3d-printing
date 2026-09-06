import { NextResponse } from "next/server";

const API_BASE = process.env.DJANGO_API_BASE || process.env.NEXT_PUBLIC_API_BASE; // prefer server-only, fall back to public base

const COOKIE = "admin_token";
const MAX_AGE = 60 * 60 * 8; // 8 hours

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  try {
    const res = await fetch(`${API_BASE}/dashboard-api/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        username: body?.username || "",
        password: body?.password || "",
      }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.token) {
      return NextResponse.json(
        { error: data?.detail || "Invalid credentials or not authorized." },
        { status: res.status === 429 ? 429 : 401 }
      );
    }

    const response = NextResponse.json({ ok: true, username: data.username });
    // httpOnly => not readable by JS (XSS-safe). Secure only in production (localhost is http).
    response.cookies.set(COOKIE, data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: MAX_AGE,
    });
    return response;
  } catch (err) {
    console.error("Admin login failed:", err);
    return NextResponse.json(
      { error: "Could not reach the server. Please try again." },
      { status: 502 }
    );
  }
}
