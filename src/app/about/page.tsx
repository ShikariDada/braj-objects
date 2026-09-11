import type { Metadata } from "next";
import { LinkArrow } from "@/components/ui/LinkArrow";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About Braj",
  description: "Why Braj Objects exists and how subjects are chosen.",
};

export default function AboutPage() {
  return (
    <div className={`wrap ${styles.page}`}>
      <p className="t-micro">From Braj</p>
      <h1 className="t-h1">Souvenirs deserve design attention.</h1>
      <div className={styles.cols}>
        <p className="t-body">
          Most Mathura magnets online are sold as inexpensive trinkets &mdash; plastic,
          MDF or acrylic, photographed as decoration. Braj Objects tries the
          opposite category: a numbered archive of small, well-made collectible
          objects, each tied to a real place you can stand in.
        </p>
        <p className="t-body">
          The first set studies eight subjects: Janmabhoomi&rsquo;s doorway, Vishram
          Ghat&rsquo;s steps, the Dwarkadhish tower, Govardhan&rsquo;s ridge, Kusum
          Sarovar&rsquo;s mirror, and the 84-kos circuit itself — plus two
          devotional studies in the Braj palette. Faces are original
          geometric studies &mdash; architecture, landscape and symbol, never borrowed
          likenesses.
        </p>
      </div>
      <section aria-labelledby="process" className={styles.block}>
        <h2 id="process" className="t-h2">
          How a subject earns its number
        </h2>
        <ol>
          <li>A real place in Braj, named and verifiable.</li>
          <li>An original study drawn for a 70 mm square face.</li>
          <li>Rights review on every name, mark and artwork source.</li>
          <li>Physical sample measured, photographed and matched to the model.</li>
          <li>Only then: price, edition size and sale.</li>
        </ol>
      </section>
      <section aria-labelledby="shipping" id="shipping" className={styles.block}>
        <h2 id="shipping-heading" className="t-h2">
          Shipping & returns
        </h2>
        <p className="t-body" id="returns">
          Coverage, dispatch times and the replacement policy are confirmed with
          the logistics partner. This page carries the exact wording.
        </p>
      </section>
      <section aria-labelledby="contact" id="contact" className={styles.block}>
        <h2 id="contact-heading" className="t-h2">
          Contact
        </h2>
        <p className="t-body">
          Write to the maker about stockists, rights, or corrections to place
          notes. Every factual correction is welcome.
        </p>
      </section>
      <LinkArrow href="/collection">View the collection</LinkArrow>
    </div>
  );
}
