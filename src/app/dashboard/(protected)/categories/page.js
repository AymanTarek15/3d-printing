"use client";
import { useEffect, useState } from "react";
import { adminApi, asList } from "../../adminClient";

const emptyNew = { name: "", about: "", image: "", active: true };

export default function CategoriesPage() {
  const [items, setItems] = useState(null);
  const [creating, setCreating] = useState(emptyNew);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  async function load() {
    try {
      setItems(asList(await adminApi.get("categories")));
    } catch (e) { setError(e.message); }
  }
  useEffect(() => { load(); }, []);

  async function create(e) {
    e.preventDefault();
    setBusy(true); setError(null);
    try {
      const created = await adminApi.post("categories", creating);
      setItems((x) => [...x, created]);
      setCreating(emptyNew);
    } catch (e) { setError(e.message); }
    finally { setBusy(false); }
  }

  function setField(id, key, value) {
    setItems((x) => x.map((c) => (c.id === id ? { ...c, [key]: value } : c)));
  }

  async function save(cat) {
    try {
      await adminApi.patch(`categories/${cat.id}`, {
        name: cat.name, about: cat.about, image: cat.image, active: cat.active,
      });
      alert("Saved.");
    } catch (e) { alert(e.message); }
  }

  async function remove(cat) {
    if (!confirm(`Delete category "${cat.name}"?`)) return;
    try {
      await adminApi.del(`categories/${cat.id}`);
      setItems((x) => x.filter((c) => c.id !== cat.id));
    } catch (e) { alert(e.message); }
  }

  return (
    <div>
      <h1 className="dashH1">Categories</h1>

      <form className="dashInlineForm" onSubmit={create}>
        <input placeholder="Name" value={creating.name} onChange={(e) => setCreating({ ...creating, name: e.target.value })} required />
        <input placeholder="About" value={creating.about} onChange={(e) => setCreating({ ...creating, about: e.target.value })} />
        <input placeholder="Image URL" value={creating.image} onChange={(e) => setCreating({ ...creating, image: e.target.value })} required />
        <label className="dashCheck">
          <input type="checkbox" checked={creating.active} onChange={(e) => setCreating({ ...creating, active: e.target.checked })} /> Active
        </label>
        <button className="btn btn-primary" disabled={busy}>{busy ? "Adding…" : "+ Add"}</button>
      </form>

      {error && <p className="dashError">{error}</p>}

      {items === null ? (
        <p className="dashMuted">Loading…</p>
      ) : items.length === 0 ? (
        <p className="dashMuted">No categories yet.</p>
      ) : (
        <div className="dashTableWrap">
          <table className="dashTable">
            <thead>
              <tr><th>Name</th><th>About</th><th>Image URL</th><th>Active</th><th></th></tr>
            </thead>
            <tbody>
              {items.map((c) => (
                <tr key={c.id}>
                  <td><input value={c.name} onChange={(e) => setField(c.id, "name", e.target.value)} /></td>
                  <td><input value={c.about || ""} onChange={(e) => setField(c.id, "about", e.target.value)} /></td>
                  <td><input value={c.image || ""} onChange={(e) => setField(c.id, "image", e.target.value)} /></td>
                  <td style={{ textAlign: "center" }}>
                    <input type="checkbox" checked={!!c.active} onChange={(e) => setField(c.id, "active", e.target.checked)} />
                  </td>
                  <td className="dashRowActions">
                    <button className="dashLink" onClick={() => save(c)}>Save</button>
                    <button className="dashDanger" onClick={() => remove(c)}>Delete</button>
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
