import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Instagram, MessageCircle, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/content";
import { SITE } from "@/data/site";
import { waLink } from "@/lib/whatsapp";

export function Testimonials() {
  const [i, setI] = useState(0);
  if (TESTIMONIALS.length === 0) {
    return (
      <div className="grid gap-6 rounded-[2rem] border border-ink-border bg-ink-soft/60 p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <Quote className="h-10 w-10 text-gold" />
          <p className="mt-6 max-w-2xl font-display text-3xl leading-snug text-ink-foreground sm:text-4xl">
            Client stories will appear here — shared in their own words, with their permission.
          </p>
          <p className="mt-4 max-w-xl text-ink-muted">Celebrated with us? We'd love to hear how it went. Meanwhile, see moments from recent events on our Instagram.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={SITE.instagram.url} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-2 rounded-full border border-ink-border px-5 font-semibold text-ink-foreground hover:border-gold hover:text-gold">
            <Instagram className="h-4 w-4" /> Instagram
          </a>
          <a href={waLink("Hello Gauri Entertainment! I'd like to share feedback about my event.")} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-2 rounded-full bg-whatsapp px-5 font-semibold text-whatsapp-foreground">
            <MessageCircle className="h-4 w-4" /> Share your experience
          </a>
        </div>
      </div>
    );
  }
  const t = TESTIMONIALS[i];
  return (
    <div className="relative rounded-[2rem] border border-ink-border bg-ink-soft/60 p-8 sm:p-14">
      <Quote className="h-10 w-10 text-gold" />
      <AnimatePresence mode="wait">
        <motion.blockquote key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5 }} className="mt-6">
          <p className="font-display text-3xl leading-snug text-ink-foreground sm:text-4xl">“{t.quote}”</p>
          <footer className="mt-6 text-ink-muted"><span className="font-semibold text-ink-foreground">{t.name}</span> · {t.event}{t.date ? ` · ${t.date}` : ""}</footer>
        </motion.blockquote>
      </AnimatePresence>
      {TESTIMONIALS.length > 1 && (
        <div className="mt-8 flex gap-2">
          <button type="button" aria-label="Previous" onClick={() => setI((i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className="grid h-11 w-11 place-items-center rounded-full border border-ink-border text-ink-foreground"><ChevronLeft /></button>
          <button type="button" aria-label="Next" onClick={() => setI((i + 1) % TESTIMONIALS.length)} className="grid h-11 w-11 place-items-center rounded-full border border-ink-border text-ink-foreground"><ChevronRight /></button>
        </div>
      )}
    </div>
  );
}
