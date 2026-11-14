import { IMG, type Photo } from "./images";
import { SERVICES, CATEGORIES } from "./services";
import { ARTIST_CATEGORIES } from "./artists";

/* ── Gallery ─────────────────────────────────────────────────────
 * Representative photography from Unsplash. Replace with your own event photos. */
export type GalleryCategory = "weddings" | "live-shows" | "corporate" | "celebrations" | "decor" | "dance" | "cultural";
export const GALLERY_CATEGORIES: { slug: GalleryCategory; name: string }[] = [
  { slug: "weddings", name: "Weddings" },
  { slug: "live-shows", name: "Live Shows" },
  { slug: "corporate", name: "Corporate" },
  { slug: "celebrations", name: "Celebrations" },
  { slug: "decor", name: "Décor" },
  { slug: "dance", name: "Dance" },
  { slug: "cultural", name: "Cultural" },
];

export type GalleryItem = { photo: Photo; category: GalleryCategory; title: string; tall?: boolean };

export const GALLERY: GalleryItem[] = [
  { photo: IMG.mandap, category: "weddings", title: "Ballroom mandap", tall: true },
  { photo: IMG.concert, category: "live-shows", title: "Concert stage" },
  { photo: IMG.bride, category: "weddings", title: "Bridal portrait", tall: true },
  { photo: IMG.conference, category: "corporate", title: "Conference keynote" },
  { photo: IMG.stageDancers, category: "dance", title: "Stage dance act" },
  { photo: IMG.tablescape, category: "decor", title: "Gold tablescape", tall: true },
  { photo: IMG.mehndiGroup, category: "weddings", title: "Mehndi celebration" },
  { photo: IMG.crowd, category: "live-shows", title: "Crowd energy", tall: true },
  { photo: IMG.cake, category: "celebrations", title: "Birthday moment" },
  { photo: IMG.diyas, category: "cultural", title: "Festival diyas" },
  { photo: IMG.floralAisle, category: "decor", title: "Floral aisle", tall: true },
  { photo: IMG.classicalDancer, category: "dance", title: "Classical performance", tall: true },
  { photo: IMG.corporateParty, category: "corporate", title: "Year-end celebration" },
  { photo: IMG.haldi, category: "weddings", title: "Haldi ceremony" },
  { photo: IMG.holi, category: "cultural", title: "Holi festival", tall: true },
  { photo: IMG.babyLetters, category: "celebrations", title: "Baby shower setup" },
  { photo: IMG.confettiStage, category: "live-shows", title: "Confetti finale" },
  { photo: IMG.receptionOutdoor, category: "decor", title: "Garden reception" },
  { photo: IMG.balletStage, category: "dance", title: "International troupe" },
  { photo: IMG.sangeet, category: "cultural", title: "Sangeet evening", tall: true },
  { photo: IMG.kidsParty, category: "celebrations", title: "Kids' party" },
  { photo: IMG.seminar, category: "corporate", title: "Seminar session" },
  { photo: IMG.reception, category: "weddings", title: "Reception stage" },
  { photo: IMG.folkDancers, category: "dance", title: "Folk dancers" },
];

/* ── Testimonials ────────────────────────────────────────────────
 * Add genuine client reviews only, with the client's permission. Leave empty until then. */
export type Testimonial = { quote: string; name: string; event: string; date?: string };
export const TESTIMONIALS: Testimonial[] = [];

/* ── Statistics ──────────────────────────────────────────────────
 * `value: null` entries are hidden until a verified number is filled in. */
export type Stat = { label: string; value: number | null; suffix?: string };
export const STATS: Stat[] = [
  { label: "Services under one roof", value: SERVICES.length },
  { label: "Service categories", value: CATEGORIES.length },
  { label: "Artist & entertainment categories", value: ARTIST_CATEGORIES.length },
  { label: "Contact lines on WhatsApp & call", value: 2 },
  // Fill these in with verified figures to display them:
  { label: "Events delivered", value: null, suffix: "+" },
  { label: "Years of experience", value: null, suffix: "+" },
];

