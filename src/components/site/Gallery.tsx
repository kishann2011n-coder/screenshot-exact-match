import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { Photo } from "./Photo";
import { GALLERY, GALLERY_CATEGORIES, type GalleryCategory, type GalleryItem } from "@/data/content";
import { photoUrl } from "@/data/images";
import { cn } from "@/lib/utils";

export function Gallery({ limit, filters = true }: { limit?: number; filters?: boolean }) {
  const [cat, setCat] = useState<GalleryCategory | "all">("all");
  const [index, setIndex] = useState<number | null>(null);
  const items = useMemo(() => {
    const list = cat === "all" ? GALLERY : GALLERY.filter((g) => g.category === cat);
    return limit ? list.slice(0, limit) : list;
  }, [cat, limit]);

  return (
    <div>
      {filters && (
        <div role="tablist" aria-label="Gallery categories" className="mb-8 flex flex-wrap gap-2">
          {[{ slug: "all" as const, name: "All" }, ...GALLERY_CATEGORIES].map((c) => (
            <button
              key={c.slug}
              role="tab"
              type="button"
              aria-selected={cat === c.slug}
              onClick={() => setCat(c.slug)}
              className={cn("relative rounded-full border px-4 py-2 text-sm font-semibold transition", cat === c.slug ? "border-foreground text-background" : "hover:border-foreground")}
            >
              {cat === c.slug && <motion.span layoutId="gallery-pill" className="absolute inset-0 rounded-full bg-foreground" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
              <span className="relative">{c.name}</span>
            </button>
          ))}
        </div>
      )}
      <motion.ul layout className="columns-2 gap-3 sm:gap-4 lg:columns-3 xl:columns-4">
        <AnimatePresence mode="popLayout">
          {items.map((g, i) => (
            <motion.li
              layout
              key={g.photo.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mb-3 break-inside-avoid sm:mb-4"
            >
              <button type="button" data-cursor="View" onClick={() => setIndex(i)} className="group relative block w-full overflow-hidden rounded-2xl bg-muted" aria-label={`Open ${g.title}`}>
                <div className={g.tall ? "aspect-[3/4]" : "aspect-[4/3]"}>
                  <Photo photo={g.photo} width={700} sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, 50vw" className="img-zoom group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 bg-ink-fade opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-end justify-between p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-left">
                    <span className="eyebrow block text-gold">{GALLERY_CATEGORIES.find((c) => c.slug === g.category)?.name}</span>
                    <span className="font-display text-lg text-ink-foreground">{g.title}</span>
                  </span>
                  <Expand className="h-5 w-5 text-ink-foreground" />
                </div>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      <Lightbox items={items} index={index} setIndex={setIndex} />
    </div>
  );
}

function Lightbox({ items, index, setIndex }: { items: GalleryItem[]; index: number | null; setIndex: (i: number | null) => void }) {
  const go = useCallback((d: number) => index !== null && setIndex((index + d + items.length) % items.length), [index, items.length, setIndex]);
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, go, setIndex]);

  const item = index !== null ? items[index] : null;
  return (
    <AnimatePresence>
      {item && (
        <motion.div role="dialog" aria-modal="true" aria-label={item.title} className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/95 backdrop-blur" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIndex(null)}>
          <AnimatePresence mode="wait">
            <motion.figure
              key={item.photo.id}
              className="relative max-h-[86svh] max-w-[92vw]"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1);
                else if (info.offset.x > 60) go(-1);
              }}
            >
              <img src={photoUrl(item.photo, 1800)} alt={item.photo.alt} className="max-h-[80svh] w-auto rounded-xl object-contain" />
              <figcaption className="mt-4 flex items-center justify-between gap-4 text-sm text-ink-foreground/80">
                <span className="font-display text-lg text-ink-foreground">{item.title}</span>
                <span>{(index ?? 0) + 1} / {items.length}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
          <button type="button" aria-label="Close" onClick={() => setIndex(null)} className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full border border-ink-border text-ink-foreground hover:bg-ink-soft"><X /></button>
          <button type="button" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); go(-1); }} className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-ink-border text-ink-foreground hover:bg-ink-soft sm:grid"><ChevronLeft /></button>
          <button type="button" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); go(1); }} className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-ink-border text-ink-foreground hover:bg-ink-soft sm:grid"><ChevronRight /></button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
