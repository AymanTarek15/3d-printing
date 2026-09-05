import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import "../dashboard.css";

const API_BASE = process.env.DJANGO_API_BASE;

// Real gate: verify the token maps to a staff user server-side.
// (Middleware only checks cookie presence at the edge.)
async function getAdmin() {
  const token = (await cookies()).get("admin_token")?.value;
  if (!token) return null;
  try {
    const res = await fetch(`${API_BASE}/dashboard-api/auth/me/`, {
      headers: { Authorization: `Token ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.is_staff ? data : null;
  } catch {
    return null;
  }
}

const NAV = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/products", label: "Products" },
  { href: "/dashboard/categories", label: "Categories" },
  { href: "/dashboard/orders", label: "Orders" },
  { href: "/dashboard/messages", label: "Messages" },
  // Users is superuser-only (added below).
];

export default async function DashboardLayout({ children }) {
  const admin = await getAdmin();
  if (!admin) redirect("/dashboard/login");

  const nav = admin.is_superuser
    ? [...NAV, { href: "/dashboard/users", label: "Users" }]
    : NAV;

  return (
    <div className="dashShell">
      <aside className="dashSidebar">
        <div className="dashBrand">Fat7 Admin</div>
        <nav className="dashNav">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="dashNavLink">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="dashUser">
          <span className="dashUserName">{admin.username}</span>
          <LogoutButton />
        </div>
      </aside>
      <main className="dashMain">{children}</main>
    </div>
  );
}
