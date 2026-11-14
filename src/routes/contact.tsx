import { createFileRoute } from "@tanstack/react-router";
import { Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero, MapEmbed, SectionHeading } from "@/components/site/sections";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Reveal } from "@/components/site/motion";
import { IMG } from "@/data/images";
import { SITE } from "@/data/site";
import { waLink } from "@/lib/whatsapp";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo({
      title: "Contact Gauri Entertainment — Sarai Rohilla, Delhi · WhatsApp +91 76784 87866",
      description: "Contact Gauri Entertainment at 118.2, East Moti Bagh, Sarai Rohilla, Delhi 110007. Call or WhatsApp +91 76784 87866 or +91 85879 75898.",
      path: "/contact",
      image: IMG.toast,
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's talk about your event" text="Call, WhatsApp or visit us in Sarai Rohilla, Delhi." photo={IMG.toast} crumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]} />
      <section className="bg-paper py-20">
        <div className="container-x grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Reveal>
            <a href={waLink()} target="_blank" rel="noreferrer" className="flex h-full flex-col rounded-2xl bg-whatsapp p-6 text-whatsapp-foreground transition hover:brightness-110">
              <MessageCircle className="h-7 w-7" />
              <span className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] opacity-80">WhatsApp</span>
              <span className="mt-1 font-display text-2xl">{SITE.phones[0].display}</span>
            </a>
          </Reveal>
          {SITE.phones.map((p, n) => (
            <Reveal key={p.e164} delay={0.05 * (n + 1)}>
              <a href={`tel:${p.e164}`} className="flex h-full flex-col rounded-2xl border bg-card p-6 transition hover:border-primary">
                <Phone className="h-7 w-7 text-primary" />
                <span className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Call · {p.label}</span>
                <span className="mt-1 font-display text-2xl">{p.display}</span>
              </a>
            </Reveal>
          ))}
          <Reveal delay={0.15}>
            <a href={SITE.instagram.url} target="_blank" rel="noreferrer" className="flex h-full flex-col rounded-2xl border bg-card p-6 transition hover:border-primary">
              <Instagram className="h-7 w-7 text-primary" />
              <span className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Instagram</span>
              <span className="mt-1 break-all font-display text-xl">@{SITE.instagram.handle}</span>
            </a>
          </Reveal>
        </div>

        <div className="container-x mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="rounded-2xl border bg-card p-6">
              <div className="flex gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <h2 className="text-2xl">Visit us</h2>
                  <address className="mt-2 not-italic text-muted-foreground">{SITE.address.full}</address>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapQuery)}`} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-semibold text-primary underline">Get directions</a>
                </div>
              </div>
            </div>
            <MapEmbed query={SITE.address.full} className="mt-4 h-[26rem]" />
          </div>
          <div className="rounded-[2rem] border bg-card p-6 shadow-soft sm:p-10">
            <SectionHeading eyebrow="Send an enquiry" title="Tell us what you're planning" />
            <div className="mt-8"><EnquiryForm /></div>
          </div>
        </div>
      </section>
    </>
  );
}
