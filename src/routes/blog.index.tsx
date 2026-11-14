import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero, CtaBand } from "@/components/site/sections";
import { Photo } from "@/components/site/Photo";
import { Reveal } from "@/components/site/motion";
import { IMG } from "@/data/images";
import { POSTS } from "@/data/blog";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/blog/")({
  head: () =>
    seo({
      title: "Knowledge Centre — Wedding, Live Show & Event Planning Guides",
      description: "Practical guides from Gauri Entertainment on planning Indian weddings, booking celebrity artists, corporate events and choosing dance groups.",
      path: "/blog",
      image: IMG.mandapOutdoor,
    }),
  component: BlogIndex,
});

function BlogIndex() {
  const [lead, ...rest] = POSTS;
  return (
    <>
      <PageHero eyebrow="Knowledge centre" title="Guides for planning better celebrations" photo={IMG.mandapOutdoor} crumbs={[{ label: "Home", to: "/" }, { label: "Knowledge Centre" }]} />
      <section className="bg-paper py-20">
        <div className="container-x">
          <Reveal>
            <Link to="/blog/$slug" params={{ slug: lead.slug }} data-cursor="Read" className="group grid overflow-hidden rounded-[2rem] border bg-card lg:grid-cols-2">
              <div className="aspect-[16/11] overflow-hidden lg:aspect-auto"><Photo photo={lead.image} width={1100} className="img-zoom group-hover:scale-105" /></div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <p className="eyebrow text-primary">{lead.category} · {lead.readMinutes} min read</p>
                <h2 className="mt-4 text-4xl leading-tight">{lead.title}</h2>
                <p className="mt-4 text-muted-foreground">{lead.excerpt}</p>
                <span className="mt-8 inline-flex items-center gap-2 font-semibold text-primary">Read article <ArrowUpRight className="h-4 w-4" /></span>
              </div>
            </Link>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {rest.map((p, n) => (
              <Reveal key={p.slug} delay={n * 0.06}>
                <Link to="/blog/$slug" params={{ slug: p.slug }} data-cursor="Read" className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card">
                  <div className="aspect-[16/10] overflow-hidden"><Photo photo={p.image} width={700} className="img-zoom group-hover:scale-105" /></div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="eyebrow text-primary">{p.category} · {p.readMinutes} min</p>
                    <h3 className="mt-3 text-2xl leading-snug">{p.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{p.excerpt}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand photo={IMG.reception} />
    </>
  );
}
