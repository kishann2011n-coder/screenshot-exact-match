import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowUpRight, ChevronRight, MessageCircle } from "lucide-react";
import { Photo } from "./Photo";
import { Reveal, SplitWords, Magnetic, motion } from "./motion";
import { Button } from "@/components/ui/button";
import type { Photo as PhotoT } from "@/data/images";
import { waLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Faq } from "@/data/content";

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  tone = "paper",
  action,
  as: As = "h2",
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  tone?: "paper" | "ink";
  action?: ReactNode;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", align === "center" && "items-center text-center md:flex-col md:items-center")}>
      <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
        {eyebrow && (
          <Reveal>
            <p className={cn("eyebrow flex items-center gap-3", tone === "ink" ? "text-gold" : "text-primary", align === "center" && "justify-center")}>
              <span className="h-px w-8 bg-current" />
              {eyebrow}
            </p>
          </Reveal>
        )}
        <As className={cn("mt-4 text-4xl leading-[1.04] sm:text-5xl lg:text-[3.6rem]", tone === "ink" ? "text-ink-foreground" : "text-foreground")}>
          <SplitWords text={title} />
        </As>
        {text && (
          <Reveal delay={0.15}>
            <p className={cn("mt-5 max-w-2xl text-base leading-relaxed sm:text-lg", tone === "ink" ? "text-ink-muted" : "text-muted-foreground", align === "center" && "mx-auto")}>{text}</p>
          </Reveal>
        )}
      </div>
      {action && <Reveal delay={0.2}>{action}</Reveal>}
    </div>
  );
}

export type Crumb = { label: string; to?: "/" | "/services" | "/artists" | "/blog" | "/about" | "/gallery" };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-ink-foreground/70">
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-1.5">
            {c.to ? (
              <Link to={c.to} className="hover:text-gold">{c.label}</Link>
            ) : (
              <span aria-current="page" className="text-gold">{c.label}</span>
            )}
            {i < items.length - 1 && <ChevronRight className="h-3 w-3" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  text,
  photo,
  crumbs,
  children,
  size = "md",
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  photo: PhotoT;
  crumbs: Crumb[];
  children?: ReactNode;
  size?: "md" | "lg";
}) {
  return (
    <section className={cn("grain relative isolate flex items-end overflow-hidden bg-ink", size === "lg" ? "min-h-[88svh]" : "min-h-[68svh]")}>
      <motion.div className="absolute inset-0 -z-10" initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}>
        <Photo photo={photo} priority sizes="100vw" width={1800} />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-ink-fade" />
      <div className="absolute inset-0 -z-10 bg-ink-side opacity-70" />
      <div className="container-x pb-14 pt-40 sm:pb-20">
        <Breadcrumbs items={crumbs} />
        {eyebrow && <p className="eyebrow mt-8 text-gold">{eyebrow}</p>}
        <h1 className="mt-4 max-w-4xl text-[2.6rem] leading-[1.02] text-ink-foreground sm:text-6xl lg:text-7xl">
          <SplitWords text={title} delay={0.15} />
        </h1>
        {text && (
          <Reveal delay={0.4}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-foreground/80 sm:text-lg">{text}</p>
          </Reveal>
        )}
        {children && <Reveal delay={0.55} className="mt-8">{children}</Reveal>}
      </div>
    </section>
  );
}

export function CtaBand({
  title = "Ready to plan your celebration?",
  text = "Share your date, city and guest count — we'll get back to you on WhatsApp with ideas and availability.",
  photo,
  message,
}: {
  title?: string;
  text?: string;
  photo: PhotoT;
  message?: string;
}) {
  return (
    <section className="container-x py-20">
      <div className="grain relative isolate overflow-hidden rounded-[2rem] bg-ink px-6 py-16 sm:px-14 sm:py-20">
        <div className="absolute inset-0 -z-10 opacity-45">
          <Photo photo={photo} sizes="100vw" />
        </div>
        <div className="absolute inset-0 -z-10 bg-ink-side" />
        <div className="max-w-2xl">
          <p className="eyebrow text-gold">Plan your event</p>
          <h2 className="mt-4 text-4xl leading-tight text-ink-foreground sm:text-5xl">
            <SplitWords text={title} />
          </h2>
          <p className="mt-5 text-ink-foreground/80">{text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Magnetic>
              <Button asChild variant="hero" size="xl">
                <Link to="/plan-your-event">Plan Your Event <ArrowUpRight /></Link>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild variant="whatsapp" size="xl">
                <a href={waLink(message)} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp now</a>
              </Button>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FaqList({ faqs, tone = "paper" }: { faqs: Faq[]; tone?: "paper" | "ink" }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((f, i) => (
        <AccordionItem key={f.q} value={`faq-${i}`} className={tone === "ink" ? "border-ink-border" : "border-border"}>
          <AccordionTrigger className={cn("py-6 text-left font-display text-lg hover:no-underline sm:text-xl", tone === "ink" ? "text-ink-foreground" : "text-foreground")}>
            {f.q}
          </AccordionTrigger>
          <AccordionContent className={cn("pb-6 text-base leading-relaxed", tone === "ink" ? "text-ink-muted" : "text-muted-foreground")}>{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function Marquee({ items, tone = "paper" }: { items: string[]; tone?: "paper" | "ink" }) {
  const row = [...items, ...items];
  return (
    <div className={cn("relative flex overflow-hidden border-y py-6", tone === "ink" ? "border-ink-border bg-ink text-ink-foreground" : "border-border bg-background text-foreground")} aria-hidden>
      <div className="flex shrink-0 animate-marquee items-center gap-10 whitespace-nowrap pr-10">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-3xl italic sm:text-4xl">
            {t}
            <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function MapEmbed({ query, className }: { query: string; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border bg-muted", className)}>
      <iframe
        title="Gauri Entertainment location on Google Maps"
        src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
        className="h-full min-h-[22rem] w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
