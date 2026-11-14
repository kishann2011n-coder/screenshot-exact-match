import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CtaBand, FaqList } from "@/components/site/sections";
import { IMG } from "@/data/images";
import { FAQS, type Faq } from "@/data/content";
import { scripts, seo } from "@/lib/seo";

const GROUPS: Faq["group"][] = ["Booking", "Planning", "Artists", "Services"];

export const Route = createFileRoute("/faq")({
  head: () => ({
    ...seo({
      title: "FAQs — Booking, Event Planning & Artist Availability",
      description: "Answers to common questions about booking Gauri Entertainment, event planning, celebrity artist availability, décor, catering, dance classes and service areas.",
      path: "/faq",
      image: IMG.diyas,
    }),
    scripts: scripts({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    }),
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <PageHero eyebrow="FAQs" title="Frequently asked questions" text="Can't find your answer? Message us on WhatsApp — we're happy to help." photo={IMG.diyas} crumbs={[{ label: "Home", to: "/" }, { label: "FAQs" }]} />
      <section className="bg-paper py-20">
        <div className="container-x grid gap-16 lg:grid-cols-[14rem_1fr]">
          <nav aria-label="FAQ sections" className="lg:sticky lg:top-28 lg:self-start">
            <ul className="flex flex-wrap gap-2 lg:flex-col">
              {GROUPS.map((g) => (
                <li key={g}><a href={`#${g.toLowerCase()}`} className="block rounded-full border px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary lg:rounded-xl">{g}</a></li>
              ))}
            </ul>
          </nav>
          <div className="space-y-16">
            {GROUPS.map((g) => (
              <div key={g} id={g.toLowerCase()} className="scroll-mt-28">
                <h2 className="text-3xl">{g}</h2>
                <div className="mt-4"><FaqList faqs={FAQS.filter((f) => f.group === g)} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand photo={IMG.mandap} />
    </>
  );
}
