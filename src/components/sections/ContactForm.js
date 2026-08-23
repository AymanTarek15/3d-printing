"use client"
import { useState } from "react"

export default function ContactForm() {
  const [status, setStatus] = useState(null)   // success message
  const [error, setError] = useState(null)      // error message
  const [loading, setLoading] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setStatus(null)
    setError(null)
    setLoading(true)

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const body = await res.json().catch(() => null)

      if (res.ok) {
        setStatus(body?.message || "Thanks! We'll get back to you shortly.")
        form.reset()
      } else {
        // Surface the first field error from the API, if any.
        const firstError =
          body && typeof body === "object"
            ? Object.values(body).flat().find(Boolean)
            : null
        setError(firstError || "Something went wrong. Please try again.")
      }
    } catch {
      setError("Could not send your message. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid" style={{ gap: 12 }}>
      <input
        name="name"
        placeholder="Your name"
        className="input"
        required
        style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid var(--border)" }}
      />
      <input
        type="email"
        name="email"
        placeholder="Your email"
        required
        style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid var(--border)" }}
      />
      <textarea
        name="message"
        placeholder="Tell us about your project"
        style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid var(--border)", minHeight: 120 }}
      />
      <button className="btn btn-primary" disabled={loading}>
        {loading ? "Sending…" : "Send"}
      </button>
      {status && <p style={{ color: "green" }}>{status}</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}
    </form>
  )
}
