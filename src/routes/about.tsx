import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Instagram, MapPin } from "lucide-react";
import { PageHero, CtaBand, SectionHeading } from "@/components/site/sections";
import { Photo } from "@/components/site/Photo";
import { ImageReveal, Reveal } from "@/components/site/motion";
import { Button } from "@/components/ui/button";
import { IMG } from "@/data/images";
import { CATEGORIES, servicesIn } from "@/data/services";
import { PROCESS, WHY_US } from "@/data/content";
import { SITE } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    seo({
      title: "About Gauri Entertainment — Event Management & Entertainment, Delhi",
      description: "Gauri Entertainment is an event management and entertainment company in Sarai Rohilla, Delhi — weddings, celebrations, corporate events, celebrity live shows, dance, décor and catering.",
      path: "/about",
      image: IMG.sangeet,
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="We create celebrations people talk about for years"
        text="Gauri Entertainment is a Delhi-based event management and entertainment company. We bring together planning, performers, décor and food so every occasion feels complete."
        photo={IMG.sangeet}
        crumbs={[{ label: "Home", to: "/" }, { label: "About Us" }]}
      />

      <section className="bg-paper py-24">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Who we are" title="Event planners with entertainment at heart" />
            <Reveal><p className="mt-6 text-lg leading-relaxed text-muted-foreground">We work across the full spectrum of celebrations — weddings and mehndi raats, birthdays and baby showers, anniversaries and religious events, conferences and corporate nights. What sets us apart is entertainment: celebrity live shows, artist booking, dance groups and live music are at the centre of what we do.</p></Reveal>
            <Reveal><p className="mt-6 text-lg leading-relaxed text-muted-foreground">We also run dance classes and a singing school, so music and movement are part of our everyday work — not just our events.</p></Reveal>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm"><MapPin className="h-4 w-4 text-primary" /> {SITE.address.full}</span>
              <a href={SITE.instagram.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm hover:text-primary"><Instagram className="h-4 w-4 text-primary" /> @{SITE.instagram.handle}</a>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4">
            <ImageReveal className="col-span-3 aspect-[3/4] rounded-2xl"><Photo photo={IMG.classicalDancer} width={800} /></ImageReveal>
            <div className="col-span-2 grid gap-4">
              <ImageReveal delay={0.1} className="aspect-square rounded-2xl"><Photo photo={IMG.mehndiMarigold} width={500} /></ImageReveal>
              <ImageReveal delay={0.2} className="aspect-square rounded-2xl"><Photo photo={IMG.mic} width={500} /></ImageReveal>
            </div>
          </div>
        </div>
      </section>

      <section className="grain bg-ink py-24">
        <div className="container-x">
          <SectionHeading tone="ink" eyebrow="What we do" title="Four areas of expertise" />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((c, n) => (
              <Reveal key={c.slug} delay={n * 0.06}>
                <Link to="/services" search={{ category: c.slug }} className="group block overflow-hidden rounded-2xl border border-ink-border">
                  <div className="aspect-[4/3] overflow-hidden"><Photo photo={c.image} width={700} className="img-zoom group-hover:scale-110" /></div>
                  <div className="p-6">
                    <h3 className="text-2xl text-ink-foreground">{c.name}</h3>
                    <p className="mt-2 text-sm text-ink-muted">{servicesIn(c.slug).length} services · {c.short}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-24">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Our values" title="How we work" />
            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2">
              {WHY_US.map((w) => (
                <div key={w.title} className="bg-card p-6">
                  <h3 className="text-xl">{w.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{w.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Process" title="Working with us" />
            <ol className="mt-10">
              {PROCESS.map((p) => (
                <li key={p.n} className="flex gap-6 border-b py-6">
                  <span className="font-display text-4xl font-light text-primary">{p.n}</span>
                  <div><h3 className="text-xl">{p.title}</h3><p className="mt-1 text-sm text-muted-foreground">{p.text}</p></div>
                </li>
              ))}
            </ol>
            <Button asChild variant="sindoor" size="xl" className="mt-10"><Link to="/plan-your-event">Start planning <ArrowUpRight /></Link></Button>
          </div>
        </div>
      </section>
      <CtaBand photo={IMG.reception} />
    </>
  );
}
