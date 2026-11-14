import { createFileRoute } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { PageHero } from "@/components/site/sections";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { WhatsAppIcon } from "@/components/site/WhatsAppFloat";
import { IMG } from "@/data/images";
import { PROCESS } from "@/data/content";
import { SITE } from "@/data/site";
import { waLink } from "@/lib/whatsapp";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/plan-your-event")({
  head: () =>
    seo({
      title: "Plan Your Event — Send an Enquiry on WhatsApp",
      description: "Tell Gauri Entertainment about your wedding, party, corporate event or live show. Share your date, location, guests, budget and services and send it straight to us on WhatsApp.",
      path: "/plan-your-event",
      image: IMG.floralAisle,
    }),
  component: PlanPage,
});

function PlanPage() {
  return (
    <>
      <PageHero eyebrow="Plan your event" title="Tell us about your celebration" text="The more you share, the better our first suggestions. Required fields are marked *." photo={IMG.floralAisle} crumbs={[{ label: "Home", to: "/" }, { label: "Plan Your Event" }]} />
      <section className="bg-paper py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-[2rem] border bg-card p-6 shadow-soft sm:p-10">
            <EnquiryForm />
          </div>
          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <a href={waLink()} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl bg-whatsapp p-5 text-whatsapp-foreground">
              <WhatsAppIcon className="h-9 w-9" />
              <span><span className="block text-xs font-semibold uppercase tracking-[0.2em] opacity-80">Prefer to chat?</span><span className="font-display text-xl">{SITE.phones[0].display}</span></span>
            </a>
            <a href={`tel:${SITE.phones[1].e164}`} className="flex items-center gap-4 rounded-2xl border bg-card p-5">
              <Phone className="h-5 w-5 text-primary" />
              <span><span className="block text-xs text-muted-foreground">Alternate number</span><span className="font-semibold">{SITE.phones[1].display}</span></span>
            </a>
            <div className="rounded-2xl border bg-card p-6">
              <h2 className="text-2xl">What happens next</h2>
              <ol className="mt-4 space-y-4">
                {PROCESS.map((p) => (
                  <li key={p.n} className="flex gap-4"><span className="font-display text-xl text-primary">{p.n}</span><span className="text-sm text-muted-foreground"><strong className="text-foreground">{p.title}.</strong> {p.text}</span></li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
