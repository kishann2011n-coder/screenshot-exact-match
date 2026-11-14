import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { CATEGORIES, servicesIn } from "@/data/services";
import { ARTIST_CATEGORIES } from "@/data/artists";
import { SITE } from "@/data/site";
import { waLink } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-ink text-ink-muted">
      <div className="container-x relative">
        {/* Big CTA line */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-ink-border/70 py-16 lg:flex-row lg:items-end">
          <h2 className="max-w-3xl font-display text-4xl leading-[1.05] text-ink-foreground sm:text-6xl">
            Let's create something <em className="text-gold-gradient">unforgettable</em>.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/plan-your-event" className="inline-flex h-12 items-center gap-2 rounded-full bg-gold-gradient px-6 font-semibold text-accent-foreground">
              Plan Your Event <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a href={waLink()} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-2 rounded-full border border-ink-border px-6 font-semibold text-ink-foreground hover:border-whatsapp hover:text-whatsapp">
              <MessageCircle className="h-4 w-4" /> WhatsApp us
            </a>
          </div>
        </div>

        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-xs text-sm leading-relaxed">{SITE.description}</p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><address className="not-italic">{SITE.address.full}</address></li>
              {SITE.phones.map((p) => (
                <li key={p.e164} className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <a href={`tel:${p.e164}`} className="hover:text-ink-foreground">{p.display} <span className="text-xs opacity-70">({p.label})</span></a>
                </li>
              ))}
              <li className="flex gap-3"><Instagram className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><a href={SITE.instagram.url} target="_blank" rel="noreferrer" className="hover:text-ink-foreground">@{SITE.instagram.handle}</a></li>
              {SITE.email && <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>}
            </ul>
          </div>

          {CATEGORIES.slice(0, 2).map((c) => (
            <FooterCol key={c.slug} title={c.name}>
              {servicesIn(c.slug).slice(0, 8).map((s) => (
                <li key={s.slug}><Link to="/services/$slug" params={{ slug: s.slug }} className="hover:text-ink-foreground">{s.name}</Link></li>
              ))}
            </FooterCol>
          ))}

          <FooterCol title="Dance, Décor & Food">
            {[...servicesIn("dance-music").slice(0, 4), ...servicesIn("decor-catering").slice(0, 4)].map((s) => (
              <li key={s.slug}><Link to="/services/$slug" params={{ slug: s.slug }} className="hover:text-ink-foreground">{s.name}</Link></li>
            ))}
          </FooterCol>

          <FooterCol title="Company">
            <li><Link to="/about" className="hover:text-ink-foreground">About Us</Link></li>
            <li><Link to="/services" search={{}} className="hover:text-ink-foreground">All Services</Link></li>
            <li><Link to="/artists" search={{}} className="hover:text-ink-foreground">Artist Booking</Link></li>
            <li><Link to="/gallery" className="hover:text-ink-foreground">Gallery</Link></li>
            <li><Link to="/blog" className="hover:text-ink-foreground">Knowledge Centre</Link></li>
            <li><Link to="/faq" className="hover:text-ink-foreground">FAQs</Link></li>
            <li><Link to="/partner" className="hover:text-ink-foreground">Vendors & Partners</Link></li>
            <li><Link to="/contact" className="hover:text-ink-foreground">Contact</Link></li>
          </FooterCol>
        </div>

        <div className="border-t border-ink-border/70 py-8">
          <p className="eyebrow text-ink-foreground/60">Artist categories</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {ARTIST_CATEGORIES.map((c) => (
              <Link key={c.slug} to="/artists" search={{ category: c.slug }} className="rounded-full border border-ink-border px-3 py-1 text-xs hover:border-gold hover:text-gold">{c.name}</Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-ink-border/70 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>Event photography courtesy of Unsplash contributors and Wikimedia Commons, used under their licences.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow text-ink-foreground">{title}</p>
      <ul className="mt-5 space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}
