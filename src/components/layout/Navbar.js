"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectCount } from "@/store/cartSlice";
import { site } from "@/app/lib/site";
import "./navbar.css";

export default function Navbar() {
  const [openMobile, setOpenMobile] = useState(false);
  const [q, setQ] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const count = useSelector(selectCount);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpenMobile(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setOpenMobile(false);
  }, [pathname]);

  function submitSearch(e) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    setQ("");
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  // "/" matches only itself; every other entry also matches its sub-routes.
  function isActive(href) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <header className="header">
      <div className="container navbar">
        <button
          className="menuBtn"
          onClick={() => setOpenMobile((v) => !v)}
          aria-label="Menu"
          aria-expanded={openMobile}
        >
          <BurgerIcon />
        </button>

        <Link href="/" className="brand" aria-label={`${site.name} — home`}>
          <Image src="/brand/fath-logo.png" alt={site.name} width={190} height={125} priority />
        </Link>

        <nav className="nav" aria-label="Primary">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "isActive" : undefined}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="navActions">
          <form onSubmit={submitSearch} className="searchForm" role="search">
            <input
              type="search"
              placeholder="Search..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="searchInput"
              aria-label="Search products"
            />
            <button type="submit" className="searchBtn" aria-label="Search">
              <SearchIcon />
            </button>
          </form>

          <Link href="/cart" className="cartBtn" aria-label={`Cart, ${count} items`}>
            <CartIcon />
            <span className="cartCount">{count}</span>
          </Link>

          <a
            className="btn btn-primary contactBtn"
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon />
            Contact Us
          </a>
        </div>
      </div>

      {openMobile && (
        <div className="mobileNav">
          <div className="container mobileNavInner">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(item.href) ? "isActive" : undefined}
              >
                {item.label}
              </Link>
            ))}

            <form onSubmit={submitSearch} className="mobileSearch" role="search">
              <input
                type="search"
                placeholder="Search..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                aria-label="Search products"
              />
              <button type="submit" aria-label="Search">
                <SearchIcon />
              </button>
            </form>

            <a
              className="btn btn-primary btn-block"
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              Contact Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ===== Icons ===== */

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21 20.3l-4.6-4.6a7.5 7.5 0 10-1.3 1.3L19.7 21 21 20.3zM10.5 17a6.5 6.5 0 110-13 6.5 6.5 0 010 13z"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7 18a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4zM6.2 6h14.6a1 1 0 01.98 1.2l-1.5 7A1 1 0 0119.3 15H8.1a1 1 0 01-.98-.8L5.2 4.8A1 1 0 004.22 4H2.5a1 1 0 110-2h1.72a3 3 0 012.94 2.4L7.4 6z"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.18-1.36a9.9 9.9 0 004.86 1.24h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.04-5.16-2.92-7.04A9.9 9.9 0 0012.04 2zm5.83 14.2c-.25.7-1.44 1.33-1.99 1.38-.53.05-1 .24-3.37-.7-2.84-1.12-4.64-3.99-4.78-4.18-.14-.19-1.14-1.51-1.14-2.89s.72-2.05.98-2.33c.25-.28.55-.35.74-.35.18 0 .37 0 .53.01.17.01.4-.06.63.48.23.56.79 1.94.86 2.08.07.14.12.3.02.49-.1.19-.15.3-.29.47-.14.16-.3.36-.43.49-.14.14-.29.29-.12.57.16.28.73 1.2 1.56 1.95 1.07.95 1.98 1.25 2.26 1.39.28.14.44.12.6-.07.17-.19.7-.81.88-1.09.19-.28.37-.23.62-.14.25.09 1.63.77 1.9.91.28.14.46.21.53.32.07.12.07.65-.18 1.35z"
      />
    </svg>
  );
}

function BurgerIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path fill="currentColor" d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
    </svg>
  );
}
