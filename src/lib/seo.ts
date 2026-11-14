import { SITE } from "@/data/site";
import { photoUrl, type Photo } from "@/data/images";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  image?: Photo | undefined;
  type?: "website" | "article" | "profile";
  noindex?: boolean;
};

export function absoluteUrl(path: string) {
  const base: string = SITE.siteUrl;
  return base ? `${base.replace(/\/$/, "")}${path}` : "";
}

export function seo({ title, description, path, image, type = "website", noindex }: SeoInput) {
  const fullTitle = title.includes(SITE.name) ? title : `${title} | ${SITE.name}`;
  const meta: Record<string, string>[] = [
    { title: fullTitle },
    { name: "description", content: description },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:site_name", content: SITE.name },
    { property: "og:locale", content: "en_IN" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
  ];
  if (image) {
    const url = photoUrl(image, 1200, 630);
    meta.push({ property: "og:image", content: url }, { name: "twitter:image", content: url }, { property: "og:image:alt", content: image.alt });
  }
  if (noindex) meta.push({ name: "robots", content: "noindex" });
  const canonical = absoluteUrl(path);
  if (canonical) meta.push({ property: "og:url", content: canonical });
  const links = canonical ? [{ rel: "canonical", href: canonical }] : [];
  return { meta, links };
}

export function ldScript(data: unknown) {
  return { type: "application/ld+json", children: JSON.stringify(data) };
}

export function organizationLd() {
  const url = absoluteUrl("/");
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EntertainmentBusiness"],
    name: SITE.name,
    description: SITE.description,
    ...(url ? { url } : {}),
    telephone: SITE.phones[0].e164,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    areaServed: "Delhi NCR",
    sameAs: [SITE.instagram.url],
    contactPoint: SITE.phones.map((p) => ({ "@type": "ContactPoint", telephone: p.e164, contactType: "customer service", areaServed: "IN" })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  if (!absoluteUrl("/")) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
  };
}

export function serviceLd(name: string, description: string, category: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: category,
    provider: { "@type": "LocalBusiness", name: SITE.name, telephone: SITE.phones[0].e164, address: SITE.address.full },
    areaServed: { "@type": "City", name: "Delhi" },
  };
}

export function scripts(...items: (unknown | null)[]) {
  return items.filter(Boolean).map(ldScript);
}
