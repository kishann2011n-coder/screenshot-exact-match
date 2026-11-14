/**
 * Business details — edit here to update every page.
 * Keep only verified information. `email` stays empty until the exact address is confirmed.
 * `siteUrl` stays empty until the public domain is known; canonical tags are added once it is set.
 */
export const SITE = {
  name: "Gauri Entertainment",
  shortName: "Gauri",
  tagline: "Events · Entertainment · Celebrations",
  description:
    "Gauri Entertainment is a Delhi-based event management and entertainment company — weddings, corporate events, celebrity live shows, artist booking, dance groups, decoration and catering.",
  siteUrl: "" as string,
  address: {
    street: "118.2, East Moti Bagh, Sarai Rohilla",
    city: "Delhi",
    region: "Delhi",
    postalCode: "110007",
    country: "IN",
    full: "118.2, East Moti Bagh, Sarai Rohilla, Delhi 110007",
  },
  phones: [
    { label: "Primary · WhatsApp", display: "+91 76784 87866", e164: "+917678487866" },
    { label: "Alternate", display: "+91 85879 75898", e164: "+918587975898" },
  ],
  /** Number used for all WhatsApp hand-offs (digits only, with country code). */
  whatsappNumber: "917678487866",
  whatsappGreeting:
    "Hello Gauri Entertainment! I would like to enquire about planning an event.",
  email: "",
  instagram: {
    handle: "its_gauri_entertainment_pvtltd",
    url: "https://www.instagram.com/its_gauri_entertainment_pvtltd/",
  },
  mapQuery: "East Moti Bagh, Sarai Rohilla, Delhi 110007",
  serviceArea: "Delhi NCR and events across India on request",
} as const;

export const NAV_PRIMARY = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services", mega: "services" },
  { label: "Artist Booking", to: "/artists", mega: "artists" },
  { label: "Live Shows", to: "/live-shows" },
  { label: "Weddings", to: "/weddings" },
  { label: "Corporate Events", to: "/corporate-events" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
] as const;
