import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, MessageCircle, Phone, Search as SearchIcon } from "lucide-react";
import { Photo } from "@/components/site/Photo";
import { SearchPanel } from "@/components/site/Search";
import { ArtistCard, ArtistCategoryCard, ServiceCard } from "@/components/site/cards";
import { CtaBand, FaqList, Marquee, SectionHeading } from "@/components/site/sections";
import { Counter, ImageReveal, Magnetic, Reveal, SplitWords } from "@/components/site/motion";
import { Gallery } from "@/components/site/Gallery";
import { Testimonials } from "@/components/site/Testimonials";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { WhatsAppIcon } from "@/components/site/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { IMG } from "@/data/images";
import { CATEGORIES, servicesIn, type CategorySlug } from "@/data/services";
import { ARTISTS, ARTIST_CATEGORIES } from "@/data/artists";
import { FAQS, FEATURED_EVENTS, PROCESS, STATS, WHY_US } from "@/data/content";
import { SITE } from "@/data/site";
import { SUGGESTIONS } from "@/lib/search";
import { waLink } from "@/lib/whatsapp";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "Gauri Entertainment — Event Management, Weddings & Celebrity Live Shows in Delhi",
      description:
        "Delhi event management and entertainment company: wedding planning, corporate events, Bollywood, Haryanvi & Bhojpuri live shows, dance groups, décor and catering. Enquire on WhatsApp.",
      path: "/",
      image: IMG.mandap,
    }),
  component: Home,
});

const HERO_SLIDES = [
  { photo: IMG.mandap, caption: "Weddings" },
  { photo: IMG.concert, caption: "Celebrity live shows" },
  { photo: IMG.stageDancers, caption: "Dance & stage performances" },
  { photo: IMG.receptionOutdoor, caption: "Décor & receptions" },
];

function Home() {
  return (
    <>
      <Hero />
      <PopularSearches />
      <Stats />
      <ExploreServices />
      <Marquee items={["Weddings", "Celebrity Live Shows", "Mehndi Raat", "Corporate Nights", "Dance Groups", "Décor & Catering"]} />
      <ArtistDiscovery />
      <FeaturedEvents />
      <GallerySection />
      <WhyChoose />
      <TestimonialsSection />
      <PlanYourEvent />
      <FaqSection />
      <CtaBand photo={IMG.confettiStage} />
    </>
  );
}

