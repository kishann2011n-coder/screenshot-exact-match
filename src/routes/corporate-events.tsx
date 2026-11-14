import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/site/Landing";
import { SectionHeading } from "@/components/site/sections";
import { Reveal } from "@/components/site/motion";
import { IMG } from "@/data/images";
import { FAQS } from "@/data/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/corporate-events")({
  head: () =>
    seo({
      title: "Corporate Event Management in Delhi — Annual Days, Launches & Conferences",
      description: "Corporate event management by Gauri Entertainment: annual days, award nights, product launches, conferences and festive parties — stage, AV, entertainment, décor and catering.",
      path: "/corporate-events",
      image: IMG.conference,
    }),
  component: CorporatePage,
});

const FORMATS = [
  "Annual days & award nights",
  "Product & brand launches",
  "Conferences & seminars",
  "Dealer & channel-partner meets",
  "Diwali & year-end parties",
  "Team celebrations & family days",
  "Store openings with celebrity appearances",
  "Rewards & recognition evenings",
];

function CorporatePage() {
  return (
    <Landing
      eyebrow="Corporate events"
      title="Corporate events that reflect your brand"
      text="Annual days, launches, conferences and celebrations — staged, hosted and entertained by one accountable team."
      photo={IMG.conference}
      crumbs={[{ label: "Home", to: "/" }, { label: "Corporate Events" }]}
      introTitle="Professional on stage, effortless for your team"
      intro={[
        "Corporate events have to deliver a message and give people a great time. We plan the agenda, stage, AV, branding, entertainment and hospitality together, so the programme runs to the minute and the evening ends on a high.",
        "From a single headline performer to a fully produced annual day, we scale to your brief and budget.",
      ]}
      introPhotos={[IMG.seminar, IMG.corporateParty]}
      serviceSlugs={["corporate-events", "conference-events", "stage-shows", "celebrity-appearances", "bollywood-celebrity-live-shows", "music-stage-performances", "event-decoration", "catering-services"]}
      featuresTitle="Built for business, designed to delight"
      features={[
        { title: "Single point of contact", text: "One coordinator for stage, AV, entertainment, décor and food." },
        { title: "Run-of-show discipline", text: "Tight timings for speeches, awards and performances." },
        { title: "Brand-led staging", text: "Stage and LED content designed around your brand and theme." },
        { title: "Entertainment for every audience", text: "Bands, celebrity singers, dance acts, anchors and DJs." },
        { title: "Hospitality that impresses", text: "Smooth registration, seating and well-timed food service." },
        { title: "Clear quotations", text: "Transparent costing so finance teams can sign off quickly." },
      ]}
      storyPhoto={IMG.crowd}
      storyQuote="“The best corporate events feel like a celebration of the people who built the year.”"
      faqs={FAQS.filter((f) => f.group === "Planning" || f.group === "Booking").slice(0, 4)}
      eventType="Corporate Event"
      ctaMessage="Hello Gauri Entertainment! I'd like to plan a corporate event. Could you please share details?"
      extra={
        <section className="bg-card py-24">
          <div className="container-x">
            <SectionHeading eyebrow="Event formats" title="Corporate occasions we organise" />
            <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {FORMATS.map((f, n) => (
                <Reveal as="li" key={f} delay={n * 0.04} className="group bg-background p-7 transition hover:bg-ink">
                  <span className="font-display text-sm italic text-primary group-hover:text-gold">0{n + 1}</span>
                  <p className="mt-3 font-display text-xl group-hover:text-ink-foreground">{f}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      }
    />
  );
}
