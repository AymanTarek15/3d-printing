"use client";
import { useEffect, useState } from "react";
import { adminApi, asList } from "../../adminClient";

export default function MessagesPage() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);

  async function load() {
    try { setItems(asList(await adminApi.get("messages"))); }
    catch (e) { setError(e.message); }
  }
  useEffect(() => { load(); }, []);

  async function toggleHandled(m) {
    try {
      const updated = await adminApi.patch(`messages/${m.id}`, { handled: !m.handled });
      setItems((x) => x.map((i) => (i.id === m.id ? updated : i)));
    } catch (e) { alert(e.message); }
  }

  async function remove(m) {
    if (!confirm(`Delete message from ${m.name}?`)) return;
    try {
      await adminApi.del(`messages/${m.id}`);
      setItems((x) => x.filter((i) => i.id !== m.id));
    } catch (e) { alert(e.message); }
  }

  return (
    <div>
      <h1 className="dashH1">Contact messages</h1>
      {error && <p className="dashError">{error}</p>}
      {items === null ? (
        <p className="dashMuted">Loading…</p>
      ) : items.length === 0 ? (
        <p className="dashMuted">No messages yet.</p>
      ) : (
        <div className="dashMsgList">
          {items.map((m) => (
            <div key={m.id} className={`dashMsg ${m.handled ? "isHandled" : ""}`}>
              <div className="dashMsgHead">
                <div>
                  <strong>{m.name}</strong>{" "}
                  <a href={`mailto:${m.email}`} className="dashLink">{m.email}</a>
                </div>
                <span className="dashMuted">{new Date(m.created).toLocaleString()}</span>
              </div>
              <p className="dashMsgBody">{m.message || <em>(no message)</em>}</p>
              <div className="dashRowActions">
                <button className="dashLink" onClick={() => toggleHandled(m)}>
                  {m.handled ? "Mark unread" : "Mark handled"}
                </button>
                <button className="dashDanger" onClick={() => remove(m)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
