"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { adminApi, asList } from "../adminClient";

export default function DashboardHome() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const [products, categories, orders, messages] = await Promise.all([
          adminApi.get("products"),
          adminApi.get("categories"),
          adminApi.get("orders"),
          adminApi.get("messages"),
        ]);
        const msgs = asList(messages);
        setStats({
          products: asList(products).length,
          categories: asList(categories).length,
          orders: asList(orders).length,
          messages: msgs.length,
          unhandled: msgs.filter((m) => !m.handled).length,
        });
      } catch (e) {
        setError(e.message);
      }
    })();
  }, []);

  const cards = [
    { label: "Products", value: stats?.products, href: "/dashboard/products" },
    { label: "Categories", value: stats?.categories, href: "/dashboard/categories" },
    { label: "Orders", value: stats?.orders, href: "/dashboard/orders" },
    {
      label: "Messages",
      value: stats?.messages,
      href: "/dashboard/messages",
      note: stats?.unhandled ? `${stats.unhandled} unread` : null,
    },
  ];

  return (
    <div>
      <h1 className="dashH1">Overview</h1>
      {error && <p className="dashError">{error}</p>}
      <div className="dashCards">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="dashStatCard">
            <span className="dashStatValue">{c.value ?? "—"}</span>
            <span className="dashStatLabel">{c.label}</span>
            {c.note && <span className="dashStatNote">{c.note}</span>}
          </Link>
        ))}
      </div>

      <div className="dashQuick">
        <Link href="/dashboard/products/new" className="btn btn-primary">+ New product</Link>
        <Link href="/dashboard/categories" className="btn btn-ghost">Manage categories</Link>
      </div>
    </div>
  );
}
