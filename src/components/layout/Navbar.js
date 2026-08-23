"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faHeart,
  faMagnifyingGlass,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons"; // Import specific icons
import { useSelector } from "react-redux";
import { selectCount } from "@/store/cartSlice";
import "./navbar.css";


export default function Navbar({categories, season}) {
  const [openMobile, setOpenMobile] = useState(false);
  const [openMenu, setOpenMenu] = useState(false); // dropdown
  const [searchOpen, setSearchOpen] = useState(false); // expanding search
  const [q, setQ] = useState("");
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const router = useRouter();

  
 const count = useSelector(selectCount);




  useEffect(() => {
    function onDoc(e) {
      // if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpenMenu(false);
      if (searchRef.current && !searchRef.current.contains(e.target))
        setSearchOpen(false);
    }
    function onKey(e) {
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDoc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  function submitSearch(e) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    setSearchOpen(false);
    setQ("");
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  // console.log(categories);
  

  return (
    <header className="header">
      <div className="container navbar">
        <div style={{display:'flex'}}>
        <button
          className="menuBtn"
          onClick={() => setOpenMobile((v) => !v)}
          aria-label="Menu"
        >
          ☰
        </button>
        <Link href="/" className="brand">
          <Image
            src="/logo-fat7.png"
            alt="FAT7 3D Printing"
            width={120}
            height={36}
            priority
          />
        </Link>
</div>
        {/* Desktop nav */}
          <div className="nav-small-size"></div>
        <nav className="nav">
          <Link href="/">Home</Link>
          {/* drop down menu */}
          <div
            className={`navItem hasMenu ${openMenu ? "isOpen" : ""}`}
            // ref={dropdownRef}
          >
            
            <button
              className="menuTrigger"
              aria-haspopup="true"
              aria-expanded={openMenu}
              onMouseOver={() => setOpenMenu((v) => !v)}
            >
              Collections <Chev open={openMenu} />
            </button>
            <div
              className="dropdownMenu"
              onMouseLeave={() => setOpenMenu((v) => !v)}
            >
              {categories.length > 0 ? (
              categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug || cat.name}`}
                  className="dropLink"
                >
                  {cat.name || cat.title}
                </Link>
              ))
            ) :(<>
              <Link href="/category/keychains" className="dropLink">
                Keychains
              </Link>
              <Link href="/category/figurines" className="dropLink">
                Figurines & Busts
              </Link>
              <Link href="/category/tools" className="dropLink">
                Tools & Gadgets
              </Link>
              <Link href="/category/home-decor" className="dropLink">
                Home Décor
              </Link>
              <Link href="/category/seasonal" className="dropLink">
                Seasonal
              </Link>
              </>
            )}
            </div>
          </div>

          <Link id="events" href={`/category/${season.name}/`}>{season.name}</Link>
          <Link href="/services">Services</Link>
          <Link href="/business-deals">Business Deals</Link>

          {/* <Link href="#cta" className="btn btn-primary">Get Started</Link> */}
        </nav>

        
        <div className="cart-container">
          {/* Expanding search */}
          <div
            className={`searchWrap ${searchOpen ? "active" : ""}`}
            ref={searchRef}
          >
            <form onSubmit={submitSearch} className="searchForm bigscreen-search" role="search">
              <input
                type="search"
                placeholder="Search models…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                className="searchInput"
                aria-label="Search"
                ref={searchRef}
              />
              <button
                type={searchOpen ? "submit" : "button"}
                className="searchBtn"
                aria-label="Search"
                onClick={() => {
                  setSearchOpen((v) => (v ? v : true))
                  inputRef.current?.focus();
                }}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
              </button>
            </form>
          </div>
          <Link href={'/wishlist'}>
          <FontAwesomeIcon
            icon={faHeart}
            size="lg"
            style={{ color: "#ffffff" }}
            />
            </Link>
          <p id="nav-cart-items">{count}</p>
          <Link id="nav-cart" href={"/cart"}>
            <FontAwesomeIcon
              icon={faCartShopping}
              size="lg"
              style={{ color: "#ffffff" }}
            />
          </Link>
        
        </div>

        {/* Mobile burger */}
      </div>

      {/* Mobile drawer */}
      {openMobile && (
        <div className="mobileNav">
          <div className="container mobileNavInner">
            <details>
              <summary className="mobileDrop">Collections <Chev open={openMenu} /></summary>
              <ul className="mobileDropMenu">
                <li>
                  <Link
                  href="/category/keychains"
                  onClick={() => setOpenMobile(false)}
                  >
                  Keychains
                </Link>
                </li>
                <li>

                <Link
                  href="/category/figurines"
                  onClick={() => setOpenMobile(false)}
                  >
                  Figurines & Busts
                </Link>
                  </li>
                  <li>
                  
                <Link
                  href="/category/tools"
                  onClick={() => setOpenMobile(false)}
                  >
                  Tools & Gadgets
                </Link>
                    </li>
                    <li>

                <Link
                  href="/category/home-decor"
                  onClick={() => setOpenMobile(false)}
                  >
                  Home Décor
                </Link>
                  </li>
                  <li>

                <Link
                
                href="/category/seasonal"
                onClick={() => setOpenMobile(false)}
                >
                  Seasonal
                </Link>
                  </li>
              </ul>
            </details>

            <Link href="#change-by-season" onClick={() => setOpenMobile(false)}>
              {season.name}
            </Link>
            <Link href="/services" onClick={() => setOpenMobile(false)}>
              Services
            </Link>
            <Link href="/business-deals" onClick={() => setOpenMobile(false)}>
              Business Deals
            </Link>

            {/* Mobile search (full width) */}
            {/* <form
              onSubmit={(e) => {
                e.preventDefault();
                router.push(`/search?q=${encodeURIComponent(q)}`);
                setOpenMobile(false);
              }}
              className="mobileSearch"
            >
              <input
                type="search"
                placeholder="Search models…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              <button type="submit">{searchIcon()}</button>
            </form> */}


            <form onSubmit={submitSearch} className="searchForm" role="search">
              <input
                type="search"
                placeholder="Search models…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                // onFocus={() => setSearchOpen(true)}
                className="searchInput"
                aria-label="Search"
                // ref={searchRef}
              />
              {/* <button
                type={searchOpen ? "submit" : "button"}
                className="searchBtn"
                aria-label="Search"
                onClick={() => {
                  setSearchOpen((v) => (v ? v : true))
                  inputRef.current?.focus();
                }}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
              </button> */}
            </form>
          
          </div>
        </div>
        
      )}
    </header>
  );
}

/* icons */
function searchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21 20.3l-4.6-4.6a7.5 7.5 0 10-1.3 1.3L19.7 21 21 20.3zM10.5 17a6.5 6.5 0 110-13 6.5 6.5 0 010 13z"
      />
    </svg>
  );
}
function Chev({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      aria-hidden="true"
      style={{
        marginLeft: 6,
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.2s ease",
      }}
    >
      <path fill="currentColor" d="M7 10l5 5 5-5z" />
    </svg>
  );
}
