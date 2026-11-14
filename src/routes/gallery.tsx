import { createFileRoute } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { PageHero, CtaBand } from "@/components/site/sections";
import { Gallery } from "@/components/site/Gallery";
import { IMG } from "@/data/images";
import { SITE } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/gallery")({
  head: () =>
    seo({
      title: "Event Gallery — Weddings, Live Shows, Décor & Dance",
      description: "Browse the Gauri Entertainment event gallery: weddings, celebrity live shows, corporate events, celebrations, décor, dance and cultural events.",
      path: "/gallery",
      image: IMG.bride,
    }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <>
      <PageHero eyebrow="Gallery" title="A world of colour, music and celebration" text="Filter by occasion and open any photo full-screen." photo={IMG.bride} crumbs={[{ label: "Home", to: "/" }, { label: "Gallery" }]} />
      <section className="bg-paper py-16">
        <div className="container-x">
          <Gallery />
          <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-2xl border bg-card p-6 sm:flex-row sm:items-center">
            <p className="text-sm text-muted-foreground">Gallery shows representative event photography from Unsplash. For our latest work, follow us on Instagram.</p>
            <a href={SITE.instagram.url} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold hover:border-primary hover:text-primary">
              <Instagram className="h-4 w-4" /> @{SITE.instagram.handle}
            </a>
          </div>
        </div>
      </section>
      <CtaBand photo={IMG.holi} />
    </>
  );
}