function Hero() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const ox = useTransform(sx, (v) => v * -30);
  const oy = useTransform(sy, (v) => v * -30);
  const ox2 = useTransform(sx, (v) => v * 50);
  const oy2 = useTransform(sy, (v) => v * 50);

  useEffect(() => {
    if (reduce) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % HERO_SLIDES.length), 6500);
    return () => window.clearInterval(t);
  }, [reduce]);

  return (
    <section
      ref={ref}
      className="grain relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
    >
      <motion.div className="absolute inset-0 -z-20" style={{ y: imgY }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.4 }, scale: { duration: 8, ease: "linear" } }}
          >
            <Photo photo={HERO_SLIDES[i].photo} priority={i === 0} sizes="100vw" width={1920} />
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-ink-fade" />
      <div className="absolute inset-0 -z-10 bg-ink-side opacity-80" />

      {/* cursor-reactive decorative elements */}
      <motion.div aria-hidden style={{ x: ox, y: oy }} className="pointer-events-none absolute right-[8%] top-[22%] -z-10 hidden h-64 w-64 rounded-full border border-gold/30 lg:block" />
      <motion.div aria-hidden style={{ x: ox2, y: oy2 }} className="pointer-events-none absolute right-[16%] top-[34%] -z-10 hidden h-3 w-3 rotate-45 bg-gold lg:block" />
      <motion.div aria-hidden style={{ x: ox2, y: oy }} className="pointer-events-none absolute right-[5%] top-[52%] -z-10 hidden h-24 w-24 animate-float-slow rounded-full border border-ink-foreground/15 lg:block" />

      <motion.div style={{ y: textY, opacity: fade }} className="container-x pb-10 pt-36 sm:pb-14">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="eyebrow flex items-center gap-3 text-gold">
          <span className="h-px w-10 bg-gold" /> Delhi · Events & Entertainment
        </motion.p>
        <h1 className="mt-6 max-w-5xl text-[2.7rem] font-normal leading-[0.98] text-ink-foreground sm:text-7xl lg:text-[5.6rem]">
          <SplitWords text="Creating Extraordinary Experiences." delay={0.3} stagger={0.08} />
          <br />
          <span className="italic text-gold-gradient">
            <SplitWords text="Making Every Celebration Unforgettable." delay={0.6} stagger={0.07} />
          </span>
        </h1>
        <Reveal delay={1}>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-ink-foreground/80 sm:text-lg">
            From weddings and celebrations to celebrity performances and corporate events, Gauri Entertainment brings your vision to life.
          </p>
        </Reveal>
        <Reveal delay={1.15} className="mt-8 flex flex-wrap gap-3">
          <Magnetic>
            <Button asChild variant="hero" size="xl"><Link to="/plan-your-event">Plan Your Event <ArrowUpRight /></Link></Button>
          </Magnetic>
          <Magnetic>
            <Button asChild variant="glass" size="xl"><Link to="/services">Explore Our Services</Link></Button>
          </Magnetic>
        </Reveal>

        <Reveal delay={1.3} className="mt-12 max-w-4xl">
          <SearchPanel />
        </Reveal>

        <div className="mt-8 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {HERO_SLIDES.map((s, n) => (
              <button key={s.caption} type="button" onClick={() => setI(n)} aria-label={`Show ${s.caption}`} className="group flex items-center gap-2">
                <span className="relative h-px w-10 overflow-hidden bg-ink-foreground/25 sm:w-16">
                  {n === i && <motion.span className="absolute inset-y-0 left-0 bg-gold" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: reduce ? 0 : 6.5, ease: "linear" }} />}
                </span>
                <span className={cn("hidden text-xs font-semibold transition md:inline", n === i ? "text-ink-foreground" : "text-ink-foreground/50")}>{s.caption}</span>
              </button>
            ))}
          </div>
          <a href="#explore" className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-ink-foreground/70 hover:text-gold sm:flex">
            Scroll <ArrowDown className="h-4 w-4 animate-bounce" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function PopularSearches() {
  return (
    <section aria-label="Popular searches" className="border-b bg-card">
      <div className="container-x flex items-center gap-4 overflow-x-auto py-5 [scrollbar-width:none]">
        <span className="eyebrow flex shrink-0 items-center gap-2 text-muted-foreground"><SearchIcon className="h-3.5 w-3.5" /> Popular</span>
        {SUGGESTIONS.map((s) => (
          <Link key={s.label} to="/search" search={{ q: s.query, scope: s.scope }} className="shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition hover:border-primary hover:bg-primary hover:text-primary-foreground">
            {s.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  const shown = STATS.filter((s) => s.value !== null);
  return (
    <section id="explore" className="bg-paper">
      <div className="container-x grid grid-cols-2 gap-px overflow-hidden py-16 sm:py-20 lg:grid-cols-4">
        {shown.map((s, n) => (
          <Reveal key={s.label} delay={n * 0.08} className="border-l border-border px-4 py-2 first:border-l-0 sm:px-8 [&:nth-child(3)]:border-l-0 lg:[&:nth-child(3)]:border-l">
            <p className="font-display text-6xl font-light text-foreground sm:text-7xl">
              <Counter to={s.value ?? 0} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ExploreServices() {
  const [cat, setCat] = useState<CategorySlug>("event-management");
  const active = CATEGORIES.find((c) => c.slug === cat)!;
  return (
    <section className="bg-paper pb-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Explore our services"
          title="Everything your celebration needs, under one roof"
          text="Choose a category to explore. Every service has its own page with what's included and how to enquire."
          action={<Button asChild variant="line" size="pill"><Link to="/services">View all services <ArrowUpRight /></Link></Button>}
        />

        <div role="tablist" aria-label="Service categories" className="mt-12 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
          {CATEGORIES.map((c) => (
            <button key={c.slug} role="tab" type="button" aria-selected={cat === c.slug} onClick={() => setCat(c.slug)} className={cn("relative shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition", cat === c.slug ? "border-primary text-primary-foreground" : "hover:border-foreground")}>
              {cat === c.slug && <motion.span layoutId="svc-tab" className="absolute inset-0 rounded-full bg-primary" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
              <span className="relative">{c.name}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={cat} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="mt-8">
            <p className="max-w-2xl text-muted-foreground">{active.description}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {servicesIn(cat).slice(0, 8).map((s) => <ServiceCard key={s.slug} service={s} />)}
            </div>
            <Link to="/services" search={{ category: cat }} className="mt-8 inline-flex items-center gap-2 font-semibold text-primary link-underline">
              All {active.name} services <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function ArtistDiscovery() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  return (
    <section className="grain relative overflow-hidden bg-ink py-24 text-ink-foreground">
      <div className="container-x">
        <SectionHeading
          tone="ink"
          eyebrow="Artist discovery"
          title="Find the performer who makes the night"
          text="Browse by category or search by name, style or language. Every booking is subject to the artist's availability — we check and confirm before anything is promised."
        />
        <form
          role="search"
          className="mt-10 flex max-w-2xl items-center gap-2 rounded-full border border-ink-border bg-ink-soft p-1.5"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/artists", search: { q: q.trim() || undefined } });
          }}
        >
          <SearchIcon className="ml-4 h-5 w-5 text-gold" />
          <label htmlFor="artist-q" className="sr-only">Search artists</label>
          <input id="artist-q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search artists — e.g. Haryanvi, singer, dance group" className="h-11 flex-1 bg-transparent text-ink-foreground outline-none placeholder:text-ink-muted" />
          <button type="submit" className="h-11 rounded-full bg-gold-gradient px-6 text-sm font-semibold text-accent-foreground">Search</button>
        </form>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {ARTIST_CATEGORIES.map((c, n) => (
            <Reveal key={c.slug} delay={n * 0.05}><ArtistCategoryCard category={c} /></Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_1fr_1.1fr]">
          {ARTISTS.map((a) => (
            <Reveal key={a.slug}><ArtistCard artist={a} /></Reveal>
          ))}
          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-2xl border border-ink-border p-8">
              <div>
                <p className="eyebrow text-gold">Looking for someone else?</p>
                <p className="mt-4 font-display text-3xl leading-snug">Bollywood singers, Bhojpuri stars, live bands, anchors and more — on request.</p>
                <p className="mt-4 text-sm text-ink-muted">Tell us who you have in mind, your date and city. We'll approach the artist's team and come back with availability and terms.</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="whatsapp" size="pill"><a href={waLink("Hello Gauri Entertainment! I'd like to book an artist for my event.")} target="_blank" rel="noreferrer"><MessageCircle /> Request an artist</a></Button>
                <Button asChild variant="glass" size="pill"><Link to="/live-shows">Live shows</Link></Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FeaturedEvents() {
  return (
    <section className="bg-paper py-24">
      <div className="container-x">
        <SectionHeading eyebrow="Featured events" title="The occasions we bring to life" />
        <div className="mt-12 grid auto-rows-[18rem] gap-4 sm:grid-cols-2 lg:auto-rows-[20rem] lg:grid-cols-4">
          {FEATURED_EVENTS.map((e, n) => {
            const span = n === 0 ? "lg:col-span-2 lg:row-span-2" : n === 3 ? "lg:col-span-2" : "";
            const inner = (
              <>
                <Photo photo={e.photo} width={1000} sizes="(min-width:1024px) 50vw, 100vw" className="img-zoom group-hover:scale-110" />
                <div className="absolute inset-0 bg-ink-fade" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <div>
                    <h3 className={cn("font-display text-ink-foreground", n === 0 ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl")}>{e.title}</h3>
                    <p className="mt-1 text-sm text-ink-foreground/75">{e.text}</p>
                  </div>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink-foreground/30 text-ink-foreground transition duration-500 group-hover:rotate-45 group-hover:bg-gold group-hover:text-ink"><ArrowUpRight className="h-5 w-5" /></span>
                </div>
              </>
            );
            return (
              <Reveal key={e.title} delay={n * 0.06} className={cn("h-full", span)}>
                {"slug" in e && e.slug ? (
                  <Link to="/services/$slug" params={{ slug: e.slug }} data-cursor="Explore" className="group relative block h-full overflow-hidden rounded-2xl">{inner}</Link>
                ) : (
                  <Link to={e.to as "/weddings" | "/corporate-events" | "/live-shows"} data-cursor="Explore" className="group relative block h-full overflow-hidden rounded-2xl">{inner}</Link>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section className="bg-card py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Event gallery"
          title="Moments, colour and celebration"
          action={<Button asChild variant="line" size="pill"><Link to="/gallery">Open full gallery <ArrowUpRight /></Link></Button>}
        />
        <div className="mt-12"><Gallery limit={12} /></div>
      </div>
    </section>
  );
}

function WhyChoose() {
  return (
    <section className="bg-paper py-24">
      <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow="Why Gauri Entertainment" title="Celebrations planned with heart, run with discipline" />
          <ImageReveal className="mt-10 aspect-[4/3] rounded-2xl">
            <Photo photo={IMG.henna} width={1000} />
          </ImageReveal>
        </div>
        <div>
          <div className="grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2">
            {WHY_US.map((w, n) => (
              <Reveal key={w.title} delay={n * 0.05} className="bg-card p-7">
                <span className="font-display text-sm italic text-primary">0{n + 1}</span>
                <h3 className="mt-3 text-2xl">{w.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{w.text}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-14">
            <p className="eyebrow text-primary">How it works</p>
            <ol className="mt-6 space-y-2">
              {PROCESS.map((p, n) => (
                <Reveal as="li" key={p.n} delay={n * 0.08} className="group flex gap-6 border-b py-6">
                  <span className="font-display text-4xl font-light text-primary/60 transition group-hover:text-primary">{p.n}</span>
                  <div>
                    <h3 className="text-xl">{p.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{p.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="grain bg-ink py-24">
      <div className="container-x">
        <SectionHeading tone="ink" eyebrow="Client stories" title="In our clients' words" />
        <div className="mt-12"><Testimonials /></div>
      </div>
    </section>
  );
}

function PlanYourEvent() {
  return (
    <section id="plan" className="bg-paper py-24">
      <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading eyebrow="Plan your event" title="Tell us about your celebration" text="Fill in what you know — we'll take it from there. Your enquiry opens in WhatsApp so you can send it to us directly." />
          <div className="mt-10 grid gap-3">
            <a href={waLink()} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-2xl bg-whatsapp p-5 text-whatsapp-foreground transition hover:brightness-110">
              <WhatsAppIcon className="h-9 w-9" />
              <span>
                <span className="block text-xs font-semibold uppercase tracking-[0.2em] opacity-80">WhatsApp</span>
                <span className="font-display text-2xl">{SITE.phones[0].display}</span>
              </span>
              <ArrowUpRight className="ml-auto h-5 w-5 transition group-hover:rotate-45" />
            </a>
            {SITE.phones.map((p) => (
              <a key={p.e164} href={`tel:${p.e164}`} className="flex items-center gap-4 rounded-2xl border bg-card p-5 transition hover:border-primary">
                <Phone className="h-5 w-5 text-primary" />
                <span>
                  <span className="block text-xs text-muted-foreground">{p.label} · Call</span>
                  <span className="font-semibold">{p.display}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
        <Reveal className="rounded-[2rem] border bg-card p-6 shadow-soft sm:p-10">
          <EnquiryForm />
        </Reveal>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="bg-card py-24">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow="FAQs"
          title="Questions, answered"
          action={<Button asChild variant="line" size="pill"><Link to="/faq">All FAQs <ArrowUpRight /></Link></Button>}
        />
        <FaqList faqs={FAQS.slice(0, 6)} />
      </div>
    </section>
  );
}
