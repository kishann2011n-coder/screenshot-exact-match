import { photoSrcSet, photoUrl, type Photo as PhotoT } from "@/data/images";
import { cn } from "@/lib/utils";

export function Photo({
  photo,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  width = 1200,
  priority = false,
}: {
  photo: PhotoT;
  className?: string;
  sizes?: string;
  width?: number;
  priority?: boolean;
}) {
  return (
    <img
      src={photoUrl(photo, width)}
      srcSet={photoSrcSet(photo)}
      sizes={photo.src ? undefined : sizes}
      alt={photo.alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      style={photo.position ? { objectPosition: photo.position } : undefined}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}

/** Elegant stand-in when no licensed photograph is available yet. */
export function PhotoPlaceholder({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  return (
    <div
      role="img"
      aria-label={`${name} — photo coming soon`}
      className={cn("grain relative flex h-full w-full flex-col items-center justify-center bg-ink text-ink-foreground", className)}
    >
      <div className="absolute inset-6 rounded-[2rem] border border-gold/30" />
      <span className="font-display text-6xl italic text-gold-gradient">{initials}</span>
      <span className="eyebrow mt-4 text-ink-muted">Photo coming soon</span>
    </div>
  );
}
