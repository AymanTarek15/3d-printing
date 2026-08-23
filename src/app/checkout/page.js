"use client";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectItems, selectTotals, clearCart } from "@/store/cartSlice";
import { formatPrice } from "@/app/lib/format";
import './checkout.css'


const API_BASE = process.env.NEXT_PUBLIC_API_BASE
export default function CheckoutPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  console.log(items);
  
  const totals = useSelector(selectTotals);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postal: "",
    payment: "cod",
    note: "",
  });
  const [status, setStatus] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Safely parse JSON bodies (even on 4xx/5xx or empty body)
async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

function flattenErrors(errs, path = "") {
  if (!errs) return [];
  if (Array.isArray(errs)) {
    // either ["..."] or a list of item-errors
    return errs.flatMap((v, i) => flattenErrors(v, `${path}[${i}]`));
  }
  if (typeof errs === "object") {
    return Object.entries(errs).flatMap(([k, v]) =>
      flattenErrors(v, path ? `${path}.${k}` : k)
    );
  }
  // primitive (string)
  return [`${path}: ${String(errs)}`];
}
  async function submitOrder(e) {
  e.preventDefault();
  setStatus(null);

  if (!items.length) {
    setStatus({ type: "error", msg: "Your cart is empty." });
    return;
  }

  const displayName = (form.name || `${form.fname || ""} ${form.lname || ""}`.trim()).trim();

  // ⬅️ Email is REQUIRED by your model; make it required in the form too
  if (!displayName || !form.phone || !form.address || !form.city || !form.email) {
    setStatus({ type: "error", msg: "Please fill all required fields (First, Last, Phone, Address, City, Email)." });
    return;
  }

  const resolveProductId = (it) => {
  // preferred: explicit field we set when adding to cart
  if (it.productId) return Number(it.productId);

  // legacy fallback: first segment of lineKey is the numeric product id
  if (it.lineKey) {
    const first = String(it.lineKey).split("||")[0];
    const n = Number(first);
    if (!Number.isNaN(n) && n > 0) return n;
  }

  // last resort: if old items still kept numeric id
  const n = Number(it.id);
  if (!Number.isNaN(n) && n > 0) return n;

  return null;
};

  const orderItems = items.map((it) => ({
  product_id: resolveProductId(it), 
  personalization_option: it.personalizationOption || "none",      // none | en | ar | both
  personalization_name_en: it.enName || "",
  personalization_name_ar: it.arName || "",
  personalization_font_en: it.enFont || "",   
  personalization_font_ar: it.arFont || "",  
  unit_price: Number((Number(it.price) || 0).toFixed(2)),
  quantity: Number(it.qty) || 1,
  discount: 0,
  tax: 0,
  color: it.selectedColorName || undefined,
  color_option_id: it.selectedColorOptionId || undefined,
}));

  const payload = {
    customer_name: displayName,
    customer_email: form.email.trim(),  // REQUIRED by your model as-is
    shipping_address: `${form.address}${form.postal ? " " + form.postal : ""}${form.city ? ", " + form.city : ""}`,
    customer_description: form.note || "",
    shipping_total: 0,
    items: orderItems,
  };

  try {
    // const res = await fetch(`${API_BASE}/product/shipping/`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json", Accept: "application/json" },
    //   body: JSON.stringify(payload),
    // });
    const res = await fetch("/api/checkout", {
  method: "POST",
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  body: JSON.stringify(payload),
});

    const data = await safeJson(res);

    if (!res.ok) {
      // show the *real* DRF errors
      const lines = flattenErrors(data);
      const msg = lines.length ? lines.join("\n") : `Server error (${res.status})`;
      setStatus({ type: "error", msg });
      console.error("Order failed", { status: res.status, data });
      return;
    }

    setStatus({ type: "success", msg: "Order placed! We’ll contact you shortly." });
    dispatch(clearCart());
  } catch (e) {
    console.error(e);
    setStatus({ type: "error", msg: e.message || "Something went wrong placing your order." });
  }
}



  return (
    <section className="container section">
      <h1 className="h1">Checkout</h1>

      <div className="coGrid">
        {/* Left: form */}
        <form className="card coForm" onSubmit={submitOrder}>
          <h3>Contact & Shipping</h3>

          <div className="coRow">
            <label>First Name *</label>
            <input name="fname" value={form.fname} onChange={onChange} required />
          </div>

          <div className="coRow">
            <label>Last Name *</label>
            <input name="lname" value={form.lname} onChange={onChange} required />
          </div>

          <div className="coRow">
            <label>Phone *</label>
            <input name="phone" value={form.phone} onChange={onChange} required />
          </div>

          <div className="coRow">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={onChange} />
          </div>

          <div className="coRow">
            <label>Address *</label>
            <input name="address" value={form.address} onChange={onChange} required />
          </div>

          <div className="coTwo">
            <div className="coRow">
              <label>City *</label>
              <input name="city" value={form.city} onChange={onChange} required />
            </div>
            <div className="coRow">
              <label>Postal Code</label>
              <input name="postal" value={form.postal} onChange={onChange} />
            </div>
          </div>

          <div className="coRow">
            <label>Order Note</label>
            <textarea placeholder="Please enter the name you want to type fpr your item" name="note" rows="3" value={form.note} onChange={onChange} />
          </div>

          <div className="coRow">
            <label>Payment Method</label>
            <div className="coRadio">
              <label><input type="radio" name="payment" value="cod" checked={form.payment === "cod"} onChange={onChange} /> Cash on Delivery</label>
              <label><input type="radio" name="payment" value="card" checked={form.payment === "card"} onChange={onChange} /> Vodafone casah or Instapay</label>
            </div>
          </div>

          <button className="btn btn-primary" type="submit">Place Order</button>

          {status && (
            <p style={{ marginTop: 10, color: status.type === "error" ? "crimson" : "green" }}>
              {status.msg}
            </p>
          )}
        </form>

        {/* Right: order summary */}
        <aside className="card coSummary">
          <h3>Order Summary</h3>
          <div className="coItems">
            {items.length === 0 ? (
              <p className="muted">No items in cart.</p>
            ) : (
              items.map(it => (
                <div key={it.id} className="coLine">
                  <div className="coTitle">{it.title}</div>
                  <div className="coQty">x{it.qty}</div>
                  <div className="coLinePrice">{formatPrice(it.qty * Number(it.price))}</div>
                </div>
              ))
            )}
          </div>

          <div className="coTotals">
            <div><span>Subtotal</span><strong>{formatPrice(totals.subtotal)}</strong></div>
            <div><span>Tax</span><strong>{formatPrice(totals.tax)}</strong></div>
            <div><span>Shipping</span><strong>{formatPrice(totals.shipping)}</strong></div>
            <div className="coGrand"><span>Total</span><strong>{formatPrice(totals.total)}</strong></div>
          </div>
        </aside>
      </div>
    </section>
  );
}
