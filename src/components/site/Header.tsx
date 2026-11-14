import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ChevronDown, Instagram, MapPin, Menu, Phone, Search, X } from "lucide-react";
import { Logo } from "./Logo";
import { Photo } from "./Photo";
import { Magnetic } from "./motion";
import { Button } from "@/components/ui/button";
import { CATEGORIES, servicesIn } from "@/data/services";
import { ARTISTS, ARTIST_CATEGORIES } from "@/data/artists";
import { IMG } from "@/data/images";
import { NAV_PRIMARY, SITE } from "@/data/site";
import { cn } from "@/lib/utils";

type MegaKey = "services" | "artists" | null;
const EASE = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState<MegaKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMega(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const openMega = (k: MegaKey) => {
    window.clearTimeout(closeTimer.current);
    setMega(k);
  };
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMega(null), 160);
  };

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));
  const indicatorKey = hovered ?? NAV_PRIMARY.find((n) => isActive(n.to))?.to ?? null;

  return (
    <header className="fixed inset-x-0 top-0 z-50" onKeyDown={(e) => e.key === "Escape" && setMega(null)}>
      {/* utility bar */}
      <div
        className={cn(
          "hidden overflow-hidden bg-ink text-ink-muted transition-all duration-500 md:block",
          scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100",
        )}
      >
        <div className="container-x flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-gold" />Sarai Rohilla, Delhi</span>
            <a href={`tel:${SITE.phones[0].e164}`} className="flex items-center gap-2 hover:text-ink-foreground"><Phone className="h-3.5 w-3.5 text-gold" />{SITE.phones[0].display}</a>
            <a href={`tel:${SITE.phones[1].e164}`} className="hidden items-center gap-2 hover:text-ink-foreground lg:flex">{SITE.phones[1].display}</a>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/search" search={{ q: "", scope: "all" }} className="flex items-center gap-2 hover:text-ink-foreground"><Search className="h-3.5 w-3.5" />Search services & artists</Link>
            <a href={SITE.instagram.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-ink-foreground"><Instagram className="h-3.5 w-3.5" />@{SITE.instagram.handle}</a>
            <Link to="/partner" className="hover:text-ink-foreground">Partner with us</Link>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "border-b transition-all duration-500",
          scrolled || mega ? "border-ink-border/60 bg-ink/92 backdrop-blur-xl" : "border-transparent bg-gradient-to-b from-ink/70 to-transparent",
        )}
      >
        <div className="container-x flex h-[4.5rem] items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Primary" className="hidden xl:block" onMouseLeave={() => { setHovered(null); scheduleClose(); }}>
            <ul className="flex items-center">
              {NAV_PRIMARY.map((item) => {
                const hasMega = "mega" in item;
                return (
                  <li
                    key={item.to}
                    className="relative"
                    onMouseEnter={() => {
                      setHovered(item.to);
                      if (hasMega) openMega(item.mega as MegaKey);
                      else scheduleClose();
                    }}
                  >
                    <Link
                      to={item.to}
                      className={cn(
                        "relative flex items-center gap-1 px-3 py-2 text-[0.8rem] font-semibold tracking-wide transition-colors",
                        isActive(item.to) ? "text-gold" : "text-ink-foreground/85 hover:text-ink-foreground",
                      )}
                      aria-haspopup={hasMega ? "true" : undefined}
                      aria-expanded={hasMega ? mega === item.mega : undefined}
                      onFocus={() => hasMega && openMega(item.mega as MegaKey)}
                    >
                      {item.label}
                      {hasMega && <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-300", mega === item.mega && "rotate-180")} />}
                      {indicatorKey === item.to && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute inset-x-3 -bottom-0.5 h-px bg-gold-gradient"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/search" search={{ q: "", scope: "all" }} aria-label="Search" className="grid h-10 w-10 place-items-center rounded-full text-ink-foreground/80 transition hover:bg-ink-foreground/10 hover:text-ink-foreground xl:hidden">
              <Search className="h-5 w-5" />
            </Link>
            <Magnetic className="hidden sm:inline-block">
              <Button asChild variant="hero" size="pill">
                <Link to="/plan-your-event">Plan Your Event</Link>
              </Button>
            </Magnetic>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full text-ink-foreground transition hover:bg-ink-foreground/10 xl:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mega && (
            <motion.div
              key={mega}
              initial={reduce ? false : { opacity: 0, y: -12, clipPath: "inset(0 0 100% 0)" }}
              animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
              exit={{ opacity: 0, y: -8, clipPath: "inset(0 0 100% 0)" }}
              transition={{ duration: 0.45, ease: EASE }}
              className="absolute inset-x-0 hidden border-b border-ink-border/60 bg-ink xl:block"
              onMouseEnter={() => openMega(mega)}
              onMouseLeave={scheduleClose}
            >
              {mega === "services" ? <ServicesMega /> : <ArtistsMega />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>{mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}</AnimatePresence>
    </header>
  );
}

function ServicesMega() {
  return (
    <div className="container-x grid grid-cols-[1fr_1fr_1fr_1fr_18rem] gap-8 py-10">
      {CATEGORIES.map((c, ci) => (
        <motion.div key={c.slug} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * ci, duration: 0.5, ease: EASE }}>
          <Link to="/services" search={{ category: c.slug }} className="eyebrow text-gold hover:text-gold-soft">{c.name}</Link>
          <ul className="mt-4 space-y-2">
            {servicesIn(c.slug).map((s) => (
              <li key={s.slug}>
                <Link to="/services/$slug" params={{ slug: s.slug }} className="link-underline text-sm text-ink-foreground/75 hover:text-ink-foreground">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
      <Link to="/plan-your-event" className="group relative block overflow-hidden rounded-xl">
        <div className="aspect-[4/5]">
          <Photo photo={IMG.floralAisle} width={600} className="img-zoom group-hover:scale-105" />
        </div>
        <div className="absolute inset-0 bg-ink-fade" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-ink-foreground">
          <p className="font-display text-2xl italic">Plan something unforgettable</p>
          <span className="mt-2 inline-flex items-center gap-1 text-sm text-gold">Start your enquiry <ArrowUpRight className="h-4 w-4" /></span>
        </div>
      </Link>
    </div>
  );
}

function ArtistsMega() {
  return (
    <div className="container-x grid grid-cols-[1.2fr_2fr] gap-10 py-10">
      <div>
        <p className="eyebrow text-gold">Browse by category</p>
        <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
          {ARTIST_CATEGORIES.map((c) => (
            <li key={c.slug}>
              <Link to="/artists" search={{ category: c.slug }} className="link-underline text-sm text-ink-foreground/75 hover:text-ink-foreground">
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/artists" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-gold hover:text-gold-soft">
          Search all artists <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {ARTISTS.map((a) => (
          <Link key={a.slug} to="/artists/$slug" params={{ slug: a.slug }} className="group relative overflow-hidden rounded-xl bg-ink-soft">
            <div className="aspect-[4/5]">
              {a.image ? <Photo photo={a.image} width={500} className="img-zoom group-hover:scale-105" /> : <div className="grid h-full place-items-center font-display text-5xl italic text-gold-gradient">{a.name.split(" ").map((w) => w[0]).join("")}</div>}
            </div>
            <div className="absolute inset-0 bg-ink-fade" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="font-display text-lg text-ink-foreground">{a.name}</p>
              <p className="text-xs text-ink-muted">{a.role}</p>
            </div>
          </Link>
        ))}
        <Link to="/live-shows" className="group relative overflow-hidden rounded-xl">
          <div className="aspect-[4/5]"><Photo photo={IMG.crowd} width={500} className="img-zoom group-hover:scale-105" /></div>
          <div className="absolute inset-0 bg-ink-fade" />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <p className="font-display text-lg text-ink-foreground">Celebrity Live Shows</p>
            <p className="text-xs text-gold">Bollywood · Haryanvi · Bhojpuri</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const [section, setSection] = useState<string | null>(null);
  return (
    <motion.div
      initial={{ clipPath: "circle(0% at 100% 0%)" }}
      animate={{ clipPath: "circle(150% at 100% 0%)" }}
      exit={{ clipPath: "circle(0% at 100% 0%)" }}
      transition={{ duration: 0.6, ease: EASE }}
      className="fixed inset-0 top-[4.5rem] z-40 overflow-y-auto bg-ink pb-28 text-ink-foreground xl:hidden"
    >
      <nav aria-label="Mobile" className="container-x py-6">
        <ul className="divide-y divide-ink-border/60">
          {NAV_PRIMARY.map((item, i) => {
            const sub = "mega" in item ? item.mega : null;
            return (
              <motion.li key={item.to} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 + i * 0.04, duration: 0.5, ease: EASE }}>
                <div className="flex items-center justify-between">
                  <Link to={item.to} onClick={onClose} className="block py-4 font-display text-2xl">
                    {item.label}
                  </Link>
                  {sub && (
                    <button type="button" aria-label={`Show ${item.label} links`} aria-expanded={section === sub} onClick={() => setSection(section === sub ? null : sub)} className="grid h-11 w-11 place-items-center rounded-full border border-ink-border">
                      <ChevronDown className={cn("h-5 w-5 transition-transform", section === sub && "rotate-180")} />
                    </button>
                  )}
                </div>
                <AnimatePresence initial={false}>
                  {sub && section === sub && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="grid gap-5 pb-6">
                        {sub === "services"
                          ? CATEGORIES.map((c) => (
                              <div key={c.slug}>
                                <p className="eyebrow text-gold">{c.name}</p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {servicesIn(c.slug).map((s) => (
                                    <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} onClick={onClose} className="rounded-full border border-ink-border px-3 py-1.5 text-sm text-ink-foreground/80">
                                      {s.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))
                          : (
                            <div className="flex flex-wrap gap-2">
                              {ARTIST_CATEGORIES.map((c) => (
                                <Link key={c.slug} to="/artists" search={{ category: c.slug }} onClick={onClose} className="rounded-full border border-ink-border px-3 py-1.5 text-sm text-ink-foreground/80">
                                  {c.name}
                                </Link>
                              ))}
                              {ARTISTS.map((a) => (
                                <Link key={a.slug} to="/artists/$slug" params={{ slug: a.slug }} onClick={onClose} className="rounded-full border border-gold/50 px-3 py-1.5 text-sm text-gold">
                                  {a.name}
                                </Link>
                              ))}
                            </div>
                          )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
        <div className="mt-8 grid gap-3">
          <Button asChild variant="hero" size="xl"><Link to="/plan-your-event" onClick={onClose}>Plan Your Event</Link></Button>
          <div className="grid grid-cols-2 gap-3">
            {SITE.phones.map((p) => (
              <a key={p.e164} href={`tel:${p.e164}`} className="rounded-xl border border-ink-border p-3 text-sm">
                <span className="block text-xs text-ink-muted">{p.label}</span>
                {p.display}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </motion.div>
  );
}
