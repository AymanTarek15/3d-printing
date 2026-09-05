"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi, asList } from "../../adminClient";

const BOOL_FIELDS = [
  ["active", "Active (visible in shop)"],
  ["best_selling", "Best seller"],
  ["on_sale", "On sale"],
  ["wishlist", "Featured in wishlist"],
];

const PERSONALIZATION = [
  ["english_name_entry_only", "English name entry"],
  ["arabic_name_entry_only", "Arabic name entry"],
  ["both_name_entry", "Both languages"],
];

const FONTS = [
  ["naskh_hadith_font", "Naskh Hadith"],
  ["babeloo_font", "Babeloo"],
  ["creamy_font", "Super Creamy"],
  ["goudy_font", "Goudy Old Style"],
];

const empty = {
  title: "", description: "", price: "", image_url: "", note: "", category: "",
  active: true, best_selling: false, on_sale: false, wishlist: false,
  single_language_price: 0, two_language_price: 0,
  english_name_entry_only: false, arabic_name_entry_only: false, both_name_entry: false,
  naskh_hadith_font: false, babeloo_font: false, creamy_font: false, goudy_font: false,
};

export default function ProductForm({ product }) {
  const router = useRouter();
  const isEdit = !!product;
  const [form, setForm] = useState(() => ({ ...empty, ...(product || {}) }));
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setCategories(asList(await adminApi.get("categories")));
      } catch (e) {
        setError(e.message);
      }
    })();
  }, []);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const payload = {
      ...form,
      price: Number(form.price) || 0,
      single_language_price: Number(form.single_language_price) || 0,
      two_language_price: Number(form.two_language_price) || 0,
      category: Number(form.category),
    };
    try {
      if (isEdit) await adminApi.patch(`products/${product.id}`, payload);
      else await adminApi.post("products", payload);
      router.push("/dashboard/products");
      router.refresh();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="dashForm" onSubmit={onSubmit}>
      <div className="dashFormGrid">
        <label className="dashField dashFull">
          <span>Title</span>
          <input value={form.title} onChange={(e) => set("title", e.target.value)} required />
        </label>

        <label className="dashField dashFull">
          <span>Description</span>
          <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} required />
        </label>

        <label className="dashField">
          <span>Price (EGP)</span>
          <input type="number" step="0.01" value={form.price} onChange={(e) => set("price", e.target.value)} required />
        </label>

        <label className="dashField">
          <span>Category</span>
          <select value={form.category || ""} onChange={(e) => set("category", e.target.value)} required>
            <option value="" disabled>Choose…</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </label>

        <label className="dashField dashFull">
          <span>Image URL</span>
          <input value={form.image_url} onChange={(e) => set("image_url", e.target.value)} placeholder="https://…" required />
        </label>

        <label className="dashField dashFull">
          <span>Note (optional)</span>
          <input value={form.note || ""} onChange={(e) => set("note", e.target.value)} />
        </label>
      </div>

      <fieldset className="dashFieldset">
        <legend>Visibility</legend>
        <div className="dashChecks">
          {BOOL_FIELDS.map(([k, label]) => (
            <label key={k} className="dashCheck">
              <input type="checkbox" checked={!!form[k]} onChange={(e) => set(k, e.target.checked)} />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="dashFieldset">
        <legend>Personalization</legend>
        <div className="dashChecks">
          {PERSONALIZATION.map(([k, label]) => (
            <label key={k} className="dashCheck">
              <input type="checkbox" checked={!!form[k]} onChange={(e) => set(k, e.target.checked)} />
              {label}
            </label>
          ))}
        </div>
        <div className="dashFormGrid">
          <label className="dashField">
            <span>Single-language price</span>
            <input type="number" step="0.01" value={form.single_language_price} onChange={(e) => set("single_language_price", e.target.value)} />
          </label>
          <label className="dashField">
            <span>Two-language price</span>
            <input type="number" step="0.01" value={form.two_language_price} onChange={(e) => set("two_language_price", e.target.value)} />
          </label>
        </div>
        <div className="dashChecks">
          {FONTS.map(([k, label]) => (
            <label key={k} className="dashCheck">
              <input type="checkbox" checked={!!form[k]} onChange={(e) => set(k, e.target.checked)} />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      {error && <p className="dashError">{error}</p>}

      <div className="dashFormActions">
        <button className="btn btn-primary" disabled={saving}>
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create product"}
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => router.push("/dashboard/products")}>
          Cancel
        </button>
      </div>
    </form>
  );
}
