import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/site/sections";
import { Reveal } from "@/components/site/motion";
import { IMG } from "@/data/images";
import { isValidIndianPhone, waLink } from "@/lib/whatsapp";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/partner")({
  head: () =>
    seo({
      title: "Vendors, Artists & Partners — Work with Gauri Entertainment",
      description: "Decorators, caterers, artists, dance groups, sound and light vendors and venues: send a partnership enquiry to Gauri Entertainment on WhatsApp.",
      path: "/partner",
      image: IMG.stage,
    }),
  component: PartnerPage,
});

const TYPES = ["Artist / Performer", "Dance group", "Decorator / Florist", "Caterer", "Sound, light & stage", "Venue", "Photographer / Videographer", "Other vendor"];
const field = "h-12 w-full rounded-xl border border-input bg-card px-4 text-base outline-none focus:border-ring focus:ring-2 focus:ring-ring/30 aria-[invalid=true]:border-destructive";

function PartnerPage() {
  const [v, setV] = useState({ name: "", business: "", phone: "", type: "", city: "", portfolio: "", about: "" });
  const [errors, setErrors] = useState<{ name?: string; phone?: string; type?: string }>({});
  const [done, setDone] = useState<null | { ok: boolean; href: string }>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { name?: string; phone?: string; type?: string } = {};
    if (v.name.trim().length < 2) errs.name = "Please enter your name.";
    if (!isValidIndianPhone(v.phone)) errs.phone = "Please enter a valid 10-digit mobile number.";
    if (!v.type) errs.type = "Please choose a category.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const msg = [
      "Hello Gauri Entertainment! I'd like to partner with you.",
      "",
      `*Name:* ${v.name}`,
      v.business && `*Business:* ${v.business}`,
      `*Phone:* ${v.phone}`,
      `*Category:* ${v.type}`,
      v.city && `*City:* ${v.city}`,
      v.portfolio && `*Portfolio / Instagram:* ${v.portfolio}`,
      v.about && `\n*About:* ${v.about}`,
    ].filter(Boolean).join("\n");
    const href = waLink(msg);
    const w = window.open(href, "_blank");
    if (w) w.opener = null;
    setDone({ ok: !!w, href });
  };

  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setV((s) => ({ ...s, [k]: e.target.value }));

  return (
    <>
      <PageHero eyebrow="Vendors & partners" title="Grow with Gauri Entertainment" text="We work with talented artists, decorators, caterers and production partners. Introduce yourself below." photo={IMG.stage} crumbs={[{ label: "Home", to: "/" }, { label: "Partner with us" }]} />
      <section className="bg-paper py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading eyebrow="Who we work with" title="Partners who care about the details" />
            <ul className="mt-8 flex flex-wrap gap-2">{TYPES.map((t) => <li key={t} className="rounded-full bg-secondary px-4 py-2 text-sm">{t}</li>)}</ul>
          </div>
          <Reveal className="rounded-[2rem] border bg-card p-6 shadow-soft sm:p-10">
            <form noValidate onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
              <F label="Your name *" err={errors.name}><input value={v.name} onChange={set("name")} aria-invalid={!!errors.name} className={field} /></F>
              <F label="Business name"><input value={v.business} onChange={set("business")} className={field} /></F>
              <F label="Phone / WhatsApp *" err={errors.phone}><input type="tel" value={v.phone} onChange={set("phone")} aria-invalid={!!errors.phone} className={field} /></F>
              <F label="Category *" err={errors.type}>
                <select value={v.type} onChange={set("type")} aria-invalid={!!errors.type} className={field}><option value="">Choose</option>{TYPES.map((t) => <option key={t}>{t}</option>)}</select>
              </F>
              <F label="City"><input value={v.city} onChange={set("city")} className={field} /></F>
              <F label="Portfolio or Instagram link"><input value={v.portfolio} onChange={set("portfolio")} className={field} /></F>
              <F label="About your work" className="sm:col-span-2"><textarea rows={4} value={v.about} onChange={set("about")} className={cn(field, "h-auto py-3")} /></F>
              <div className="sm:col-span-2">
                <button type="submit" className="inline-flex h-13 items-center gap-2 rounded-full bg-whatsapp px-8 font-semibold text-whatsapp-foreground hover:brightness-110"><Send className="h-4 w-4" /> Send via WhatsApp</button>
                <div aria-live="polite" className="mt-4">
                  {done?.ok && <p className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-success" /> WhatsApp opened — press send there to share your details.</p>}
                  {done && !done.ok && <p className="flex items-center gap-2 text-sm text-destructive"><AlertCircle className="h-4 w-4" /> WhatsApp was blocked. <a href={done.href} target="_blank" rel="noreferrer" className="font-semibold underline">Open it here</a>.</p>}
                </div>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function F({ label, err, className, children }: { label: string; err?: string | undefined; className?: string; children: React.ReactNode }) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-2 block text-sm font-semibold">{label}</span>
      {children}
      {err && <span className="mt-1.5 block text-xs font-medium text-destructive">{err}</span>}
    </label>
  );
}
