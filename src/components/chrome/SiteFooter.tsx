import Link from "next/link";
import { site } from "@/content/site";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.grid}`}>
        <div>
          <p className={styles.brand}>Braj Objects</p>
          <p className={styles.note}>{site.footer.note}</p>
        </div>
        {site.footer.columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="t-micro">{col.title}</p>
            <ul>
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className={`wrap ${styles.base}`}>
        <p>© {new Date().getFullYear()} Braj Objects.</p>
      </div>
    </footer>
  );
}
