import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import { PageHero, CtaBand, SectionHeading } from "@/components/site/sections";
import { ServiceCard } from "@/components/site/cards";
import { EmptyResults } from "@/components/site/Search";
import { CATEGORIES, SERVICES } from "@/data/services";
import { IMG } from "@/data/images";
import { normalise } from "@/lib/search";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  category: z.enum(["event-management", "entertainment", "dance-music", "decor-catering"]).optional().catch(undefined),
  q: z.string().optional().catch(undefined),
});

export const Route = createFileRoute("/services/")({
  validateSearch: searchSchema,
  head: () =>
    seo({
      title: "Event Services — Weddings, Live Shows, Dance, Décor & Catering",
      description: "Browse every Gauri Entertainment service: event management, celebrity live shows, artist booking, dance groups, live singers, decoration and catering in Delhi.",
      path: "/services",
      image: IMG.tablescape,
    }),
  component: ServicesPage,
});

function ServicesPage() {
  const { category, q = "" } = Route.useSearch();
  const navigate = Route.useNavigate();
  const list = useMemo(() => {
    const t = normalise(q);
    return SERVICES.filter((s) => (!category || s.category === category) && (!t || normalise([s.name, s.short, ...s.keywords].join(" ")).includes(t)));
  }, [category, q]);

  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Every service your event could need"
        text="Event management, entertainment, dance and music, decoration and catering — book one service or let us organise everything."
        photo={IMG.tablescape}
        crumbs={[{ label: "Home", to: "/" }, { label: "Services" }]}
      />
      <section className="bg-paper py-16">
        <div className="container-x">
          <div className="sticky top-[4.5rem] z-20 -mx-2 flex flex-col gap-4 rounded-2xl bg-background/90 p-2 backdrop-blur lg:flex-row lg:items-center lg:justify-between">
            <div role="tablist" aria-label="Filter by category" className="flex gap-2 overflow-x-auto [scrollbar-width:none]">
              {[{ slug: undefined, name: "All services" }, ...CATEGORIES].map((c) => {
                const on = category === c.slug;
                return (
                  <button key={c.name} role="tab" type="button" aria-selected={on} onClick={() => navigate({ search: (s) => ({ ...s, category: c.slug }), replace: true })} className={cn("relative shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition", on ? "border-primary text-primary-foreground" : "bg-card hover:border-foreground")}>
                    {on && <motion.span layoutId="svc-filter" className="absolute inset-0 rounded-full bg-primary" />}
                    <span className="relative">{c.name}</span>
                  </button>
                );
              })}
            </div>
            <label className="flex items-center gap-2 rounded-full border bg-card px-4 lg:w-80">
              <Search className="h-4 w-4 text-primary" />
              <span className="sr-only">Filter services</span>
              <input value={q} onChange={(e) => navigate({ search: (s) => ({ ...s, q: e.target.value || undefined }), replace: true })} placeholder="Filter services…" className="h-11 w-full bg-transparent outline-none" />
              {(q || category) && (
                <button type="button" aria-label="Clear filters" onClick={() => navigate({ search: {}, replace: true })}><X className="h-4 w-4" /></button>
              )}
            </label>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">{list.length} service{list.length === 1 ? "" : "s"}</p>

          {list.length === 0 ? (
            <div className="mt-6"><EmptyResults query={q} /></div>
          ) : category || q ? (
            <motion.div layout className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {list.map((s) => (
                  <motion.div layout key={s.slug} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}>
                    <ServiceCard service={s} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="mt-6 space-y-20">
              {CATEGORIES.map((c) => (
                <div key={c.slug}>
                  <SectionHeading eyebrow={`${SERVICES.filter((s) => s.category === c.slug).length} services`} title={c.name} text={c.description} action={<Link to="/services" search={{ category: c.slug }} className="font-semibold text-primary link-underline">View category</Link>} />
                  <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {SERVICES.filter((s) => s.category === c.slug).map((s) => <ServiceCard key={s.slug} service={s} />)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <CtaBand photo={IMG.floralAisle} />
    </>
  );
}
