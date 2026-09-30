"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import styles from "./Footer.module.css";

const brandLinks = [
  { id: 1, label: "About Us",            href: "/about" },
  { id: 2, label: "Stories",             href: "/stories" },
  { id: 3, label: "Artisans",            href: "/artisans" },
  { id: 4, label: "Boutiques",           href: "/boutiques" },
  { id: 5, label: "Contact Us",          href: "/contact" },
  { id: 6, label: "EU Compliances Docs", href: "/eu-compliances" },
];

const quickLinks = [
  { id: 1, label: "Orders & Shipping",      href: "/orders-shipping" },
  { id: 2, label: "Join/Login as a Seller", href: "/seller" },
  { id: 3, label: "Payment & Pricing",      href: "/payment-pricing" },
  { id: 4, label: "Return & Refunds",       href: "/returns" },
  { id: 5, label: "FAQs",                   href: "/faqs" },
  { id: 6, label: "Privacy Policy",         href: "/privacy-policy" },
  { id: 7, label: "Terms & Conditions",     href: "/terms" },
];

const socialLinks = [
  {
    id: "instagram",
    href: "https://instagram.com",
    label: "Instagram",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    id: "linkedin",
    href: "https://linkedin.com",
    label: "LinkedIn",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
];

const paymentMethods = [
  { id: "gpay",     label: "Google Pay",  src: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" },
  { id: "master",   label: "Mastercard",  src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" },
  { id: "paypal",   label: "PayPal",      src: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" },
  { id: "amex",     label: "Amex",        src: "https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" },
  { id: "applepay", label: "Apple Pay",   src: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" },
  { id: "opay",     label: "OPay",        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQivgiWcDx5y8Bs8jKK5Uxh-9Ph8Ej90IvmZAoU6k7Pw&s=10", isExternal: true },
];

const contactInfo = {
  phone: "+44 221 133 5360",
  email: "customercare@mettamuse.com",
};

const currency = {
  code: "USD",
  note: "Transactions will be completed in Euros and a currency reference is available on hover.",
};

function Accordion({ title, isBrand, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.accordionRow}>
      <div className={styles.accordionHeader} onClick={() => setOpen((v) => !v)}>
        {isBrand
          ? <span className={styles.brandName}>{title}</span>
          : <span className={styles.colTitle}>{title}</span>
        }
        <ChevronDown
          size={18}
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
        />
      </div>
      <div className={`${styles.accordionBody} ${open ? styles.accordionBodyOpen : ""}`}>
        <div className={styles.accordionContent}>{children}</div>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className={styles.footer} aria-label="Site footer">

      
      <div className={styles.topSection}>

       
        <section className={styles.newsletter} aria-labelledby="newsletter-heading">
          <h2 id="newsletter-heading">BE THE FIRST TO KNOW</h2>
          <p>Sign up for updates from mettā muse.</p>
          <form
            className={styles.subscribeForm}
            onSubmit={(e) => e.preventDefault()}
            aria-label="Newsletter subscription"
          >
            <input
              type="email"
              className={styles.subscribeInput}
              placeholder="Enter your e-mail..."
              aria-label="Email address"
              required
            />
            <button type="submit" className={styles.subscribeBtn}>SUBSCRIBE</button>
          </form>
        </section>

       
        <section aria-labelledby="contact-heading" style={{ paddingLeft: "120px" }} className={styles.contactSection}>

        
          <div className={styles.contactDesktop}>
            <h3 id="contact-heading" className={styles.colTitle}>CONTACT US</h3>
            <p><a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a></p>
            <p><a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></p>
          </div>

          <div className={`${styles.mobileOnly} ${styles.mobileCallUs}`}>
            <h3>CALL US</h3>
            <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
            <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
          </div>

        
          <div className={styles.currencyBlock}>
            <h3 className={styles.colTitle}>CURRENCY</h3>
            <div className={styles.currencyRow}>
              <img
                src="https://flagcdn.com/w20/us.png"
                alt="US flag"
                width={20}
                height={14}
                style={{ borderRadius: "2px" }}
              />
              <span>• {currency.code}</span>
            </div>
            <p className={`${styles.currencyNote} ${styles.desktopOnly}`}>{currency.note}</p>
          </div>
        </section>
      </div>

     
      <div className={styles.bottomSection}>

      
        <section aria-labelledby="brand-heading" className={styles.desktopOnly}>
          <p id="brand-heading" className={styles.brandName}>mettā muse</p>
          <ul className={styles.linkList} role="list">
            {brandLinks.map(({ id, label, href }) => (
              <li key={id}><Link href={href}>{label}</Link></li>
            ))}
          </ul>
        </section>

       
        <section aria-labelledby="quicklinks-heading" className={styles.desktopOnly}>
          <h3 id="quicklinks-heading" className={styles.colTitle}>QUICK LINKS</h3>
          <ul className={styles.linkList} role="list">
            {quickLinks.map(({ id, label, href }) => (
              <li key={id}><Link href={href}>{label}</Link></li>
            ))}
          </ul>
        </section>

       
        <section className={styles.desktopOnly}>
          <h3 className={styles.colTitle}>FOLLOW US</h3>
          <div className={styles.socialIcons}>
            {socialLinks.map(({ id, svg, href, label }) => (
              <a key={id} href={href} className={styles.socialIcon} aria-label={label} target="_blank" rel="noopener noreferrer">
                {svg}
              </a>
            ))}
          </div>
          <p className={styles.acceptsTitle}>mettā muse ACCEPTS</p>
          <div className={styles.paymentIcons}>
            {paymentMethods.map(({ id, label, src, isExternal }) => (
              <span key={id} className={styles.paymentBadge} aria-label={label}>
                {isExternal
                  ? <img src={src} alt={label} width={36} height={22} style={{ objectFit: "contain" }} />
                  : <Image src={src} alt={label} width={36} height={22} style={{ objectFit: "contain" }} unoptimized />
                }
              </span>
            ))}
          </div>
        </section>

        
        <div className={styles.mobileOnly} style={{ width: "100%" }}>
          <Accordion title="mettā muse" isBrand>
            <ul className={styles.linkList} role="list">
              {brandLinks.map(({ id, label, href }) => (
                <li key={id}><Link href={href}>{label}</Link></li>
              ))}
            </ul>
          </Accordion>

          <Accordion title="QUICK LINKS">
            <ul className={styles.linkList} role="list">
              {quickLinks.map(({ id, label, href }) => (
                <li key={id}><Link href={href}>{label}</Link></li>
              ))}
            </ul>
          </Accordion>

          <Accordion title="FOLLOW US">
            <div className={styles.socialIcons}>
              {socialLinks.map(({ id, svg, href, label }) => (
                <a key={id} href={href} className={styles.socialIcon} aria-label={label} target="_blank" rel="noopener noreferrer">
                  {svg}
                </a>
              ))}
            </div>
          </Accordion>

          <div className={styles.acceptsRow}>
            <p className={styles.acceptsTitle}>mettā muse ACCEPTS</p>
            <div className={styles.paymentIcons}>
              {paymentMethods.map(({ id, label, src, isExternal }) => (
                <span key={id} className={styles.paymentBadge} aria-label={label}>
                  {isExternal
                    ? <img src={src} alt={label} width={36} height={22} style={{ objectFit: "contain" }} />
                    : <Image src={src} alt={label} width={36} height={22} style={{ objectFit: "contain" }} unoptimized />
                  }
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

     
      <p className={styles.copyright}>
        Copyright © 2026 mettamuse. All rights reserved.
      </p>

    </footer>
  );
}
