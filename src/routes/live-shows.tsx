import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/site/Landing";
import { SectionHeading } from "@/components/site/sections";
import { ArtistCard, ArtistCategoryCard } from "@/components/site/cards";
import { Reveal } from "@/components/site/motion";
import { IMG } from "@/data/images";
import { ARTISTS, ARTIST_CATEGORIES } from "@/data/artists";
import { FAQS } from "@/data/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/live-shows")({
  head: () =>
    seo({
      title: "Celebrity Live Shows — Bollywood, Haryanvi & Bhojpuri Artists",
      description: "Celebrity live shows and stage productions by Gauri Entertainment: Bollywood, Haryanvi and Bhojpuri artists, dance acts, sound, light and stage — subject to artist availability.",
      path: "/live-shows",
      image: IMG.concert,
    }),
  component: LiveShowsPage,
});

function LiveShowsPage() {
  return (
    <Landing
      eyebrow="Live shows"
      title="Celebrity live shows that bring the crowd to its feet"
      text="Bollywood, Haryanvi and Bhojpuri performers, dance acts and full stage productions — for weddings, corporate nights, festivals and public events."
      photo={IMG.concert}
      crumbs={[{ label: "Home", to: "/" }, { label: "Live Shows" }]}
      introTitle="The show, and everything behind it"
      intro={[
        "A great live show depends on more than the artist. We take care of the full picture — the right performer for your audience, availability checks, technical riders, stage, sound and light, artist hospitality and show-day management.",
        "Every celebrity booking is subject to the artist's availability, fees and confirmation. We never promise an artist until their team has agreed to your date.",
      ]}
      introPhotos={[IMG.singerSilhouette, IMG.stageDancers]}
      serviceSlugs={["bollywood-celebrity-live-shows", "haryanvi-celebrity-live-shows", "bhojpuri-celebrity-live-shows", "celebrity-appearances", "stage-shows", "live-performances", "russian-dance-groups", "artist-management"]}
      featuresTitle="Live entertainment, professionally run"
      features={[
        { title: "Audience-first line-ups", text: "We suggest artists who suit your crowd, language and budget." },
        { title: "Honest availability", text: "We confirm with the artist's team before anything is promised." },
        { title: "Technical riders handled", text: "Stage, sound, lighting and backline planned to the artist's needs." },
        { title: "Artist hospitality", text: "Travel, stay, green rooms and on-ground coordination." },
        { title: "Run-of-show", text: "Timed sets, smooth transitions and a stage manager on the night." },
        { title: "Complete productions", text: "Add dancers, anchors, LED and special effects for a full show." },
      ]}
      storyPhoto={IMG.confettiStage}
      storyQuote="“The lights go down, the first note hits — and the whole crowd rises.”"
      faqs={FAQS.filter((f) => f.group === "Artists")}
      eventType="Celebrity Live Show"
      ctaMessage="Hello Gauri Entertainment! I'd like to book a celebrity live show. Could you please share details?"
      extra={
        <section className="grain bg-ink py-24">
          <div className="container-x">
            <SectionHeading tone="ink" eyebrow="Artists" title="Artists you can enquire about" text="Booking always subject to the artist's availability and confirmation." />
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {ARTISTS.map((a) => <Reveal key={a.slug}><ArtistCard artist={a} /></Reveal>)}
            </div>
            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
              {ARTIST_CATEGORIES.map((c) => <ArtistCategoryCard key={c.slug} category={c} />)}
            </div>
          </div>
        </section>
      }
    />
  );
}
