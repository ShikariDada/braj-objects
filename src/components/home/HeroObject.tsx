"use client";

import { HeroCanvas } from "@/components/three/HeroCanvas";
import { ButtonLink } from "@/components/ui/Button";
import { useStoryProgress } from "@/components/motion/useStoryProgress";
import { site } from "@/content/site";
import { getProduct } from "@/content/products";
import styles from "./HeroObject.module.css";

export function HeroObject() {
  const hero = getProduct("krishna-janmabhoomi")!;
  // Scroll-linked reveal: --story runs 0→1 as the hero scrolls out and
  // drives the stage zoom + hint fade in CSS. Ref-only — no React state.
  const { ref } = useStoryProgress<HTMLElement>();
  return (
    <section ref={ref} className={styles.hero} aria-labelledby="hero-title">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.meta}>
          <p className="t-micro">Braj Object {hero.objectNumber}</p>
          <p className="t-micro">{hero.place}</p>
        </div>
        <div className={styles.stage} role="img" aria-label={`${hero.name} — collectible magnet, arch study in sandstone red`}>
          <HeroCanvas product={hero} />
        </div>
        <div className={styles.copy}>
          <h1 id="hero-title" className="t-h1">
            {site.heroTitle}
          </h1>
          <p className="t-lede">{site.heroStandfirst}</p>
          <div className={styles.cta}>
            <ButtonLink href="/collection">{site.heroCta}</ButtonLink>
          </div>
          <p className={`t-micro t-nums ${styles.spec}`}>
            70 mm square face · Numbered archive of eight
          </p>
        </div>
      </div>
      <p className={styles.scroll} aria-hidden="true">
        Scroll — the object, closer
      </p>
    </section>
  );
}
