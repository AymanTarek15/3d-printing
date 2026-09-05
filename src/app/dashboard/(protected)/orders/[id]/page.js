"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { adminApi } from "../../../adminClient";
import { formatPrice } from "@/app/lib/format";

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try { setOrder(await adminApi.get(`orders/${id}`)); }
      catch (e) { setError(e.message); }
    })();
  }, [id]);

  if (error) return <p className="dashError">{error}</p>;
  if (!order) return <p className="dashMuted">Loading…</p>;

  return (
    <div>
      <Link href="/dashboard/orders" className="dashLink">← Back to orders</Link>
      <h1 className="dashH1">{order.order_number}</h1>

      <div className="dashDetailGrid">
        <div><span className="dashMuted">Customer</span><div>{order.customer_name}</div></div>
        <div><span className="dashMuted">Email</span><div>{order.customer_email}</div></div>
        <div><span className="dashMuted">Status</span><div>{order.status_label}</div></div>
        <div><span className="dashMuted">Placed</span><div>{new Date(order.created_at).toLocaleString()}</div></div>
        <div className="dashFull"><span className="dashMuted">Shipping address</span><div>{order.shipping_address || "—"}</div></div>
        {order.customer_description && (
          <div className="dashFull"><span className="dashMuted">Notes</span><div>{order.customer_description}</div></div>
        )}
      </div>

      <h2 className="dashH2">Items</h2>
      <div className="dashTableWrap">
        <table className="dashTable">
          <thead>
            <tr><th>Product</th><th>Color</th><th>Personalization</th><th>Qty</th><th>Unit</th><th>Line</th></tr>
          </thead>
          <tbody>
            {(order.items || []).map((it) => (
              <tr key={it.id}>
                <td>{it.product}</td>
                <td>{it.color || "—"}</td>
                <td>
                  {it.personalization_option !== "none"
                    ? [it.personalization_name_en, it.personalization_name_ar].filter(Boolean).join(" / ") || it.personalization_option
                    : "—"}
                </td>
                <td>{it.quantity}</td>
                <td>{formatPrice(it.unit_price)}</td>
                <td>{formatPrice(it.line_total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dashTotals">
        <div><span>Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
        <div><span>Shipping</span><span>{formatPrice(order.shipping_total)}</span></div>
        <div><span>Tax</span><span>{formatPrice(order.tax_total)}</span></div>
        <div className="dashGrand"><span>Total</span><span>{formatPrice(order.grand_total)}</span></div>
      </div>
    </div>
  );
}
