"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { adminApi, asList } from "../../adminClient";
import { formatPrice } from "@/app/lib/format";

export default function ProductsPage() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);

  async function load() {
    try {
      setProducts(asList(await adminApi.get("products")));
    } catch (e) {
      setError(e.message);
    }
  }
  useEffect(() => { load(); }, []);

  async function remove(id, title) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await adminApi.del(`products/${id}`);
      setProducts((p) => p.filter((x) => x.id !== id));
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div>
      <div className="dashHeaderRow">
        <h1 className="dashH1">Products</h1>
        <Link href="/dashboard/products/new" className="btn btn-primary">+ New product</Link>
      </div>
      {error && <p className="dashError">{error}</p>}
      {products === null ? (
        <p className="dashMuted">Loading…</p>
      ) : products.length === 0 ? (
        <p className="dashMuted">No products yet.</p>
      ) : (
        <div className="dashTableWrap">
          <table className="dashTable">
            <thead>
              <tr>
                <th>Title</th><th>Price</th><th>Category</th>
                <th>Active</th><th>Best seller</th><th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.title}</td>
                  <td>{formatPrice(p.price)}</td>
                  <td>{p.category_name || "—"}</td>
                  <td>{p.active ? "✓" : "—"}</td>
                  <td>{p.best_selling ? "★" : "—"}</td>
                  <td className="dashRowActions">
                    <Link href={`/dashboard/products/${p.id}`} className="dashLink">Edit</Link>
                    <button className="dashDanger" onClick={() => remove(p.id, p.title)}>Delete</button>
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
