// app/api/checkout/route.js
import { NextResponse } from "next/server";
const API_BASE = process.env.DJANGO_API_BASE || process.env.NEXT_PUBLIC_API_BASE; // prefer server-only, fall back to public base

export async function POST(req) {
  const payload = await req.json();
  const res = await fetch(`${API_BASE}/product/shipping/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => null);
  return NextResponse.json(data, { status: res.status });
}
