import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, MessageCircle, Search, ShieldCheck, X } from "lucide-react";
import { PageHero, CtaBand, SectionHeading } from "@/components/site/sections";
import { ArtistCard, ArtistCategoryCard } from "@/components/site/cards";
import { Button } from "@/components/ui/button";
import { ARTISTS, ARTIST_CATEGORIES, getArtistCategory } from "@/data/artists";
import { getService } from "@/data/services";
import { IMG } from "@/data/images";
import { normalise } from "@/lib/search";
import { availabilityMessage, waLink } from "@/lib/whatsapp";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

const CATS = ARTIST_CATEGORIES.map((c) => c.slug) as [string, ...string[]];

export const Route = createFileRoute("/artists/")({
  validateSearch: z.object({
    category: z.enum(CATS).optional().catch(undefined),
    q: z.string().optional().catch(undefined),
  }),
  head: () =>
    seo({
      title: "Artist Booking — Bollywood, Haryanvi & Bhojpuri Artists, Dance Groups",
      description: "Book artists for your event through Gauri Entertainment: Bollywood, Haryanvi and Bhojpuri singers, live singers, dance groups, bands and celebrity appearances — subject to availability.",
      path: "/artists",
      image: IMG.crowd,
    }),
  component: ArtistsPage,
});

function ArtistsPage() {
  const { category, q = "" } = Route.useSearch();
  const navigate = Route.useNavigate();
  const cat = category ? getArtistCategory(category) : undefined;

  const artists = useMemo(() => {
    const t = normalise(q);
    return ARTISTS.filter(
      (a) =>
        (!category || a.categories.some((c) => c === category)) &&
        (!t || normalise([a.name, a.role, a.summary, ...a.knownFor, ...a.categories].join(" ")).includes(t)),
    );
  }, [category, q]);

  const categories = useMemo(() => {
    const t = normalise(q);
    return t ? ARTIST_CATEGORIES.filter((c) => normalise(`${c.name} ${c.short} ${c.slug}`).includes(t)) : ARTIST_CATEGORIES;
  }, [q]);

  const requestSubject = cat ? cat.name : q ? q : "an artist for my event";
  const relatedService = cat ? getService(cat.serviceSlug) : undefined;

  return (
    <>
      <PageHero
        eyebrow="Artist booking"
        title="Book the artists who make the night"
        text="Bollywood, Haryanvi and Bhojpuri performers, live singers, dance groups and celebrity appearances. We check availability and handle the booking."
        photo={IMG.crowd}
        crumbs={[{ label: "Home", to: "/" }, { label: "Artist Booking" }]}
      />

      <section className="bg-paper py-16">
        <div className="container-x">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <label className="flex flex-1 items-center gap-3 rounded-full border bg-card px-5 shadow-soft">
              <Search className="h-5 w-5 text-primary" />
              <span className="sr-only">Search artists</span>
              <input value={q} onChange={(e) => navigate({ search: (s) => ({ ...s, q: e.target.value || undefined }), replace: true })} placeholder="Search by name, style or language…" className="h-14 w-full bg-transparent text-base outline-none" />
              {(q || category) && (
                <button type="button" onClick={() => navigate({ search: {}, replace: true })} className="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary">
                  <X className="h-4 w-4" /> Clear
                </button>
              )}
            </label>
          </div>

          <div role="tablist" aria-label="Artist categories" className="mt-6 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
            {[{ slug: undefined as string | undefined, name: "All artists" }, ...ARTIST_CATEGORIES].map((c) => {
              const on = category === c.slug;
              return (
                <button key={c.name} role="tab" type="button" aria-selected={on} onClick={() => navigate({ search: (s) => ({ ...s, category: c.slug }), replace: true })} className={cn("relative shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition", on ? "border-primary text-primary-foreground" : "bg-card hover:border-foreground")}>
                  {on && <motion.span layoutId="artist-filter" className="absolute inset-0 rounded-full bg-primary" />}
                  <span className="relative">{c.name}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-primary/25 bg-primary/5 p-4 text-sm">
            <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
            <p>Profiles are listed to help you enquire. Gauri Entertainment does not claim exclusive representation of any artist, and every booking is subject to the artist's own availability, fees and confirmation.</p>
          </div>

          <div className="mt-12">
            <h2 className="text-3xl">{cat ? cat.name : q ? `Artists matching “${q}”` : "Featured artists"}</h2>
            <AnimatePresence mode="wait">
              <motion.div key={`${category}-${q}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {artists.map((a) => <ArtistCard key={a.slug} artist={a} />)}
                <div className={cn("flex flex-col justify-between rounded-2xl bg-ink p-8 text-ink-foreground", artists.length === 0 && "md:col-span-2 lg:col-span-3")}>
                  <div>
                    <p className="eyebrow text-gold">{artists.length === 0 ? "No verified listing yet" : "Not seeing who you want?"}</p>
                    <p className="mt-4 font-display text-3xl leading-snug">
                      {artists.length === 0 ? `We can still check availability for ${requestSubject}.` : "Request any artist — we'll approach their team for you."}
                    </p>
                    <p className="mt-4 text-sm text-ink-muted">Share your date, city, event type and budget. We'll come back with options, availability and terms.</p>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button asChild variant="whatsapp" size="pill">
                      <a href={waLink(availabilityMessage(requestSubject))} target="_blank" rel="noreferrer"><MessageCircle /> Request availability</a>
                    </Button>
                    {relatedService && (
                      <Button asChild variant="glass" size="pill">
                        <Link to="/services/$slug" params={{ slug: relatedService.slug }}>{relatedService.name} <ArrowUpRight /></Link>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="bg-card py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Browse by category" title="Every kind of performer" />
          {categories.length ? (
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
              {categories.map((c) => (
                <ArtistCategoryCard key={c.slug} category={c} active={category === c.slug} onSelect={() => { navigate({ search: { category: c.slug }, replace: true }); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
              ))}
            </div>
          ) : (
            <p className="mt-8 text-muted-foreground">No categories match “{q}”.</p>
          )}
        </div>
      </section>
      <CtaBand photo={IMG.concert} title="Have an artist in mind?" text="Tell us who, when and where — we'll check availability and manage the booking end to end." message={availabilityMessage(requestSubject)} />
    </>
  );
}
