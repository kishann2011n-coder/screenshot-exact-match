import { IMG, SAPNA_PHOTO, type Photo } from "./images";

export type ArtistCategorySlug =
  | "bollywood"
  | "haryanvi"
  | "bhojpuri"
  | "singers"
  | "dance-groups"
  | "celebrity-appearances"
  | "live-bands";

export type ArtistCategory = {
  slug: ArtistCategorySlug;
  name: string;
  short: string;
  image: Photo;
  /** Service page that describes this category. */
  serviceSlug: string;
};

export type Artist = {
  slug: string;
  name: string;
  role: string;
  categories: ArtistCategorySlug[];
  location?: string;
  summary: string;
  bio: string[];
  knownFor: string[];
  image?: Photo;
  /** Set true only after the business has verified the booking arrangement. */
  verified: boolean;
};

export const ARTIST_CATEGORIES: ArtistCategory[] = [
  { slug: "bollywood", name: "Bollywood Artists", short: "Playback singers & performers", image: IMG.concert, serviceSlug: "bollywood-celebrity-live-shows" },
  { slug: "haryanvi", name: "Haryanvi Artists", short: "Haryanvi singers & dancers", image: IMG.crowd, serviceSlug: "haryanvi-celebrity-live-shows" },
  { slug: "bhojpuri", name: "Bhojpuri Artists", short: "Bhojpuri singers & stars", image: IMG.confettiStage, serviceSlug: "bhojpuri-celebrity-live-shows" },
  { slug: "singers", name: "Live Singers", short: "Sufi, ghazal, Bollywood & devotional", image: IMG.singer, serviceSlug: "live-singers" },
  { slug: "dance-groups", name: "Dance Groups", short: "Indian, Russian & fusion troupes", image: IMG.stageDancers, serviceSlug: "indian-dance-groups" },
  { slug: "celebrity-appearances", name: "Celebrity Appearances", short: "Launches, openings & premieres", image: IMG.redCarpet, serviceSlug: "celebrity-appearances" },
  { slug: "live-bands", name: "Live Bands & DJs", short: "Bands, DJs & instrumentalists", image: IMG.liveBand, serviceSlug: "music-stage-performances" },
];

/**
 * Artist profiles. Booking is always subject to the artist's own availability and confirmation.
 * Gauri Entertainment does not claim exclusive representation of any artist listed here.
 */
export const ARTISTS: Artist[] = [
  {
    slug: "sapna-choudhary",
    name: "Sapna Choudhary",
    role: "Haryanvi Singer & Dancer",
    categories: ["haryanvi", "celebrity-appearances"],
    location: "Haryana",
    summary:
      "One of the best-known names in Haryanvi entertainment, famous for her stage performances and popular Haryanvi songs.",
    bio: [
      "Sapna Choudhary is a Haryanvi singer and dancer whose live stage shows draw large audiences across North India. She also appeared on the reality show Bigg Boss (Season 11) and has featured in film and music projects.",
      "Enquire with Gauri Entertainment to request her availability for your event. We will share the current booking process and terms once availability has been confirmed by the artist's team.",
    ],
    knownFor: ["Haryanvi stage shows", "Dance performances", "Celebrity appearances"],
    image: SAPNA_PHOTO,
    verified: false,
  },
  {
    slug: "vinayak-dutt",
    name: "Vinayak Dutt",
    role: "Singer / Music Director",
    categories: ["singers", "bollywood"],
    summary: "Singer and music director available on request for live performances and music projects.",
    bio: [
      "Vinayak Dutt is a singer and music director. Profile details, repertoire and performance formats will be published here once verified.",
      "Send an enquiry to request his availability for live shows, private events or music projects.",
    ],
    knownFor: ["Live vocal performances", "Music direction"],
    verified: false,
  },
];

export function getArtist(slug: string) {
  return ARTISTS.find((a) => a.slug === slug);
}

export function getArtistCategory(slug: string) {
  return ARTIST_CATEGORIES.find((c) => c.slug === slug);
}
