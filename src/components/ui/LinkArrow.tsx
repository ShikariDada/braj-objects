import Link from "next/link";
import styles from "./LinkArrow.module.css";

export function LinkArrow({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={styles.link}>
      <span>{children}</span>
      <span aria-hidden="true" className={styles.arrow}>
        →
      </span>
    </Link>
  );
}
