"use client";
import { useEffect, useState } from "react";
import { adminApi, asList } from "../../adminClient";

const emptyNew = {
  username: "", email: "", password: "",
  is_active: true, is_staff: true, is_superuser: false,
};

export default function UsersPage() {
  const [users, setUsers] = useState(null);
  const [me, setMe] = useState(null);
  const [creating, setCreating] = useState(emptyNew);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  async function load() {
    try {
      const [list, meData] = await Promise.all([
        adminApi.get("users"),
        adminApi.get("auth/me"),
      ]);
      setUsers(asList(list));
      setMe(meData?.username);
    } catch (e) {
      setError(e.message);
    }
  }
  useEffect(() => { load(); }, []);

  const isSelf = (u) => me && u.username === me;

  async function create(e) {
    e.preventDefault();
    setBusy(true); setError(null);
    try {
      const created = await adminApi.post("users", creating);
      setUsers((x) => [...x, created].sort((a, b) => a.username.localeCompare(b.username)));
      setCreating(emptyNew);
    } catch (e) { setError(e.message); }
    finally { setBusy(false); }
  }

  async function toggle(u, field) {
    try {
      const updated = await adminApi.patch(`users/${u.id}`, { [field]: !u[field] });
      setUsers((x) => x.map((i) => (i.id === u.id ? updated : i)));
    } catch (e) { alert(e.message); }
  }

  async function setPassword(u) {
    const pw = prompt(`Set a new password for "${u.username}" (min 8 chars):`);
    if (!pw) return;
    try {
      await adminApi.patch(`users/${u.id}`, { password: pw });
      alert("Password updated.");
    } catch (e) { alert(e.message); }
  }

  async function remove(u) {
    if (isSelf(u)) return;
    if (!confirm(`Delete user "${u.username}"? This cannot be undone.`)) return;
    try {
      await adminApi.del(`users/${u.id}`);
      setUsers((x) => x.filter((i) => i.id !== u.id));
    } catch (e) { alert(e.message); }
  }

  return (
    <div>
      <h1 className="dashH1">Users</h1>
      <p className="dashMuted" style={{ marginTop: -12, marginBottom: 16 }}>
        Superusers only. You can’t remove your own access or delete yourself.
      </p>

      <form className="dashInlineForm" onSubmit={create}>
        <input placeholder="Username" value={creating.username}
          onChange={(e) => setCreating({ ...creating, username: e.target.value })} required />
        <input placeholder="Email" type="email" value={creating.email}
          onChange={(e) => setCreating({ ...creating, email: e.target.value })} />
        <input placeholder="Password (min 8)" type="password" value={creating.password}
          onChange={(e) => setCreating({ ...creating, password: e.target.value })} required minLength={8} />
        <label className="dashCheck">
          <input type="checkbox" checked={creating.is_staff}
            onChange={(e) => setCreating({ ...creating, is_staff: e.target.checked })} /> Staff
        </label>
        <label className="dashCheck">
          <input type="checkbox" checked={creating.is_superuser}
            onChange={(e) => setCreating({ ...creating, is_superuser: e.target.checked })} /> Superuser
        </label>
        <button className="btn btn-primary" disabled={busy}>{busy ? "Adding…" : "+ Add user"}</button>
      </form>

      {error && <p className="dashError">{error}</p>}

      {users === null ? (
        <p className="dashMuted">Loading…</p>
      ) : (
        <div className="dashTableWrap">
          <table className="dashTable">
            <thead>
              <tr>
                <th>Username</th><th>Email</th><th>Active</th><th>Staff</th>
                <th>Superuser</th><th>Last login</th><th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.username}{isSelf(u) && <span className="dashSelfTag"> (you)</span>}</td>
                  <td>{u.email || "—"}</td>
                  <td style={{ textAlign: "center" }}>
                    <input type="checkbox" checked={u.is_active} disabled={isSelf(u)}
                      onChange={() => toggle(u, "is_active")} />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input type="checkbox" checked={u.is_staff} disabled={isSelf(u)}
                      onChange={() => toggle(u, "is_staff")} />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input type="checkbox" checked={u.is_superuser} disabled={isSelf(u)}
                      onChange={() => toggle(u, "is_superuser")} />
                  </td>
                  <td>{u.last_login ? new Date(u.last_login).toLocaleDateString() : "never"}</td>
                  <td className="dashRowActions">
                    <button className="dashLink" onClick={() => setPassword(u)}>Set password</button>
                    <button className="dashDanger" onClick={() => remove(u)} disabled={isSelf(u)}
                      style={isSelf(u) ? { opacity: 0.4, cursor: "not-allowed" } : undefined}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
