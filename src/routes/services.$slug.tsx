import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight, Check, MessageCircle } from "lucide-react";
import { PageHero, CtaBand, SectionHeading, FaqList } from "@/components/site/sections";
import { ServiceCard } from "@/components/site/cards";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Photo } from "@/components/site/Photo";
import { ImageReveal, Reveal } from "@/components/site/motion";
import { Button } from "@/components/ui/button";
import { getCategory, getService, SERVICES } from "@/data/services";
import { FAQS, PROCESS } from "@/data/content";
import { availabilityMessage, waLink } from "@/lib/whatsapp";
import { breadcrumbLd, scripts, seo, serviceLd } from "@/lib/seo";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Service not found | Gauri Entertainment" }, { name: "robots", content: "noindex" }] };
    const { service } = loaderData;
    const cat = getCategory(service.category)?.name ?? "";
    return {
      ...seo({ title: service.seoTitle, description: `${service.short} ${service.intro.slice(0, 110)}…`, path: `/services/${params.slug}`, image: service.image }),
      scripts: scripts(
        serviceLd(service.name, service.intro, cat),
        breadcrumbLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: service.name, path: `/services/${service.slug}` }]),
      ),
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const { service } = Route.useLoaderData();
  const category = getCategory(service.category)!;
  const related = SERVICES.filter((s) => s.category === service.category && s.slug !== service.slug).slice(0, 4);
  const faqs = FAQS.filter((f) => (service.category === "entertainment" || service.category === "dance-music" ? f.group === "Artists" || f.group === "Booking" : f.group === "Planning" || f.group === "Booking")).slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow={category.name}
        title={service.seoTitle}
        text={service.short}
        photo={service.image}
        crumbs={[{ label: "Home", to: "/" }, { label: "Services", to: "/services" }, { label: service.name }]}
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="hero" size="xl"><a href="#enquire">Enquire now <ArrowUpRight /></a></Button>
          <Button asChild variant="whatsapp" size="xl"><a href={waLink(availabilityMessage(service.name))} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp</a></Button>
        </div>
      </PageHero>

      <section className="bg-paper py-20">
        <div className="container-x grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <h2 className="text-3xl sm:text-4xl">About our {service.name.toLowerCase()} service</h2>
            <Reveal><p className="mt-6 text-lg leading-relaxed text-muted-foreground">{service.intro}</p></Reveal>

            <h3 className="mt-12 text-2xl">What's included</h3>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.includes.map((it, n) => (
                <Reveal as="li" key={it} delay={n * 0.04} className="flex items-start gap-3 rounded-xl border bg-card p-4">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="h-3.5 w-3.5" /></span>
                  <span className="text-sm">{it}</span>
                </Reveal>
              ))}
            </ul>

            <h3 className="mt-12 text-2xl">Ideal for</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {service.idealFor.map((t) => <span key={t} className="rounded-full bg-secondary px-4 py-2 text-sm font-medium">{t}</span>)}
            </div>
          </div>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ImageReveal className="aspect-[4/5] rounded-2xl">
              <Photo photo={service.image} width={900} />
            </ImageReveal>
            <p className="mt-3 text-xs text-muted-foreground">Representative photography.</p>
          </div>
        </div>
      </section>

      <section className="grain bg-ink py-20">
        <div className="container-x">
          <SectionHeading tone="ink" eyebrow="How it works" title="From first message to final moment" />
          <ol className="mt-12 grid gap-4 md:grid-cols-4">
            {PROCESS.map((p, n) => (
              <Reveal as="li" key={p.n} delay={n * 0.08} className="rounded-2xl border border-ink-border p-6">
                <span className="font-display text-4xl font-light text-gold">{p.n}</span>
                <h3 className="mt-4 text-xl text-ink-foreground">{p.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{p.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="enquire" className="scroll-mt-24 bg-paper py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading eyebrow="Enquire" title={`Plan your ${service.name.toLowerCase()}`} text="Share a few details and send them to us on WhatsApp. We'll reply with options and availability." />
            {faqs.length > 0 && <div className="mt-10"><FaqList faqs={faqs} /></div>}
          </div>
          <div className="rounded-[2rem] border bg-card p-6 shadow-soft sm:p-10">
            <EnquiryForm defaultEventType="" />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-card py-20">
          <div className="container-x">
            <SectionHeading eyebrow={category.name} title="Related services" action={<Link to="/services" search={{ category: category.slug }} className="font-semibold text-primary link-underline">See all</Link>} />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((s) => <ServiceCard key={s.slug} service={s} />)}
            </div>
          </div>
        </section>
      )}
      <CtaBand photo={category.image} message={availabilityMessage(service.name)} />
    </>
  );
}
