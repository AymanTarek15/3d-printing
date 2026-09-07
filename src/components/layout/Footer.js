import Image from "next/image";
import Link from "next/link";
import './footer.css'

export default function Footer() {
  return (
    <footer className="fp">
      <div className="container">

        {/* TOP: brand + socials on the left, 3 columns on the right */}
        <div className="fpTop">
          <div className="fpBrand">
            <div className="fpLogoRow">
            </div>  
              <Image src="/logo-fat7.png" alt="FAT7" width={140} height={42} />
              <div className="fpSocials">
                <a aria-label="Facebook" href="#"><svg viewBox="0 0 24 24"><path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.02H7.9v-2.91h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.62.77-1.62 1.56v1.87h2.76l-.44 2.91h-2.32V22c4.78-.75 8.44-4.91 8.44-9.93z"/></svg></a>
                <a aria-label="Instagram" href="#"><svg viewBox="0 0 24 24"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z"/></svg></a>
                <a aria-label="X" href="#"><svg viewBox="0 0 24 24"><path d="M3 3h4.7l4.6 6.8L17.7 3H21l-6.9 9.8L21 21h-4.7l-5-7.4L6.3 21H3l7-10L3 3z"/></svg></a>
                <a aria-label="YouTube" href="#"><svg viewBox="0 0 24 24"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.3 3.5 12 3.5 12 3.5s-7.3 0-9.4.6A3 3 0 0 0 .5 6.2 31.7 31.7 0 0 0 0 12a31.7 31.7 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c2.1.6 9.4.6 9.4.6s7.3 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.7 31.7 0 0 0 24 12a31.7 31.7 0 0 0-.5-5.8zM9.6 15.5V8.5L15.8 12l-6.2 3.5z"/></svg></a>
              </div>

            {/* thin horizontal line under brand, like your photo */}
            {/* <div className="fpSubDivider" /> */}
          </div>

          {/* vertical divider between brand and link columns */}
          <div className="fpVsep" />

          <div className="fpCols">
            <div className="fpCol">
              <div className="fpHead">Customer Support</div>
              <Link className="fpLink" href="/contact">Contact Us</Link>
              <Link className="fpLink" href="#help">Help Center</Link>
              <Link className="fpLink" href="#about">About Us</Link>
              <Link className="fpLink" href="#careers">Careers</Link>
            </div>

            <div className="fpCol">
              <div className="fpHead">Shop</div>
              <Link className="fpLink" href="#offers">Offers</Link>
              <Link className="fpLink" href="#collections">Collections</Link>
              <Link className="fpLink" href="#season">Change by Season</Link>
              <Link className="fpLink" href="#b2b">Business Deals</Link>
            </div>

            <div className="fpCol">
              <div className="fpHead">Policy</div>
              <Link className="fpLink" href="#shipping">Shipping & Returns</Link>
              <Link className="fpLink" href="#terms">Terms & Conditions</Link>
              <Link className="fpLink" href="#payments">Payment Methods</Link>
              <Link className="fpLink" href="#faq">FAQ</Link>
            </div>
          </div>
        </div>

        {/* full-width divider */}
        <div className="fpDivider" />

        {/* payments strip (left text + small logos) */}
        <div className="fpPayments">
          <span>We accept the following payment methods:</span>
          <div className="fpPayIcons">
            <span className="payChip payChip--instapay" aria-label="InstaPay">
              <svg className="payGlyph" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="6" fill="#4a2a7a" />
                <path d="M12.6 4.5 L7 13.2 h3.4 L9.6 19.5 L16.5 10 h-3.6 z" fill="#ef6a3d" />
              </svg>
              InstaPay
            </span>
            <span className="payChip payChip--vodafone" aria-label="Vodafone Cash">
              <svg className="payGlyph" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="6" fill="#e60000" />
                <rect x="6" y="5.5" width="8.5" height="13" rx="1.8" fill="#fff" />
                <rect x="8.6" y="16.4" width="3.3" height="0.9" rx="0.45" fill="#e60000" />
                <circle cx="16" cy="9" r="3.6" fill="#fff" stroke="#e60000" strokeWidth="1.1" />
                <circle cx="16" cy="9" r="1.5" fill="#e60000" />
              </svg>
              Vodafone&nbsp;Cash
            </span>
          </div>
        </div>

        <div className="fpDivider" />

        {/* bottom row */}
        <div className="fpBottom">
          <p>© {new Date().getFullYear()} FAT7 3D Printing — All rights reserved.</p>
          {/* <div className="fpBottomLinks">
            <Link href="#privacy">Privacy</Link>
            <Link href="#cookies">Cookies</Link>
            <Link href="#sitemap">Sitemap</Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
