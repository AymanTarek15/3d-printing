import Image from "next/image";
import Link from "next/link";
import { site } from "@/app/lib/site";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="ft">
      <div className="container ftInner">
        <div className="ftTop">
          {/* Brand + socials */}
          <div className="ftBrand">
            <Image
              src="/brand/fath-logo-light.png"
              alt={site.name}
              width={210}
              height={139}
              className="ftLogo"
            />
            <div className="ftSocials">
              <a href={site.social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z" /></svg>
              </a>
              <a href={site.social.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24"><path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.02H7.9v-2.91h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.62.77-1.62 1.56v1.87h2.76l-.44 2.91h-2.32V22c4.78-.75 8.44-4.91 8.44-9.93z" /></svg>
              </a>
              <a href={site.social.youtube} aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.3 3.5 12 3.5 12 3.5s-7.3 0-9.4.6A3 3 0 0 0 .5 6.2 31.7 31.7 0 0 0 0 12a31.7 31.7 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c2.1.6 9.4.6 9.4.6s7.3 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.7 31.7 0 0 0 24 12a31.7 31.7 0 0 0-.5-5.8zM9.6 15.5V8.5L15.8 12l-6.2 3.5z" /></svg>
              </a>
              <a href={site.social.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.76-1.95 4.02 0 4.76 2.5 4.76 5.77V21h-4v-5.6c0-1.34-.03-3.07-1.9-3.07-1.9 0-2.19 1.46-2.19 2.97V21h-4V9z" /></svg>
              </a>
              <a href={site.social.tiktok} aria-label="TikTok" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24"><path d="M16.5 2h-3v13.2a2.7 2.7 0 1 1-2.2-2.65V9.4a6 6 0 1 0 5.2 5.94V9.1a7 7 0 0 0 4 1.27V7.3a4 4 0 0 1-4-4V2z" /></svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {site.footer.map((col) => (
            <div className="ftCol" key={col.title}>
              <div className="ftHead">{col.title}</div>
              {col.links.map((l) => (
                <Link className="ftLink" href={l.href} key={l.label}>
                  {l.label}
                </Link>
              ))}
              {col.more && (
                <Link className="link-gold ftMore" href={col.more.href}>
                  {col.more.label} <span className="arw">→</span>
                </Link>
              )}
            </div>
          ))}

          {/* Contact */}
          <div className="ftCol">
            <div className="ftHead">Get in Touch</div>
            <a className="ftContact" href={`mailto:${site.email}`}>
              <svg viewBox="0 0 24 24"><path d="M3 5h18a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1zm9 7.3L20 7H4l8 5.3z" /></svg>
              {site.email}
            </a>
            <a className="ftContact" href={`tel:${site.phone.replace(/\s/g, "")}`}>
              <svg viewBox="0 0 24 24"><path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.24 11.4 11.4 0 003.6.58 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.6a1 1 0 01-.25 1l-2.2 2.2z" /></svg>
              {site.phone}
            </a>
            <span className="ftContact">
              <svg viewBox="0 0 24 24"><path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" /></svg>
              {site.location}
            </span>
          </div>
        </div>

        <div className="ftDivider" />

        <div className="ftBottom">
          <p className="ftCopy">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>

          <nav className="ftLegal" aria-label="Legal">
            {site.legal.map((l, i) => (
              <span key={l.label}>
                {i > 0 && <i aria-hidden="true">|</i>}
                <Link href={l.href}>{l.label}</Link>
              </span>
            ))}
          </nav>

          <span className="ftMade">
            Made in Egypt
            <svg viewBox="0 0 24 16" aria-hidden="true" className="ftFlag">
              <rect width="24" height="5.33" y="0" fill="#ce1126" />
              <rect width="24" height="5.33" y="5.33" fill="#fff" />
              <rect width="24" height="5.34" y="10.66" fill="#000" />
            </svg>
          </span>
        </div>
      </div>
    </footer>
  );
}
