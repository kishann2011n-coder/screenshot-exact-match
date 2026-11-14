import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { PageHero, CtaBand, SectionHeading, FaqList, type Crumb } from "./sections";
import { ServiceCard } from "./cards";
import { Photo } from "./Photo";
import { ImageReveal, Parallax, Reveal } from "./motion";
import { EnquiryForm } from "./EnquiryForm";
import { Button } from "@/components/ui/button";
import { getService } from "@/data/services";
import type { Photo as PhotoT } from "@/data/images";
import type { Faq } from "@/data/content";
import { waLink } from "@/lib/whatsapp";

export type LandingProps = {
  eyebrow: string;
  title: string;
  text: string;
  photo: PhotoT;
  crumbs: Crumb[];
  introTitle: string;
  intro: string[];
  introPhotos: [PhotoT, PhotoT];
  serviceSlugs: string[];
  features: { title: string; text: string }[];
  featuresTitle: string;
  storyPhoto: PhotoT;
  storyQuote: string;
  faqs: Faq[];
  eventType: string;
  ctaMessage: string;
  extra?: ReactNode;
};

export function Landing(p: LandingProps) {
  const services = p.serviceSlugs.map(getService).filter((s): s is NonNullable<typeof s> => Boolean(s));
  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} text={p.text} photo={p.photo} crumbs={p.crumbs} size="lg">
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="hero" size="xl"><a href="#enquire">Plan with us <ArrowUpRight /></a></Button>
          <Button asChild variant="whatsapp" size="xl"><a href={waLink(p.ctaMessage)} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp</a></Button>
        </div>
      </PageHero>

      <section className="bg-paper py-24">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Our approach" title={p.introTitle} />
            {p.intro.map((t) => (
              <Reveal key={t}><p className="mt-6 text-lg leading-relaxed text-muted-foreground">{t}</p></Reveal>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ImageReveal className="mt-16 aspect-[3/4] rounded-2xl"><Photo photo={p.introPhotos[0]} width={700} /></ImageReveal>
            <ImageReveal delay={0.15} className="aspect-[3/4] rounded-2xl"><Photo photo={p.introPhotos[1]} width={700} /></ImageReveal>
          </div>
        </div>
      </section>

      {p.extra}

      <section className="bg-card py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Services" title="What we can arrange" action={<Button asChild variant="line" size="pill"><Link to="/services">All services <ArrowUpRight /></Link></Button>} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
          </div>
        </div>
      </section>

      <section className="relative">
        <Parallax className="h-[70svh] min-h-[28rem]" amount={80}>
          <Photo photo={p.storyPhoto} sizes="100vw" width={1800} />
        </Parallax>
        <div className="absolute inset-0 bg-ink/55" />
        <div className="container-x absolute inset-0 flex items-center">
          <Reveal><p className="max-w-4xl font-display text-4xl italic leading-tight text-ink-foreground sm:text-6xl">{p.storyQuote}</p></Reveal>
        </div>
      </section>

      <section className="grain bg-ink py-24">
        <div className="container-x">
          <SectionHeading tone="ink" eyebrow="Why plan with us" title={p.featuresTitle} />
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink-border bg-ink-border md:grid-cols-3">
            {p.features.map((f, n) => (
              <Reveal key={f.title} delay={n * 0.05} className="bg-ink p-8">
                <span className="font-display text-sm italic text-gold">0{n + 1}</span>
                <h3 className="mt-3 text-2xl text-ink-foreground">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{f.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="enquire" className="scroll-mt-24 bg-paper py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading eyebrow="Enquire" title="Let's start planning" text="Send your details on WhatsApp — we'll reply with ideas, options and availability." />
            <div className="mt-10"><FaqList faqs={p.faqs} /></div>
          </div>
          <div className="self-start rounded-[2rem] border bg-card p-6 shadow-soft sm:p-10">
            <EnquiryForm defaultEventType={p.eventType} />
          </div>
        </div>
      </section>
      <CtaBand photo={p.photo} message={p.ctaMessage} />
    </>
  );
}
