import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MessageCircle, ShieldCheck } from "lucide-react";
import { Photo, PhotoPlaceholder } from "./Photo";
import { TiltCard } from "./motion";
import type { Service } from "@/data/services";
import type { Artist, ArtistCategory } from "@/data/artists";
import { getCategory } from "@/data/services";
import { availabilityMessage, waLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function ServiceCard({ service, className, size = "md" }: { service: Service; className?: string; size?: "md" | "lg" }) {
  return (
    <TiltCard className={cn("h-full", className)}>
      <Link
        to="/services/$slug"
        params={{ slug: service.slug }}
        data-cursor="View"
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-ink shadow-soft"
      >
        <div className={cn("relative overflow-hidden", size === "lg" ? "aspect-[4/5]" : "aspect-[4/4.4]")}>
          <Photo photo={service.image} width={800} sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="img-zoom group-hover:scale-110" />
          <div className="absolute inset-0 bg-ink-fade" />
          <span className="absolute left-4 top-4 rounded-full border border-ink-foreground/25 bg-ink/40 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ink-foreground/90 backdrop-blur">
            {getCategory(service.category)?.name.split(" &")[0]}
          </span>
          <div className="absolute inset-x-0 bottom-0 p-5">
            <h3 className="font-display text-2xl leading-tight text-ink-foreground">{service.name}</h3>
            <p className="mt-2 max-h-0 overflow-hidden text-sm text-ink-foreground/75 opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100">{service.short}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-gold">
              Explore <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}

export function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <TiltCard className="h-full">
      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-soft">
        <Link to="/artists/$slug" params={{ slug: artist.slug }} data-cursor="Profile" className="relative block aspect-[4/5] overflow-hidden">
          {artist.image ? (
            <Photo photo={artist.image} width={700} className="img-zoom group-hover:scale-105" />
          ) : (
            <PhotoPlaceholder name={artist.name} />
          )}
          <div className="absolute inset-0 bg-ink-fade opacity-80" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="eyebrow text-gold">{artist.role}</p>
            <h3 className="mt-2 font-display text-3xl text-ink-foreground">{artist.name}</h3>
          </div>
        </Link>
        <div className="flex flex-1 flex-col p-5">
          <p className="text-sm leading-relaxed text-muted-foreground">{artist.summary}</p>
          <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
            Booking subject to the artist's availability and confirmation.
          </p>
          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            <Link to="/artists/$slug" params={{ slug: artist.slug }} className="inline-flex h-10 items-center rounded-full border px-4 text-sm font-semibold hover:bg-foreground hover:text-background">
              View profile
            </Link>
            <a href={waLink(availabilityMessage(`${artist.name} (${artist.role})`))} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center gap-2 rounded-full bg-whatsapp px-4 text-sm font-semibold text-whatsapp-foreground">
              <MessageCircle className="h-4 w-4" /> Check availability
            </a>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

export function ArtistCategoryCard({ category, active, onSelect }: { category: ArtistCategory; active?: boolean; onSelect?: () => void }) {
  const inner = (
    <>
      <div className="absolute inset-0">
        <Photo photo={category.image} width={600} sizes="(min-width:1024px) 20vw, 50vw" className="img-zoom group-hover:scale-110" />
      </div>
      <div className={cn("absolute inset-0 transition-colors duration-500", active ? "bg-primary/70" : "bg-ink/55 group-hover:bg-ink/35")} />
      <div className="relative flex h-full flex-col justify-end p-4 text-left">
        <p className="font-display text-xl leading-tight text-ink-foreground">{category.name}</p>
        <p className="mt-1 text-xs text-ink-foreground/75">{category.short}</p>
      </div>
    </>
  );
  const cls = cn(
    "group relative block aspect-[3/4] overflow-hidden rounded-2xl ring-offset-2 ring-offset-background transition-all",
    active && "ring-2 ring-gold",
  );
  return onSelect ? (
    <button type="button" onClick={onSelect} aria-pressed={active} className={cls}>{inner}</button>
  ) : (
    <Link to="/artists" search={{ category: category.slug }} className={cls}>{inner}</Link>
  );
}
