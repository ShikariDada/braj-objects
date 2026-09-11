"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { useCart } from "@/lib/commerce/CartContext";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { count } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open ]);

  return (
    <header className={styles.header}>
      <div className={`wrap ${styles.inner}`}>
        <Link href="/" className={styles.wordmark} aria-label="Braj Objects — home">
          <span className={styles.mark} aria-hidden="true" />
          Braj&nbsp;Objects
        </Link>
        <nav className={styles.desktopNav} aria-label="Primary">
          {site.nav.map((n) => (
            <Link
              key={n.href + n.label}
              href={n.href}
              aria-current={
                pathname === n.href || pathname?.endsWith(n.href) ? "page" : undefined
              }
            >
              {n.label}
              {n.label === "Bag" && count > 0 ? (
                <span className={styles.count} aria-label={`${count} items`}>
                  {count}
                </span>
              ) : null}
            </Link>
          ))}
        </nav>
        <div className={styles.mobileActions}>
          <Link href="/bag" className={styles.bagLink}>
            Bag{count > 0 ? ` (${count})` : ""}
          </Link>
          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {open ? (
        <div className={styles.sheet} id="mobile-menu" role="dialog" aria-label="Menu">
          <nav aria-label="Mobile" onClick={() => setOpen(false)} onKeyDown={(e) => { if (e.key === "Enter" && e.target instanceof HTMLAnchorElement) setOpen(false); }}>
            <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>Object 001 — the hero piece</Link>
            {site.nav.map((n) => (
              <Link key={n.href + n.label} href={n.href} aria-current={pathname === n.href || pathname?.endsWith(n.href) ? "page" : undefined}>
                {n.label}
              </Link>
            ))}
          </nav>
          <p className={styles.sheetNote}>A Braj object archive. First set of eight.</p>
        </div>
      ) : null}
    </header>
  );
}
