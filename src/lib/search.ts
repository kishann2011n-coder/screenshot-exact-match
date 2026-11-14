import { SERVICES, CATEGORIES, type CategorySlug } from "@/data/services";
import { ARTISTS, ARTIST_CATEGORIES } from "@/data/artists";
import { POSTS } from "@/data/blog";
import type { Photo } from "@/data/images";

export type SearchScope = "all" | CategorySlug | "artists" | "articles";

export const SCOPES: { value: SearchScope; label: string }[] = [
  { value: "all", label: "Everything" },
  { value: "event-management", label: "Events" },
  { value: "entertainment", label: "Entertainment" },
  { value: "artists", label: "Artists" },
  { value: "dance-music", label: "Dance & Music" },
  { value: "decor-catering", label: "Décor & Catering" },
  { value: "articles", label: "Articles" },
];

export type SearchLink =
  | { to: "/services/$slug"; params: { slug: string } }
  | { to: "/artists/$slug"; params: { slug: string } }
  | { to: "/blog/$slug"; params: { slug: string } }
  | { to: "/artists"; search: { category: string } }
  | { to: "/services"; search: { category: string } };

export type SearchItem = {
  id: string;
  kind: "Service" | "Artist" | "Artist category" | "Service category" | "Article";
  scopes: SearchScope[];
  title: string;
  subtitle: string;
  group: string;
  keywords: string[];
  photo?: Photo | undefined;
  link: SearchLink;
};

let cached: SearchItem[] | null = null;

export function getSearchIndex(): SearchItem[] {
  if (cached) return cached;
  const catName = (slug: CategorySlug) => CATEGORIES.find((c) => c.slug === slug)?.name ?? "";
  const items: SearchItem[] = [
    ...SERVICES.map<SearchItem>((s) => ({
      id: `service:${s.slug}`,
      kind: "Service",
      scopes: [s.category],
      title: s.name,
      subtitle: s.short,
      group: catName(s.category),
      keywords: [...s.keywords, s.seoTitle, ...s.idealFor],
      photo: s.image,
      link: { to: "/services/$slug", params: { slug: s.slug } },
    })),
    ...CATEGORIES.map<SearchItem>((c) => ({
      id: `category:${c.slug}`,
      kind: "Service category",
      scopes: [c.slug],
      title: c.name,
      subtitle: c.short,
      group: "Category",
      keywords: [c.description],
      photo: c.image,
      link: { to: "/services", search: { category: c.slug } },
    })),
    ...ARTIST_CATEGORIES.map<SearchItem>((c) => ({
      id: `artist-category:${c.slug}`,
      kind: "Artist category",
      scopes: ["artists", "entertainment"],
      title: c.name,
      subtitle: c.short,
      group: "Artist booking",
      keywords: [c.slug.replace(/-/g, " "), "artist", "booking", "singer", "performer"],
      photo: c.image,
      link: { to: "/artists", search: { category: c.slug } },
    })),
    ...ARTISTS.map<SearchItem>((a) => ({
      id: `artist:${a.slug}`,
      kind: "Artist",
      scopes: ["artists", "entertainment"],
      title: a.name,
      subtitle: a.role,
      group: "Artist booking",
      keywords: [...a.knownFor, ...a.categories, a.summary],
      photo: a.image,
      link: { to: "/artists/$slug", params: { slug: a.slug } },
    })),
    ...POSTS.map<SearchItem>((p) => ({
      id: `post:${p.slug}`,
      kind: "Article",
      scopes: ["articles"],
      title: p.title,
      subtitle: p.excerpt,
      group: p.category,
      keywords: [p.category],
      photo: p.image,
      link: { to: "/blog/$slug", params: { slug: p.slug } },
    })),
  ];
  cached = items;
  return items;
}

export function normalise(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const STOP = new Set(["and", "the", "for", "a", "an", "of", "in", "my", "to", "event", "events", "services", "service", "booking"]);

function score(item: SearchItem, tokens: string[], phrase: string) {
  const title = normalise(item.title);
  const sub = normalise(item.subtitle);
  const kw = normalise(item.keywords.join(" "));
  const group = normalise(item.group);
  let total = 0;
  if (phrase && title.includes(phrase)) total += 20;
  if (phrase && kw.includes(phrase)) total += 8;
  for (const t of tokens) {
    let s = 0;
    const words = title.split(" ");
    if (words.some((w) => w === t)) s = 10;
    else if (words.some((w) => w.startsWith(t))) s = 7;
    else if (kw.split(" ").some((w) => w.startsWith(t))) s = 4;
    else if (sub.includes(t) || group.includes(t)) s = 2;
    if (s === 0) return 0; // every meaningful word must match
    total += s;
  }
  return total;
}

export function search(query: string, scope: SearchScope = "all"): SearchItem[] {
  const index = getSearchIndex().filter((i) => scope === "all" || i.scopes.includes(scope));
  const phrase = normalise(query);
  if (!phrase) return index;
  let tokens = phrase.split(" ").filter((t) => t.length > 1 && !STOP.has(t));
  if (tokens.length === 0) tokens = phrase.split(" ").filter(Boolean);
  return index
    .map((item) => ({ item, s: score(item, tokens, phrase) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s)
    .map((r) => r.item);
}

export const SUGGESTIONS: { label: string; query: string; scope: SearchScope }[] = [
  { label: "Wedding Planner", query: "wedding", scope: "all" },
  { label: "Birthday Events", query: "birthday", scope: "all" },
  { label: "Corporate Events", query: "corporate", scope: "all" },
  { label: "Celebrity Shows", query: "celebrity", scope: "entertainment" },
  { label: "Bollywood Artists", query: "bollywood", scope: "all" },
  { label: "Haryanvi Artists", query: "haryanvi", scope: "all" },
  { label: "Bhojpuri Artists", query: "bhojpuri", scope: "all" },
  { label: "Dance Groups", query: "dance group", scope: "all" },
  { label: "Singing Performances", query: "singer", scope: "all" },
  { label: "Catering", query: "catering", scope: "all" },
  { label: "Decoration", query: "decoration", scope: "all" },
  { label: "Stage Shows", query: "stage show", scope: "all" },
];
