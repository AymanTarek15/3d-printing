// app/api/checkout/route.js
import { NextResponse } from "next/server";
const API_BASE = process.env.DJANGO_API_BASE; // server-only env (no NEXT_PUBLIC)

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
