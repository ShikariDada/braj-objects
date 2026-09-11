import Link from "next/link";

export const metadata = {
  title: "Page not found",
  description: "This page could not be found in the Braj Objects archive.",
};

export default function NotFound() {
  return (
    <div className="wrap" style={{ paddingTop: 72, paddingBottom: 96, display: "grid", gap: 16, maxWidth: 640 }}>
      <p className="t-micro">Braj Objects · Archive</p>
      <h1 className="t-h1">This page is not in the archive.</h1>
      <p className="t-lede">
        The object or page you asked for does not exist. The archive holds eight objects — start with the first.
      </p>
      <p>
        <Link href="/collection">View the collection</Link>
      </p>
    </div>
  );
}
