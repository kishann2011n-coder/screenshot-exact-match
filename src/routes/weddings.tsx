import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/site/Landing";
import { Photo } from "@/components/site/Photo";
import { SectionHeading } from "@/components/site/sections";
import { Reveal } from "@/components/site/motion";
import { IMG } from "@/data/images";
import { FAQS } from "@/data/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/weddings")({
  head: () =>
    seo({
      title: "Wedding Planner & Organiser in Delhi — Haldi, Mehndi, Sangeet, Reception",
      description: "Complete wedding planning by Gauri Entertainment: haldi, mehndi raat, sangeet, pheras and reception — décor, catering, artists, dance groups and on-day coordination in Delhi NCR.",
      path: "/weddings",
      image: IMG.mandap,
    }),
  component: WeddingsPage,
});

const FUNCTIONS = [
  { name: "Roka & Engagement", text: "Intimate décor, ring ceremony stage and family dinners.", photo: IMG.toast },
  { name: "Haldi", text: "Sunny marigold setups, dhol and plenty of laughter.", photo: IMG.haldi },
  { name: "Mehndi Raat", text: "Mehndi artists, folk music and colourful florals.", photo: IMG.mehndiGroup },
  { name: "Sangeet", text: "Stage, lights, choreography and headline performers.", photo: IMG.sangeet },
  { name: "Pheras", text: "Mandap design and a ritual timeline that runs on time.", photo: IMG.mandapOutdoor },
  { name: "Reception", text: "Couple's stage, live music and an elegant dinner.", photo: IMG.reception },
];

function WeddingsPage() {
  return (
    <Landing
      eyebrow="Weddings"
      title="Weddings, planned function by function"
      text="From the first haldi to the last dance at the reception — décor, food, entertainment and coordination, handled by one team."
      photo={IMG.mandap}
      crumbs={[{ label: "Home", to: "/" }, { label: "Weddings" }]}
      introTitle="Every ritual, every guest, every moment"
      intro={[
        "Indian weddings are made of many celebrations, each with its own mood. We plan the full sequence with your family — agreeing on guest counts, budgets and timelines for each function — then coordinate every vendor so the days flow smoothly.",
        "Choose complete wedding planning, or pick the parts you need: décor, catering, sangeet entertainment, dance groups or artist bookings.",
      ]}
      introPhotos={[IMG.bride, IMG.henna]}
      serviceSlugs={["wedding-planning", "mehndi-raat", "wedding-decoration", "catering-services", "indian-dance-groups", "live-singers", "bollywood-celebrity-live-shows", "dance-classes"]}
      featuresTitle="Calm planning for the busiest days of your life"
      features={[
        { title: "Function-wise timelines", text: "A clear plan for every function, shared with the family so everyone knows what happens when." },
        { title: "One coordination team", text: "We liaise with venues, caterers, decorators and artists so you don't have to." },
        { title: "Entertainment built in", text: "Sangeet choreography, dance groups, live singers and celebrity artists, all from one team." },
        { title: "Décor for each mood", text: "Bright for haldi, colourful for mehndi, glamorous for sangeet, elegant for the reception." },
        { title: "Food guests remember", text: "Menus planned around your guests, with live counters and dessert spreads." },
        { title: "Budget clarity", text: "Options at different price points, so you decide where it matters most." },
      ]}
      storyPhoto={IMG.receptionOutdoor}
      storyQuote="“A wedding should feel effortless for the family — that is the work we do behind the scenes.”"
      faqs={FAQS.filter((f) => f.group === "Planning" || f.group === "Booking").slice(0, 4)}
      eventType="Wedding"
      ctaMessage="Hello Gauri Entertainment! I'd like to plan a wedding. Could you please share details?"
      extra={
        <section className="bg-card py-24">
          <div className="container-x">
            <SectionHeading eyebrow="Wedding functions" title="From haldi to reception" />
            <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:thin]">
              {FUNCTIONS.map((f, n) => (
                <Reveal key={f.name} delay={n * 0.05} className="w-[78vw] shrink-0 snap-start sm:w-[24rem]">
                  <div className="group overflow-hidden rounded-2xl border bg-background">
                    <div className="aspect-[4/5] overflow-hidden"><Photo photo={f.photo} width={700} className="img-zoom group-hover:scale-105" /></div>
                    <div className="p-6">
                      <span className="font-display text-sm italic text-primary">Function 0{n + 1}</span>
                      <h3 className="mt-2 text-2xl">{f.name}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      }
    />
  );
}
