// app/api/contact/route.js
import { NextResponse } from "next/server";

const API_BASE = process.env.DJANGO_API_BASE || process.env.NEXT_PUBLIC_API_BASE; // prefer server-only, fall back to public base

export async function POST(req) {
  let payload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  try {
    const res = await fetch(`${API_BASE}/product/contact/`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => null);
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Contact forward failed:", err);
    return NextResponse.json(
      { error: "Could not reach the server. Please try again later." },
      { status: 502 }
    );
  }
}