/* ── FAQs ────────────────────────────────────────────────────── */
export type Faq = { q: string; a: string; group: "Booking" | "Planning" | "Artists" | "Services" };
export const FAQS: Faq[] = [
  { group: "Booking", q: "How do I book Gauri Entertainment for my event?", a: "Send us your event details through the Plan Your Event form or WhatsApp. We will call you back to understand your requirements, share options and a quotation, and confirm the booking once you are happy." },
  { group: "Booking", q: "How far in advance should I book?", a: "For weddings and large events, we recommend reaching out as early as possible — popular dates and artists get booked quickly. Smaller parties can often be arranged at shorter notice, subject to availability." },
  { group: "Booking", q: "Do you charge for the first consultation?", a: "Reach out on WhatsApp or call us to discuss your event — we will explain how our planning and quotations work for your specific requirements." },
  { group: "Planning", q: "Which areas do you serve?", a: "We are based in Sarai Rohilla, Delhi and organise events across Delhi NCR. Events in other cities can be arranged on request — tell us your location when you enquire." },
  { group: "Planning", q: "Can you work within my budget?", a: "Yes. Share your budget range in the enquiry and we will suggest décor, entertainment and catering options that fit it, along with where it makes sense to spend more or less." },
  { group: "Planning", q: "Can you manage the complete event, or only one part?", a: "Both. You can book a single service — such as décor, catering or a dance group — or ask us to organise the complete event end to end." },
  { group: "Artists", q: "Can you book celebrity artists like Bollywood, Haryanvi or Bhojpuri singers?", a: "We can approach artists on your behalf and manage the booking. Every celebrity booking depends on the artist's availability, fees and confirmation, which we check for your specific date and city." },
  { group: "Artists", q: "Is an artist confirmed when I send an enquiry?", a: "No. An enquiry is a request to check availability. A booking is only confirmed once the artist's team agrees to the date and terms and the booking formalities are complete." },
  { group: "Artists", q: "Do you provide dance groups for sangeet and receptions?", a: "Yes — Indian dance groups (Bollywood, bhangra, folk and classical) and international dance groups, along with sangeet choreography for family members." },
  { group: "Services", q: "Do you provide decoration and catering?", a: "Yes. We offer wedding, birthday and special-occasion decoration and full catering services, either on their own or as part of a complete event package." },
  { group: "Services", q: "Do you offer dance classes and singing lessons?", a: "Yes. We run dance classes (including sangeet choreography) and a singing school. Message us on WhatsApp for current batches and timings." },
  { group: "Services", q: "Do you organise religious events?", a: "Yes — pujas, jagrans, kirtans, griha pravesh and festival gatherings, arranged with care for every tradition." },
];

/* ── Why choose us (capabilities only — no invented claims) ───── */
export const WHY_US = [
  { title: "One team, every detail", text: "Planning, décor, food, entertainment and on-day coordination handled by one accountable team." },
  { title: "Entertainment specialists", text: "Celebrity live shows, artist booking, dance groups and live music sit at the heart of what we do." },
  { title: "Rooted in Indian celebrations", text: "From haldi to pheras, jagran to sangeet — we understand the rituals and the rhythm of Indian events." },
  { title: "Honest about availability", text: "We confirm artists, venues and dates properly before anything is promised to you." },
  { title: "Built around your budget", text: "Clear options at different price points, so you can decide where every rupee goes." },
  { title: "Reachable on WhatsApp", text: "Quick answers on WhatsApp or call — before, during and after your event." },
];

export const PROCESS = [
  { n: "01", title: "Share your idea", text: "Tell us the occasion, date, city, guest count and budget — on WhatsApp or our form." },
  { n: "02", title: "Get a tailored plan", text: "We suggest services, artists and décor options and share a clear quotation." },
  { n: "03", title: "Confirm & coordinate", text: "Once you approve, we lock in vendors and artists and keep you updated." },
  { n: "04", title: "Celebrate", text: "Our team runs the day on the ground so you can enjoy every moment." },
];

/* ── Featured event formats (homepage) ───────────────────────── */
export type FeaturedEvent = {
  title: string;
  text: string;
  photo: Photo;
  page?: "/weddings" | "/corporate-events" | "/live-shows";
  slug?: string;
};
export const FEATURED_EVENTS: FeaturedEvent[] = [
  { title: "Weddings", text: "Haldi to reception, every function.", photo: IMG.reception, page: "/weddings" },
  { title: "Corporate Events", text: "Annual days, launches & conferences.", photo: IMG.conference, page: "/corporate-events" },
  { title: "Celebrity Shows", text: "Bollywood, Haryanvi & Bhojpuri stars.", photo: IMG.concert, page: "/live-shows" },
  { title: "Stage Performances", text: "Dance, music & full productions.", photo: IMG.stageDancers, slug: "stage-shows" },
  { title: "Birthday Celebrations", text: "Themes, cakes & entertainment.", photo: IMG.cake, slug: "birthday-parties" },
  { title: "Cultural Events", text: "Pujas, jagrans & festivals.", photo: IMG.holi, slug: "religious-events" },
];
