"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { adminApi, asList } from "../../adminClient";
import { formatPrice } from "@/app/lib/format";

export default function OrdersPage() {
  const [orders, setOrders] = useState(null);
  const [statuses, setStatuses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const [o, s] = await Promise.all([
          adminApi.get("orders"),
          adminApi.get("order-statuses"),
        ]);
        setOrders(asList(o));
        setStatuses(asList(s));
      } catch (e) { setError(e.message); }
    })();
  }, []);

  async function updateStatus(order, statusId) {
    try {
      const updated = await adminApi.patch(`orders/${order.id}`, { status: Number(statusId) });
      setOrders((list) => list.map((o) => (o.id === order.id ? updated : o)));
    } catch (e) { alert(e.message); }
  }

  return (
    <div>
      <h1 className="dashH1">Orders</h1>
      {error && <p className="dashError">{error}</p>}
      {orders === null ? (
        <p className="dashMuted">Loading…</p>
      ) : orders.length === 0 ? (
        <p className="dashMuted">No orders yet.</p>
      ) : (
        <div className="dashTableWrap">
          <table className="dashTable">
            <thead>
              <tr><th>Order</th><th>Customer</th><th>Date</th><th>Total</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>{o.order_number}</td>
                  <td>{o.customer_name}</td>
                  <td>{new Date(o.created_at).toLocaleDateString()}</td>
                  <td>{formatPrice(o.grand_total)}</td>
                  <td>
                    <select value={o.status || ""} onChange={(e) => updateStatus(o, e.target.value)}>
                      {statuses.map((s) => (
                        <option key={s.id} value={s.id}>{s.status}</option>
                      ))}
                    </select>
                  </td>
                  <td className="dashRowActions">
                    <Link href={`/dashboard/orders/${o.id}`} className="dashLink">View</Link>
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
