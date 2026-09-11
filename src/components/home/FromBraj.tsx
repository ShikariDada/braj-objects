import Image from "next/image";
import { LinkArrow } from "@/components/ui/LinkArrow";
import styles from "./FromBraj.module.css";

export function FromBraj() {
  const dusk = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/assets/brand/braj-dusk.webp`;
  return (
    <section className={styles.braj} aria-labelledby="braj-title">
      <div className={styles.media} role="img" aria-label="Dusk over the Yamuna — evening plate">
        <Image
          src={dusk}
          alt=""
          aria-hidden="true"
          width={1600}
          height={900}
          sizes="100vw"
          loading="lazy"
        />
      </div>
      <div className={`wrap ${styles.copy}`}>
        <p className="t-micro">From Braj</p>
        <h2 id="braj-title" className="t-h2">
          Why these places.
        </h2>
        <div className={styles.cols}>
          <p className="t-body">
            Mathura is one of the oldest continuously inhabited cities in India —
            a sculpture centre under the Kushans, a red-sandstone city on the
            Yamuna, and the anchor of the Braj pilgrim circuit. These magnets
            start from that ground: ghat steps, tower geometry, the long hill,
            the still sarovar.
          </p>
          <p className="t-body">
            Each face is drawn as an original place study, then translated into a
            palm-sized object. Sanjhi paper-cut logic — shapes made from absence,
            precision through repetition — informs the packaging and the archive
            marks, not the product faces themselves.
          </p>
        </div>
        <LinkArrow href="/about">About the place</LinkArrow>
      </div>
    </section>
  );
}
