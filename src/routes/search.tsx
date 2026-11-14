import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MapPin, Search as SearchIcon, X } from "lucide-react";
import { PageHero } from "@/components/site/sections";
import { EmptyResults, ResultCard } from "@/components/site/Search";
import { IMG } from "@/data/images";
import { SCOPES, SUGGESTIONS, search, type SearchScope } from "@/lib/search";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

const SCOPE_VALUES = SCOPES.map((s) => s.value) as [SearchScope, ...SearchScope[]];

export const Route = createFileRoute("/search")({
  validateSearch: z.object({
    q: z.string().optional().catch(undefined),
    scope: z.enum(SCOPE_VALUES).optional().catch(undefined),
    city: z.string().optional().catch(undefined),
  }),
  head: () => seo({ title: "Search Events, Artists & Services", description: "Search Gauri Entertainment's events, artists, dance groups, entertainment, décor and catering services.", path: "/search", noindex: true }),
  component: SearchPage,
});

function SearchPage() {
  const { q = "", scope = "all", city = "" } = Route.useSearch();
  const navigate = Route.useNavigate();
  const results = useMemo(() => search(q, scope), [q, scope]);
  const update = (patch: { q?: string | undefined; scope?: SearchScope | undefined; city?: string | undefined }) =>
    navigate({ search: (s) => ({ ...s, ...patch }), replace: true });

  return (
    <>
      <PageHero eyebrow="Search" title={q ? `Results for “${q}”` : "Search events, artists & services"} photo={IMG.stage} crumbs={[{ label: "Home", to: "/" }, { label: "Search" }]} />
      <section className="bg-paper py-14">
        <div className="container-x">
          <div className="grid gap-3 rounded-2xl border bg-card p-3 shadow-soft md:grid-cols-[1fr_16rem]">
            <label className="flex items-center gap-3 px-3">
              <SearchIcon className="h-5 w-5 text-primary" />
              <span className="sr-only">Search</span>
              <input autoFocus value={q} onChange={(e) => update({ q: e.target.value || undefined })} placeholder="Search anything — wedding, Bhojpuri, catering…" className="h-12 w-full bg-transparent text-base outline-none" />
              {q && <button type="button" aria-label="Clear search" onClick={() => update({ q: undefined })}><X className="h-4 w-4" /></button>}
            </label>
            <label className="flex items-center gap-3 border-t px-3 md:border-l md:border-t-0">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="sr-only">City</span>
              <input value={city} onChange={(e) => update({ city: e.target.value || undefined })} placeholder="Event city (optional)" className="h-12 w-full bg-transparent outline-none" />
            </label>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {SCOPES.map((s) => (
              <button key={s.value} type="button" aria-pressed={scope === s.value} onClick={() => update({ scope: s.value })} className={cn("relative rounded-full border px-4 py-2 text-sm font-semibold transition", scope === s.value ? "border-primary text-primary-foreground" : "bg-card hover:border-foreground")}>
                {scope === s.value && <motion.span layoutId="search-scope" className="absolute inset-0 rounded-full bg-primary" />}
                <span className="relative">{s.label}</span>
              </button>
            ))}
            {(q || scope !== "all" || city) && (
              <Link to="/search" search={{}} replace className="ml-2 text-sm font-semibold text-primary underline">Clear all filters</Link>
            )}
          </div>

          {!q && (
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="eyebrow mr-2 self-center text-muted-foreground">Try</span>
              {SUGGESTIONS.map((s) => (
                <button key={s.label} type="button" onClick={() => update({ q: s.query, scope: s.scope })} className="rounded-full bg-secondary px-3 py-1.5 text-sm hover:bg-primary hover:text-primary-foreground">{s.label}</button>
              ))}
            </div>
          )}

          <p className="mt-10 text-sm text-muted-foreground" aria-live="polite">
            {results.length} result{results.length === 1 ? "" : "s"}{city ? ` · enquiries will mention ${city}` : ""}
          </p>
          {results.length === 0 ? (
            <div className="mt-6"><EmptyResults query={q} city={city} /></div>
          ) : (
            <motion.div layout className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {results.map((r) => (
                  <motion.div layout key={r.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}>
                    <ResultCard item={r} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
