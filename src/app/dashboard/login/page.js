"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "../dashboard.css";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/dashboard";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.get("username"),
          password: form.get("password"),
        }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok) {
        router.replace(next);
        router.refresh();
      } else {
        setError(data?.error || "Login failed.");
      }
    } catch {
      setError("Could not reach the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dashLoginWrap">
      <form className="dashLoginCard" onSubmit={onSubmit}>
        <h1 className="dashLoginTitle">Admin Dashboard</h1>
        <p className="dashLoginSub">Staff sign-in only.</p>

        <label className="dashField">
          <span>Username</span>
          <input name="username" autoComplete="username" required />
        </label>
        <label className="dashField">
          <span>Password</span>
          <input name="password" type="password" autoComplete="current-password" required />
        </label>

        <button className="btn btn-primary dashLoginBtn" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </button>

        {error && <p className="dashError">{error}</p>}
      </form>
    </div>
  );
}

export default function DashboardLogin() {
  return (
    <Suspense
      fallback={
        <div className="dashLoginWrap">
          <div className="dashLoginCard">Loading…</div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
