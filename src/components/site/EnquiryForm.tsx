import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, CheckCircle2, MessageCircle, Send } from "lucide-react";
import { enquiryMessage, validateEnquiry, waLink, type Enquiry, type EnquiryErrors } from "@/lib/whatsapp";
import { SITE } from "@/data/site";
import { cn } from "@/lib/utils";

export const EVENT_TYPES = [
  "Wedding",
  "Mehndi / Mehndi Raat",
  "Corporate Event",
  "Conference",
  "Birthday Party",
  "Children's Event",
  "Baby Shower",
  "Anniversary",
  "Religious Event",
  "Bar / Bat Mitzvah",
  "Celebrity Live Show",
  "Stage Show",
  "Other",
];

export const BUDGETS = ["Under ₹1 lakh", "₹1 – 3 lakh", "₹3 – 5 lakh", "₹5 – 10 lakh", "₹10 – 25 lakh", "₹25 lakh +", "Not sure yet"];

export const SERVICE_OPTIONS = [
  "Complete event planning",
  "Decoration",
  "Catering",
  "Celebrity artist / live show",
  "Live singer",
  "Dance group",
  "DJ, sound & lights",
  "Stage show production",
  "Anchor / host",
  "Dance or sangeet choreography",
];

type Status = { kind: "idle" } | { kind: "opened"; href: string } | { kind: "blocked"; href: string } | { kind: "invalid" };

const field =
  "h-12 w-full rounded-xl border border-input bg-card px-4 text-base text-card-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30 aria-[invalid=true]:border-destructive";

export function EnquiryForm({ defaultEventType = "", defaultServices = [], className }: { defaultEventType?: string; defaultServices?: string[]; className?: string }) {
  const [values, setValues] = useState<Enquiry>({
    fullName: "",
    phone: "",
    eventType: defaultEventType,
    eventDate: "",
    location: "",
    guests: "",
    budget: "",
    services: defaultServices,
    notes: "",
  });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const set = <K extends keyof Enquiry>(k: K, v: Enquiry[K]) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const toggleService = (s: string) =>
    set("services", values.services?.includes(s) ? values.services.filter((x) => x !== s) : [...(values.services ?? []), s]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateEnquiry(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setStatus({ kind: "invalid" });
      const first = Object.keys(errs)[0];
      document.getElementById(`enq-${first}`)?.focus();
      return;
    }
    const href = waLink(enquiryMessage(values));
    const win = window.open(href, "_blank");
    if (win) {
      win.opener = null;
      setStatus({ kind: "opened", href });
    } else {
      setStatus({ kind: "blocked", href });
    }
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <form noValidate onSubmit={onSubmit} className={cn("grid gap-5", className)} aria-describedby="enq-status">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="fullName" label="Full name" required error={errors.fullName}>
          <input id="enq-fullName" autoComplete="name" value={values.fullName} onChange={(e) => set("fullName", e.target.value)} aria-invalid={!!errors.fullName} className={field} placeholder="Your name" />
        </Field>
        <Field id="phone" label="Phone number" required error={errors.phone}>
          <input id="enq-phone" type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={(e) => set("phone", e.target.value)} aria-invalid={!!errors.phone} className={field} placeholder="10-digit mobile number" />
        </Field>
        <Field id="eventType" label="Event type" required error={errors.eventType}>
          <select id="enq-eventType" value={values.eventType} onChange={(e) => set("eventType", e.target.value)} aria-invalid={!!errors.eventType} className={field}>
            <option value="">Choose event type</option>
            {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>
        <Field id="eventDate" label="Event date">
          <input id="enq-eventDate" type="date" min={today} value={values.eventDate} onChange={(e) => set("eventDate", e.target.value)} className={field} />
        </Field>
        <Field id="location" label="Event location">
          <input id="enq-location" value={values.location} onChange={(e) => set("location", e.target.value)} className={field} placeholder="City / venue" />
        </Field>
        <Field id="guests" label="Expected guests" error={errors.guests}>
          <input id="enq-guests" inputMode="numeric" value={values.guests} onChange={(e) => set("guests", e.target.value.replace(/[^\d]/g, ""))} aria-invalid={!!errors.guests} className={field} placeholder="e.g. 250" />
        </Field>
        <Field id="budget" label="Budget range" className="sm:col-span-2">
          <select id="enq-budget" value={values.budget} onChange={(e) => set("budget", e.target.value)} className={field}>
            <option value="">Choose a range</option>
            {BUDGETS.map((b) => <option key={b}>{b}</option>)}
          </select>
        </Field>
      </div>

      <fieldset>
        <legend className="mb-3 text-sm font-semibold">Services required</legend>
        <div className="flex flex-wrap gap-2">
          {SERVICE_OPTIONS.map((s) => {
            const on = values.services?.includes(s);
            return (
              <button
                key={s}
                type="button"
                aria-pressed={on}
                onClick={() => toggleService(s)}
                className={cn("rounded-full border px-4 py-2 text-sm transition", on ? "border-primary bg-primary text-primary-foreground" : "border-input bg-card hover:border-primary hover:text-primary")}
              >
                {s}
              </button>
            );
          })}
        </div>
      </fieldset>

      <Field id="notes" label="Additional requirements">
        <textarea id="enq-notes" rows={4} value={values.notes} onChange={(e) => set("notes", e.target.value)} className={cn(field, "h-auto py-3")} placeholder="Theme, preferred artists, timings, anything else…" />
      </Field>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">Your details open in WhatsApp, addressed to {SITE.phones[0].display}. Press send there to share them with us.</p>
        <button type="submit" className="inline-flex h-13 shrink-0 items-center justify-center gap-2 rounded-full bg-whatsapp px-8 font-semibold text-whatsapp-foreground transition hover:brightness-110">
          <Send className="h-4 w-4" /> Send via WhatsApp
        </button>
      </div>

      <div id="enq-status" aria-live="polite">
        <AnimatePresence mode="wait">
          {status.kind === "opened" && (
            <motion.div key="ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex gap-3 rounded-2xl border border-success/40 bg-success/10 p-4 text-sm">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
              <div>
                <p className="font-semibold">WhatsApp opened with your enquiry.</p>
                <p className="mt-1 text-muted-foreground">We receive it once you press send in WhatsApp. Didn't open? <a className="font-semibold text-primary underline" href={status.href} target="_blank" rel="noreferrer">Open it here</a>.</p>
              </div>
            </motion.div>
          )}
          {status.kind === "blocked" && (
            <motion.div key="blocked" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex gap-3 rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm">
              <AlertCircle className="h-5 w-5 shrink-0 text-destructive" />
              <div>
                <p className="font-semibold">Your browser blocked WhatsApp from opening.</p>
                <a className="mt-2 inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2 font-semibold text-whatsapp-foreground" href={status.href} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4" /> Open WhatsApp to send
                </a>
              </div>
            </motion.div>
          )}
          {status.kind === "invalid" && (
            <motion.p key="invalid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-sm font-medium text-destructive">
              <AlertCircle className="h-4 w-4" /> Please fix the highlighted fields.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

function Field({ id, label, required, error, className, children }: { id: string; label: string; required?: boolean; error?: string | undefined; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={`enq-${id}`} className="mb-2 block text-sm font-semibold">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}
