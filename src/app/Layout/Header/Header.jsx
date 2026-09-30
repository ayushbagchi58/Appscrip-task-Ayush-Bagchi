"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, Heart, ShoppingBag, User, ChevronDown, Menu } from "lucide-react";
import styles from "./Header.module.css";

const navItems = [
  { id: 1, label: "SHOP",       href: "/" },
  { id: 2, label: "SKILLS",     href: "/skills" },
  { id: 3, label: "STORIES",    href: "/stories" },
  { id: 4, label: "ABOUT",      href: "/about" },
  { id: 5, label: "CONTACT US", href: "/contact" },
];

const iconButtons = [
  { id: "search",  Icon: Search,      ariaLabel: "Search" },
  { id: "wishlist", Icon: Heart,       ariaLabel: "Wishlist" },
  { id: "bag",     Icon: ShoppingBag, ariaLabel: "Shopping bag" },
];

export default function Header() {
  return (
    <header className={styles.header}>
    
      <div className={styles.topBar}>
        
        <div className={styles.left}>
         
          <button className={styles.hamburger} aria-label="Open menu">
            <Menu size={22} />
          </button>

        
          <span className={styles.logoIcon} aria-label="Brand icon">
            <Image
              src="/Logos/HeaderLogo.png"
              alt="Brand logo icon"
              width={32}
              height={32}
              priority
            />
          </span>
        </div>

       
        <div className={styles.center}>
          <Link href="/" className={styles.logoLink} aria-label="LOGO — Home">
            <span className={styles.logoText}>LOGO</span>
          </Link>
        </div>

        
        <div className={styles.right}>
          {iconButtons.map(({ id, Icon, ariaLabel }) => (
            <button
              key={id}
              className={styles.iconBtn}
              aria-label={ariaLabel}
            >
              <Icon size={20} strokeWidth={1.5} />
            </button>
          ))}

          
          <button className={`${styles.iconBtn} ${styles.profileBtn}`} aria-label="Profile">
            <User size={20} strokeWidth={1.5} />
          </button>

          
          <button className={styles.langSelector} aria-label="Select language">
            ENG <ChevronDown size={14} strokeWidth={2} />
          </button>
        </div>
      </div>

     
      <div className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/" className={styles.breadcrumbHome}>HOME</Link>
        <span className={styles.breadcrumbSep}>|</span>
        <Link href="/" className={styles.breadcrumbCurrent}>SHOP</Link>
      </div>

     
      <nav className={styles.navBar} aria-label="Main navigation">
        {navItems.map(({ id, label, href }) => (
          <Link key={id} href={href} className={styles.navItem}>
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
