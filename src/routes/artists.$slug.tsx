import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle, ShieldCheck } from "lucide-react";
import { Breadcrumbs, CtaBand, SectionHeading } from "@/components/site/sections";
import { Photo, PhotoPlaceholder } from "@/components/site/Photo";
import { ArtistCard } from "@/components/site/cards";
import { ImageReveal, Reveal, SplitWords } from "@/components/site/motion";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Button } from "@/components/ui/button";
import { ARTISTS, getArtist, getArtistCategory } from "@/data/artists";
import { IMG } from "@/data/images";
import { availabilityMessage, waLink } from "@/lib/whatsapp";
import { breadcrumbLd, scripts, seo } from "@/lib/seo";

export const Route = createFileRoute("/artists/$slug")({
  loader: ({ params }) => {
    const artist = getArtist(params.slug);
    if (!artist) throw notFound();
    return { artist };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Artist not found | Gauri Entertainment" }, { name: "robots", content: "noindex" }] };
    const { artist } = loaderData;
    return {
      ...seo({
        title: `Book ${artist.name} — ${artist.role}`,
        description: `Enquire about booking ${artist.name} (${artist.role}) for your event through Gauri Entertainment. Subject to the artist's availability and confirmation.`,
        path: `/artists/${params.slug}`,
        image: artist.image,
        type: "profile",
      }),
      scripts: scripts(breadcrumbLd([{ name: "Home", path: "/" }, { name: "Artist Booking", path: "/artists" }, { name: artist.name, path: `/artists/${artist.slug}` }])),
    };
  },
  component: ArtistPage,
});

function ArtistPage() {
  const { artist } = Route.useLoaderData();
  const others = ARTISTS.filter((a) => a.slug !== artist.slug);
  return (
    <>
      <section className="grain relative overflow-hidden bg-ink pb-20 pt-36 text-ink-foreground">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Artist Booking", to: "/artists" }, { label: artist.name }]} />
            <p className="eyebrow mt-10 text-gold">{artist.role}</p>
            <h1 className="mt-4 text-6xl leading-none sm:text-8xl"><SplitWords text={artist.name} delay={0.1} /></h1>
            <Reveal delay={0.3}><p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-foreground/80">{artist.summary}</p></Reveal>
            <Reveal delay={0.4} className="mt-6 flex flex-wrap gap-2">
              {artist.categories.map((c) => {
                const cat = getArtistCategory(c);
                return cat ? <Link key={c} to="/artists" search={{ category: c }} className="rounded-full border border-ink-border px-3 py-1.5 text-xs font-semibold hover:border-gold hover:text-gold">{cat.name}</Link> : null;
              })}
            </Reveal>
            <Reveal delay={0.5} className="mt-10 flex flex-wrap gap-3">
              <Button asChild variant="whatsapp" size="xl"><a href={waLink(availabilityMessage(`${artist.name} (${artist.role})`))} target="_blank" rel="noreferrer"><MessageCircle /> Check availability</a></Button>
              <Button asChild variant="glass" size="xl"><a href="#enquire">Send full enquiry</a></Button>
            </Reveal>
          </div>
          <div>
            <ImageReveal className="aspect-[4/5] rounded-[2rem]">
              {artist.image ? <Photo photo={artist.image} priority width={900} /> : <PhotoPlaceholder name={artist.name} />}
            </ImageReveal>
            {artist.image?.credit && (
              <p className="mt-3 text-xs text-ink-muted">
                Photo: <a href={artist.image.creditUrl} target="_blank" rel="noreferrer" className="underline hover:text-gold">{artist.image.credit}</a>, {artist.image.license} via Wikimedia Commons.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-paper py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="text-4xl">About {artist.name}</h2>
            {artist.bio.map((p) => <Reveal key={p}><p className="mt-6 text-lg leading-relaxed text-muted-foreground">{p}</p></Reveal>)}
            <h3 className="mt-12 text-2xl">Performance formats</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {artist.knownFor.map((k) => <span key={k} className="rounded-full bg-secondary px-4 py-2 text-sm font-medium">{k}</span>)}
            </div>
          </div>
          <div className="self-start rounded-2xl border bg-card p-8">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <h3 className="mt-4 text-2xl">How artist booking works</h3>
            <ol className="mt-5 space-y-4 text-sm text-muted-foreground">
              <li><strong className="text-foreground">1. Enquire</strong> — share your date, city, event type and budget.</li>
              <li><strong className="text-foreground">2. Availability check</strong> — we contact the artist's team for your date.</li>
              <li><strong className="text-foreground">3. Terms</strong> — we share fees, performance length and technical needs.</li>
              <li><strong className="text-foreground">4. Confirmation</strong> — the booking is confirmed only once the artist's team agrees in writing.</li>
            </ol>
            <p className="mt-6 text-xs text-muted-foreground">Gauri Entertainment does not claim exclusive representation of this artist. Availability is never guaranteed until confirmed.</p>
          </div>
        </div>
      </section>

      <section id="enquire" className="scroll-mt-24 bg-card py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Enquire" title={`Request ${artist.name} for your event`} text="Fill in your event details — they'll open in WhatsApp, ready to send." />
          <div className="rounded-[2rem] border bg-background p-6 shadow-soft sm:p-10">
            <EnquiryForm defaultEventType="Celebrity Live Show" defaultServices={["Celebrity artist / live show"]} />
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="bg-paper py-20">
          <div className="container-x">
            <div className="flex items-end justify-between">
              <h2 className="text-3xl">More artists</h2>
              <Link to="/artists" className="inline-flex items-center gap-2 font-semibold text-primary"><ArrowLeft className="h-4 w-4" /> All artists</Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{others.map((a) => <ArtistCard key={a.slug} artist={a} />)}</div>
          </div>
        </section>
      )}
      <CtaBand photo={IMG.concert} />
    </>
  );
}
