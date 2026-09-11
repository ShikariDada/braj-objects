"use client";

import { useEffect, useRef } from "react";

/** Reports scroll progress 0→1 of a tall story wrapper into a ref. */
export function useStoryProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const progress = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const done = Math.min(Math.max(-rect.top / Math.max(total, 1), 0), 1);
      progress.current = done;
      el.style.setProperty("--story", done.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return { ref, progress };
}
