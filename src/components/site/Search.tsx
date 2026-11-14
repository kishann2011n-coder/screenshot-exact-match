import { Link, useNavigate } from "@tanstack/react-router";
import { useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, MapPin, MessageCircle, Search as SearchIcon, X } from "lucide-react";
import { Photo } from "./Photo";
import { SCOPES, SUGGESTIONS, search, type SearchItem, type SearchScope } from "@/lib/search";
import { availabilityMessage, waLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const HERO_SCOPES: SearchScope[] = ["all", "event-management", "artists", "entertainment", "dance-music", "decor-catering"];

export function SearchPanel({ className }: { className?: string }) {
  const navigate = useNavigate();
  const [scope, setScope] = useState<SearchScope>("all");
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [focused, setFocused] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const blurTimer = useRef<number | undefined>(undefined);
  const listId = useId();

  const results = useMemo(() => (q.trim() ? search(q, scope).slice(0, 6) : []), [q, scope]);
  const open = focused && (q.trim().length > 0 || true);

  const submit = (query = q, sc = scope) => {
    navigate({ to: "/search", search: { q: query.trim(), scope: sc, city: city.trim() || undefined } });
  };

  return (
    <div className={cn("relative rounded-[1.6rem] border border-ink-foreground/15 bg-ink/70 p-2 shadow-lift backdrop-blur-xl", className)}>
      <div role="tablist" aria-label="Search type" className="flex gap-1 overflow-x-auto px-1 pb-2 pt-1 [scrollbar-width:none]">
        {HERO_SCOPES.map((s) => {
          const label = SCOPES.find((x) => x.value === s)?.label;
          return (
            <button
              key={s}
              role="tab"
              type="button"
              aria-selected={scope === s}
              onClick={() => setScope(s)}
              className={cn(
                "relative shrink-0 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-colors",
                scope === s ? "text-accent-foreground" : "text-ink-foreground/70 hover:text-ink-foreground",
              )}
            >
              {scope === s && <motion.span layoutId="scope-pill" className="absolute inset-0 -z-0 rounded-full bg-gold-gradient" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
              <span className="relative">{label}</span>
            </button>
          );
        })}
      </div>

      <form
        role="search"
        className="grid gap-2 rounded-[1.2rem] bg-card p-2 sm:grid-cols-[1fr_13rem_auto]"
        onSubmit={(e) => {
          e.preventDefault();
          if (activeIdx >= 0 && results[activeIdx]) {
            navigate(results[activeIdx].link as never);
            return;
          }
          submit();
        }}
      >
        <label className="relative flex items-center gap-3 px-3">
          <SearchIcon className="h-5 w-5 shrink-0 text-primary" />
          <span className="sr-only">Search events, artists and services</span>
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActiveIdx(-1);
            }}
            onFocus={() => {
              window.clearTimeout(blurTimer.current);
              setFocused(true);
            }}
            onBlur={() => (blurTimer.current = window.setTimeout(() => setFocused(false), 150))}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveIdx((i) => Math.min(i + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveIdx((i) => Math.max(i - 1, -1));
              } else if (e.key === "Escape") setFocused(false);
            }}
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-autocomplete="list"
            placeholder="Wedding planner, Haryanvi artist, catering…"
            className="h-12 w-full bg-transparent text-base text-card-foreground outline-none placeholder:text-muted-foreground"
          />
          {q && (
            <button type="button" aria-label="Clear search" onClick={() => setQ("")} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          )}
        </label>
        <label className="flex items-center gap-3 border-t px-3 sm:border-l sm:border-t-0">
          <MapPin className="h-5 w-5 shrink-0 text-primary" />
          <span className="sr-only">Event city</span>
          <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Event city (optional)" className="h-12 w-full bg-transparent text-base text-card-foreground outline-none placeholder:text-muted-foreground" />
        </label>
        <button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 font-semibold text-primary-foreground transition hover:bg-sindoor">
          Search <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      <AnimatePresence>
        {open && (
          <motion.div
            id={listId}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-2 top-full z-30 mt-2 overflow-hidden rounded-2xl border bg-popover text-popover-foreground shadow-lift"
            onMouseDown={(e) => e.preventDefault()}
          >
            {q.trim() === "" ? (
              <div className="p-5">
                <p className="eyebrow text-muted-foreground">Popular searches</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button key={s.label} type="button" onClick={() => { setQ(s.query); }} className="rounded-full border px-3 py-1.5 text-sm transition hover:border-primary hover:text-primary">
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length ? (
              <ul role="listbox" className="max-h-[22rem] overflow-y-auto p-2">
                {results.map((r, i) => (
                  <li key={r.id} role="option" aria-selected={i === activeIdx}>
                    <Link {...(r.link as never)} className={cn("flex items-center gap-4 rounded-xl p-2 transition", i === activeIdx ? "bg-secondary" : "hover:bg-secondary")}>
                      <div className="h-12 w-14 shrink-0 overflow-hidden rounded-lg bg-muted">{r.photo && <Photo photo={r.photo} width={160} />}</div>
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{r.title}</p>
                        <p className="truncate text-xs text-muted-foreground">{r.kind} · {r.group}</p>
                      </div>
                    </Link>
                  </li>
                ))}
                <li>
                  <button type="button" onClick={() => submit()} className="flex w-full items-center justify-between rounded-xl p-3 text-sm font-semibold text-primary hover:bg-secondary">
                    See all results for “{q}” <ArrowRight className="h-4 w-4" />
                  </button>
                </li>
              </ul>
            ) : (
              <div className="p-5 text-sm">
                <p className="font-semibold">No listings match “{q}” yet.</p>
                <p className="mt-1 text-muted-foreground">We may still be able to arrange it — ask us directly.</p>
                <a href={waLink(availabilityMessage(`${q}${city ? ` in ${city}` : ""}`))} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2 font-semibold text-whatsapp-foreground">
                  <MessageCircle className="h-4 w-4" /> Request on WhatsApp
                </a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ResultCard({ item }: { item: SearchItem }) {
  return (
    <Link {...(item.link as never)} className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-lift">
      <div className="aspect-[16/10] overflow-hidden bg-muted">{item.photo && <Photo photo={item.photo} width={700} sizes="(min-width:1024px) 33vw, 100vw" className="img-zoom group-hover:scale-105" />}</div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow text-primary">{item.kind} · {item.group}</p>
        <h3 className="mt-2 font-display text-xl leading-snug">{item.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{item.subtitle}</p>
        <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-primary">Open <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
      </div>
    </Link>
  );
}

export function EmptyResults({ query, city }: { query: string; city?: string }) {
  return (
    <div className="rounded-3xl border border-dashed bg-card p-10 text-center">
      <p className="font-display text-3xl">Nothing listed for “{query}” yet</p>
      <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
        Our listings show only what we can verify. Tell us what you're looking for and we'll check whether we can arrange it{city ? ` in ${city}` : ""}.
      </p>
      <a href={waLink(availabilityMessage(`${query}${city ? ` in ${city}` : ""}`))} target="_blank" rel="noreferrer" className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-whatsapp px-6 font-semibold text-whatsapp-foreground">
        <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
      </a>
    </div>
  );
}
