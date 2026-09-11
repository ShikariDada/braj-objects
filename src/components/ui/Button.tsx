import Link from "next/link";
import styles from "./Button.module.css";

export function ButtonLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={styles.button}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={styles.button} {...rest}>
      {children}
    </button>
  );
}
