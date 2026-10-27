"use client";

import { useEffect, useState } from "react";

export type Chapter = { id: string; label: string };

/** Guía lateral: muestra en qué capítulo vas y permite saltar a cualquiera. */
export function ChapterRail({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(chapters[0]?.id);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) setActive(visible[visible.length - 1].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    chapters.forEach((chapter) => {
      const node = document.getElementById(chapter.id);
      if (node) observer.observe(node);
    });
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [chapters]);

  const index = Math.max(0, chapters.findIndex((chapter) => chapter.id === active));

  return (
    <>
      <nav className="rail" aria-label="Capítulos">
        {chapters.map((chapter, i) => (
          <a key={chapter.id} href={`#${chapter.id}`} className={chapter.id === active ? "active" : ""} aria-current={chapter.id === active}>
            <span>{chapter.label}</span>
            <i>{String(i + 1).padStart(2, "0")}</i>
          </a>
        ))}
      </nav>
      <div className="rail-counter" aria-hidden="true">
        <b>{String(index + 1).padStart(2, "0")}</b> / {String(chapters.length).padStart(2, "0")}
        <span>{chapters[index]?.label}</span>
      </div>
      <div className="rail-progress" aria-hidden="true">
        <i style={{ transform: `scaleX(${progress})` }} />
      </div>
    </>
  );
}
