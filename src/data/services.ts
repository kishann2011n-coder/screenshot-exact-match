import { IMG, type Photo } from "./images";

export type CategorySlug = "event-management" | "entertainment" | "dance-music" | "decor-catering";

export type ServiceCategory = {
  slug: CategorySlug;
  name: string;
  short: string;
  description: string;
  image: Photo;
};

export type Service = {
  slug: string;
  name: string;
  /** SEO-focused page title, e.g. "Wedding Event Organiser in Delhi". */
  seoTitle: string;
  category: CategorySlug;
  short: string;
  intro: string;
  includes: string[];
  idealFor: string[];
  image: Photo;
  keywords: string[];
};

export const CATEGORIES: ServiceCategory[] = [
  {
    slug: "event-management",
    name: "Event Management",
    short: "Weddings, celebrations and corporate occasions, organised end to end.",
    description:
      "From the first idea to the final farewell, we plan, coordinate and run your event so you can be a guest at your own celebration.",
    image: IMG.mandap,
  },
  {
    slug: "entertainment",
    name: "Entertainment & Artist Management",
    short: "Celebrity live shows, stage performances and artist booking.",
    description:
      "Bollywood, Haryanvi and Bhojpuri live shows, celebrity appearances and stage productions — booked, managed and delivered with care.",
    image: IMG.concert,
  },
  {
    slug: "dance-music",
    name: "Dance & Music",
    short: "Dance groups, live singers, classes and stage performances.",
    description:
      "Indian and Russian dance groups, live singers and music performances for weddings, parties and shows — plus dance and singing classes.",
    image: IMG.stageDancers,
  },
  {
    slug: "decor-catering",
    name: "Decoration & Catering",
    short: "Décor that transforms a venue, and food guests remember.",
    description:
      "Wedding, birthday and occasion decoration with full catering services — designed around your theme, guest count and budget.",
    image: IMG.tablescape,
  },
];

const S = (s: Service) => s;

export const SERVICES: Service[] = [
  // ── Event Management ─────────────────────────────────────────────
  S({
    slug: "wedding-planning",
    name: "Wedding Planning",
    seoTitle: "Wedding Event Organiser in Delhi",
    category: "event-management",
    short: "Every ritual, every function, beautifully orchestrated.",
    intro:
      "An Indian wedding is many events in one — roka, haldi, mehndi, sangeet, pheras and reception. We plan the full sequence with you, coordinate vendors and families, and manage each function on the day so every ritual runs on time and every guest feels welcomed.",
    includes: [
      "Function-by-function planning and timelines",
      "Venue shortlisting and vendor coordination",
      "Mandap, stage and entrance décor concepts",
      "Entertainment, sangeet choreography and artist booking",
      "Catering menus and guest hospitality",
      "On-day coordination team",
    ],
    idealFor: ["Destination & city weddings", "Multi-day celebrations", "Intimate family weddings"],
    image: IMG.mandap,
    keywords: ["wedding", "shaadi", "wedding planner", "marriage", "pheras", "sangeet", "reception", "wedding organiser"],
  }),
  S({
    slug: "corporate-events",
    name: "Corporate Events",
    seoTitle: "Corporate Event Management in Delhi",
    category: "event-management",
    short: "Annual days, launches and team celebrations, run professionally.",
    intro:
      "We help companies host events that reflect their brand — annual days, award nights, product launches, dealer meets and festive celebrations. You get one accountable team for staging, sound, light, entertainment, hospitality and run-of-show.",
    includes: [
      "Concept, theme and run-of-show",
      "Stage, sound, lighting and LED setup",
      "Anchors, performers and celebrity entertainment",
      "Guest management and hospitality",
      "Catering and venue décor",
      "Live on-site coordination",
    ],
    idealFor: ["Annual days & award nights", "Product launches", "Diwali & year-end parties"],
    image: IMG.corporateParty,
    keywords: ["corporate", "company event", "annual day", "award night", "product launch", "office party", "dealer meet"],
  }),
  S({
    slug: "conference-events",
    name: "Conference Events",
    seoTitle: "Conference & Seminar Event Management",
    category: "event-management",
    short: "Conferences and seminars with seamless stage and guest flow.",
    intro:
      "From a half-day seminar to a multi-session conference, we organise the stage, AV, registration, speaker coordination and hospitality so your programme stays on schedule and your audience stays engaged.",
    includes: [
      "Stage design and AV management",
      "Registration and guest flow",
      "Speaker and session coordination",
      "Branding and signage",
      "Tea breaks, lunches and dinners",
      "Evening entertainment on request",
    ],
    idealFor: ["Seminars", "Industry conferences", "Workshops & summits"],
    image: IMG.conference,
    keywords: ["conference", "seminar", "summit", "workshop", "meeting", "corporate conference"],
  }),
  S({
    slug: "birthday-parties",
    name: "Birthday Parties",
    seoTitle: "Birthday Party Planning in Delhi",
    category: "event-management",
    short: "Milestone birthdays planned with themes, music and magic.",
    intro:
      "Whether it is a first birthday, a sweet sixteen or a fiftieth, we design a party around the person being celebrated — theme décor, cake moments, entertainment, music and food, all arranged for you.",
    includes: [
      "Theme concepts and décor",
      "Cake table and photo-booth setups",
      "DJs, singers, dancers and hosts",
      "Catering and dessert counters",
      "Return gifts on request",
    ],
    idealFor: ["1st birthdays", "Milestone birthdays", "Surprise parties"],
    image: IMG.cake,
    keywords: ["birthday", "birthday party", "bday", "party planner", "first birthday", "surprise party"],
  }),
  S({
    slug: "childrens-events",
    name: "Children's Events",
    seoTitle: "Children's Party & Kids Event Organiser",
    category: "event-management",
    short: "Joyful, safe and endlessly fun parties for little guests.",
    intro:
      "Kids' events need energy and careful planning. We arrange age-appropriate themes, games, entertainers and décor, with a focus on safety and smooth timing so parents can enjoy the day too.",
    includes: [
      "Cartoon and character themes",
      "Games, hosts and entertainers",
      "Balloon and backdrop décor",
      "Kid-friendly menus",
      "Activity and craft corners",
    ],
    idealFor: ["Kids' birthdays", "School functions", "Family get-togethers"],
    image: IMG.kidsParty,
    keywords: ["kids", "children", "kids party", "children party", "school event", "magician", "games"],
  }),
  S({
    slug: "baby-showers",
    name: "Baby Showers",
    seoTitle: "Baby Shower & Godh Bharai Planning",
    category: "event-management",
    short: "Gentle, beautiful celebrations for the parents-to-be.",
    intro:
      "From a traditional godh bharai to a modern baby shower, we create a warm, beautiful setting — soft décor, thoughtful rituals, games and food — so the family can focus on the mother-to-be.",
    includes: [
      "Traditional or modern themes",
      "Pastel décor and photo corners",
      "Ritual arrangements for godh bharai",
      "Games and hosting",
      "Catering and dessert tables",
    ],
    idealFor: ["Godh bharai", "Baby showers", "Gender reveals"],
    image: IMG.babyLetters,
    keywords: ["baby shower", "godh bharai", "gender reveal", "pregnancy", "baby"],
  }),
  S({
    slug: "anniversary-celebrations",
    name: "Anniversary Celebrations",
    seoTitle: "Anniversary Celebration Planning",
    category: "event-management",
    short: "Silver, golden or first — anniversaries worth remembering.",
    intro:
      "We plan anniversary celebrations of every scale — from a candle-lit dinner for two to a family gala for a 25th or 50th — with décor, music, a memorable moment and food chosen around the couple.",
    includes: [
      "Intimate dinners or grand parties",
      "Décor and stage for the couple",
      "Live singers and music",
      "Surprise moments and AV tributes",
      "Catering",
    ],
    idealFor: ["25th & 50th anniversaries", "Vow renewals", "Surprise dinners"],
    image: IMG.anniversary,
    keywords: ["anniversary", "silver jubilee", "golden jubilee", "vow renewal", "couple"],
  }),
  S({
    slug: "religious-events",
    name: "Religious Events",
    seoTitle: "Religious Event & Puja Organiser in Delhi",
    category: "event-management",
    short: "Pujas, jagrans and devotional gatherings, arranged with respect.",
    intro:
      "Religious and devotional events need care for tradition. We help arrange pujas, kirtans, jagrans, path and festival gatherings — seating, décor, sound, prasad and hospitality — with respect for every custom.",
    includes: [
      "Puja and ceremony arrangements",
      "Devotional singers and bhajan mandalis",
      "Floral and traditional décor",
      "Sound and seating",
      "Prasad, bhandara and catering",
    ],
    idealFor: ["Griha pravesh", "Jagran & kirtan", "Festival celebrations"],
    image: IMG.diyas,
    keywords: ["religious", "puja", "pooja", "jagran", "kirtan", "bhajan", "griha pravesh", "festival", "diwali"],
  }),
  S({
    slug: "bar-bat-mitzvah",
    name: "Bar & Bat Mitzvah Events",
    seoTitle: "Bar and Bat Mitzvah Event Planning",
    category: "event-management",
    short: "Coming-of-age celebrations planned around your traditions.",
    intro:
      "We support families in planning Bar and Bat Mitzvah receptions and celebrations — venue styling, entertainment, music, catering coordination and guest management — shaped around your customs and requirements.",
    includes: [
      "Reception planning and styling",
      "Music, DJ and entertainment",
      "Catering coordination to your requirements",
      "Guest management",
      "On-day coordination",
    ],
    idealFor: ["Bar Mitzvah", "Bat Mitzvah", "Family receptions"],
    image: IMG.barMitzvah,
    keywords: ["bar mitzvah", "bat mitzvah", "jewish", "coming of age"],
  }),
  S({
    slug: "mehndi-raat",
    name: "Mehndi & Mehndi Raat",
    seoTitle: "Mehndi & Mehndi Raat Organisation",
    category: "event-management",
    short: "Colour, music and henna — the most joyful night of the wedding.",
    intro:
      "The mehndi is where the celebrations come alive. We arrange mehndi artists, vibrant floral décor, seating, dhol, folk music and dance performances so your mehndi raat feels festive from the first design to the last song.",
    includes: [
      "Mehndi artists for bride and guests",
      "Marigold and colourful floral décor",
      "Dhol, folk singers and DJs",
      "Dance performances and choreography",
      "Chaat counters and catering",
    ],
    idealFor: ["Mehndi ceremony", "Mehndi raat", "Ladies sangeet"],
    image: IMG.mehndiMarigold,
    keywords: ["mehndi", "mehendi", "henna", "mehndi raat", "ladies sangeet", "sangeet"],
  }),
  S({
    slug: "complete-event-organisation",
    name: "Complete Event Organisation",
    seoTitle: "Complete Event Organisation — One Team, End to End",
    category: "event-management",
    short: "One team for venue, décor, food, entertainment and logistics.",
    intro:
      "Prefer a single point of contact? We take on the complete organisation of your event — budgeting, vendors, décor, catering, entertainment, logistics and on-day execution — and keep you updated at every step.",
    includes: [
      "Budget planning and tracking",
      "All vendor sourcing and management",
      "Décor, catering and entertainment",
      "Logistics, transport and stays on request",
      "Full on-day execution team",
    ],
    idealFor: ["Busy families", "Large-scale events", "Out-station guests"],
    image: IMG.receptionOutdoor,
    keywords: ["event management", "event organiser", "full service", "event planner", "end to end"],
  }),

  // ── Entertainment & Artist Management ───────────────────────────
  S({
    slug: "bollywood-celebrity-live-shows",
    name: "Bollywood Celebrity Live Shows",
    seoTitle: "Bollywood Artist Booking & Celebrity Live Shows",
    category: "entertainment",
    short: "Bollywood singers and performers for your stage.",
    intro:
      "Bring Bollywood energy to your wedding, corporate night or public show. Share your date, city and budget and we will check the availability of suitable Bollywood singers and performers, then manage the booking, technical rider and show-day coordination.",
    includes: [
      "Artist shortlisting to your budget",
      "Availability checks and booking",
      "Technical rider, sound and stage",
      "Travel and hospitality coordination",
      "Show-day artist management",
    ],
    idealFor: ["Wedding sangeets", "Corporate nights", "College & public shows"],
    image: IMG.concert,
    keywords: ["bollywood", "bollywood singer", "bollywood artist", "celebrity", "live show", "playback singer"],
  }),
  S({
    slug: "haryanvi-celebrity-live-shows",
    name: "Haryanvi Celebrity Live Shows",
    seoTitle: "Haryanvi Artist Booking & Live Shows",
    category: "entertainment",
    short: "Haryanvi singers and dancers who light up any crowd.",
    intro:
      "Haryanvi music and dance are some of the most requested entertainment at North Indian celebrations. We help you book Haryanvi singers and performers for weddings, ragini programmes, festivals and stage shows, subject to artist availability.",
    includes: [
      "Haryanvi singers and dance performers",
      "Availability checks and booking",
      "Stage, sound and lights",
      "Artist travel and hospitality",
      "Show-day coordination",
    ],
    idealFor: ["Weddings", "Village & town festivals", "Stage shows"],
    image: IMG.crowd,
    keywords: ["haryanvi", "haryanvi singer", "haryanvi dancer", "ragini", "sapna choudhary", "haryana"],
  }),
  S({
    slug: "bhojpuri-celebrity-live-shows",
    name: "Bhojpuri Celebrity Live Shows",
    seoTitle: "Bhojpuri Artist Booking & Live Shows",
    category: "entertainment",
    short: "Bhojpuri singers and stars for festivals and celebrations.",
    intro:
      "From Chhath and Holi celebrations to weddings and public events, we help arrange Bhojpuri singers and performers, handling availability, booking terms, stage requirements and on-day management.",
    includes: [
      "Bhojpuri singers and performers",
      "Availability checks and booking",
      "Stage and technical setup",
      "Travel and hospitality",
      "Show-day coordination",
    ],
    idealFor: ["Festival programmes", "Weddings", "Community events"],
    image: IMG.confettiStage,
    keywords: ["bhojpuri", "bhojpuri singer", "bhojpuri artist", "bihar", "purvanchal", "chhath"],
  }),
  S({
    slug: "celebrity-appearances",
    name: "Celebrity Appearances",
    seoTitle: "Celebrity Appearance Booking for Events",
    category: "entertainment",
    short: "Guest appearances for launches, openings and premieres.",
    intro:
      "A celebrity appearance can turn a store opening, launch or private party into an occasion. We approach suitable personalities on your behalf, negotiate terms and manage protocols, security and media on the day. All bookings are subject to the artist's confirmation.",
    includes: [
      "Personality suggestions to your brief",
      "Approach, terms and contracts",
      "Protocol, security and green room",
      "Media and photo-op coordination",
    ],
    idealFor: ["Store openings", "Brand launches", "Private celebrations"],
    image: IMG.redCarpet,
    keywords: ["celebrity", "appearance", "chief guest", "store opening", "launch", "influencer"],
  }),
  S({
    slug: "live-artist-booking",
    name: "Live Artist Booking",
    seoTitle: "Live Artist Booking — Singers, Bands, Anchors & DJs",
    category: "entertainment",
    short: "Singers, bands, anchors, DJs and performers on request.",
    intro:
      "Tell us the mood you want and we will suggest performers to match — solo singers, live bands, sufi and ghazal artists, anchors, DJs, comedians and more — then manage the booking and performance details.",
    includes: [
      "Curated artist suggestions",
      "Availability checks",
      "Booking and payment terms",
      "Sound and technical coordination",
    ],
    idealFor: ["Private parties", "Weddings", "Corporate events"],
    image: IMG.liveBand,
    keywords: ["artist booking", "live artist", "band", "anchor", "dj", "emcee", "comedian", "sufi", "ghazal"],
  }),
  S({
    slug: "stage-shows",
    name: "Stage Shows",
    seoTitle: "Stage Show Organisers — Production & Performers",
    category: "entertainment",
    short: "Complete stage productions with performers, sound and light.",
    intro:
      "We produce stage shows from the ground up — stage design, LED, sound, lights, performers and run-of-show — for festivals, public events, college fests and private celebrations.",
    includes: [
      "Stage, truss and LED walls",
      "Sound and lighting design",
      "Performer line-ups",
      "Run-of-show and stage management",
      "Permissions support on request",
    ],
    idealFor: ["Public events", "Festivals", "College fests"],
    image: IMG.stage,
    keywords: ["stage show", "stage", "production", "festival", "concert", "college fest", "sound and light"],
  }),
  S({
    slug: "live-performances",
    name: "Live Performances",
    seoTitle: "Live Performances for Weddings & Events",
    category: "entertainment",
    short: "Music, dance and acts that keep guests on their feet.",
    intro:
      "Live performances make an event feel alive. We arrange singers, dancers, instrumentalists and speciality acts, and plan each set around your schedule so the energy builds through the evening.",
    includes: ["Singers and live bands", "Dance acts", "Instrumentalists and dhol", "Speciality and fusion acts"],
    idealFor: ["Sangeet nights", "Receptions", "Corporate dinners"],
    image: IMG.singerSilhouette,
    keywords: ["live performance", "performance", "act", "dhol", "instrumental", "fusion"],
  }),
  S({
    slug: "artist-management",
    name: "Artist Management",
    seoTitle: "Artist Management Services",
    category: "entertainment",
    short: "Show coordination and logistics for performing artists.",
    intro:
      "We support performing artists and organisers with the practical side of shows — scheduling, travel, hospitality, technical riders and on-ground coordination — so performances run smoothly.",
    includes: ["Show scheduling", "Travel and hospitality", "Technical rider management", "On-ground coordination"],
    idealFor: ["Event organisers", "Performing artists", "Touring shows"],
    image: IMG.mic,
    keywords: ["artist management", "management", "artist manager", "tour", "show coordination"],
  }),
  S({
    slug: "shooting-entertainment-events",
    name: "Shooting & Entertainment Events",
    seoTitle: "Shooting & Entertainment Event Support",
    category: "entertainment",
    short: "Support for music video shoots and entertainment events.",
    intro:
      "We help with the event side of shoots and entertainment projects — artists and dancers, sets and décor, crowd and guest management, catering and coordination — so your production day stays on track.",
    includes: ["Dancers and background artists", "Set décor", "Crew catering", "On-set coordination"],
    idealFor: ["Music video shoots", "Promotional shoots", "Entertainment launches"],
    image: IMG.confettiStage,
    keywords: ["shooting", "shoot", "music video", "video shoot", "film", "production"],
  }),

  // ── Dance & Music ───────────────────────────────────────────────
  S({
    slug: "indian-dance-groups",
    name: "Indian Dance Groups",
    seoTitle: "Indian Dance Group Booking — Bollywood, Folk & Classical",
    category: "dance-music",
    short: "Bollywood, bhangra, folk and classical troupes.",
    intro:
      "Our Indian dance group performances bring colour and rhythm to any event — Bollywood medleys, Punjabi bhangra, Rajasthani and Haryanvi folk, and classical pieces — choreographed to your event and audience.",
    includes: ["Bollywood medleys", "Bhangra and giddha", "Folk and regional dances", "Classical performances", "Themed costumes"],
    idealFor: ["Weddings & sangeet", "Corporate shows", "Cultural events"],
    image: IMG.classicalDancer,
    keywords: ["dance group", "indian dance", "bollywood dance", "bhangra", "folk dance", "classical dance", "dancers"],
  }),
  S({
    slug: "russian-dance-groups",
    name: "Russian Dance Groups",
    seoTitle: "Russian Dance Group Booking for Events",
    category: "dance-music",
    short: "Glamorous international dance acts for grand occasions.",
    intro:
      "International dance acts add a glamorous, high-energy moment to receptions, corporate nights and parties. We arrange Russian and international dance groups with themed costumes and choreography, subject to availability.",
    includes: ["Themed group performances", "Costume changes", "Welcome and showstopper acts", "Choreography to your music"],
    idealFor: ["Receptions", "Corporate galas", "New Year parties"],
    image: IMG.balletStage,
    keywords: ["russian dance", "russian dancers", "international dancers", "foreign dancers", "belly dance", "cabaret"],
  }),
  S({
    slug: "professional-dance-performances",
    name: "Professional Dance Performances",
    seoTitle: "Professional Dance Performances for Events",
    category: "dance-music",
    short: "Choreographed acts tailored to your stage and story.",
    intro:
      "Professional dancers perform choreographed pieces built around your event — an opening act, a themed story, or a couple's entry — with costumes and music that match the occasion.",
    includes: ["Opening and entry acts", "Themed storytelling pieces", "Couple entry choreography", "LED and prop acts"],
    idealFor: ["Weddings", "Award nights", "Launch events"],
    image: IMG.contemporary,
    keywords: ["dance performance", "professional dancers", "choreography", "entry", "couple entry"],
  }),
  S({
    slug: "dance-classes",
    name: "Dance Classes",
    seoTitle: "Dance Classes & Sangeet Choreography in Delhi",
    category: "dance-music",
    short: "Learn to dance — or prepare for your sangeet.",
    intro:
      "Our dance classes cover Bollywood, folk and freestyle styles for beginners and enthusiasts. We also run focused sangeet choreography sessions so families and friends can perform with confidence on the big night.",
    includes: ["Bollywood and folk styles", "Beginner-friendly batches", "Sangeet choreography", "Family and couple sessions"],
    idealFor: ["Beginners", "Wedding families", "Kids and adults"],
    image: IMG.danceClass,
    keywords: ["dance class", "dance classes", "learn dance", "choreographer", "sangeet choreography", "dance academy"],
  }),
  S({
    slug: "singing-school",
    name: "Singing School",
    seoTitle: "Singing School & Vocal Training in Delhi",
    category: "dance-music",
    short: "Vocal training for beginners and aspiring performers.",
    intro:
      "Our singing school helps students build voice, pitch and confidence — from first lessons to stage preparation — with guidance across Bollywood, light classical and devotional styles.",
    includes: ["Voice and pitch training", "Bollywood and light classical", "Stage confidence", "Performance opportunities"],
    idealFor: ["Beginners", "Children", "Aspiring performers"],
    image: IMG.singingKid,
    keywords: ["singing school", "singing class", "vocal training", "music class", "learn singing"],
  }),
  S({
    slug: "live-singers",
    name: "Live Singers",
    seoTitle: "Live Singers for Weddings & Parties",
    category: "dance-music",
    short: "Soulful vocals for pheras, receptions and parties.",
    intro:
      "From soft sufi during dinner to upbeat Bollywood for the dance floor, we arrange live singers whose repertoire matches your event. Tell us the mood and we will suggest options.",
    includes: ["Bollywood and sufi singers", "Ghazal and devotional singers", "Acoustic duos", "Song list planning"],
    idealFor: ["Receptions", "Anniversaries", "Corporate dinners"],
    image: IMG.singer,
    keywords: ["live singer", "singer", "sufi singer", "ghazal", "wedding singer", "bhajan singer"],
  }),
  S({
    slug: "music-stage-performances",
    name: "Music & Stage Performances",
    seoTitle: "Music & Stage Performances",
    category: "dance-music",
    short: "Bands, DJs and full stage music productions.",
    intro:
      "Live bands, DJs and full music productions for your stage — with sound, light and set planning so the music sounds as good as it looks.",
    includes: ["Live bands", "DJs and sound", "Lighting design", "Set planning"],
    idealFor: ["Sangeet nights", "Corporate parties", "Public shows"],
    image: IMG.dj,
    keywords: ["music", "band", "dj", "stage performance", "concert", "sound"],
  }),

  // ── Decoration & Catering ───────────────────────────────────────
  S({
    slug: "event-decoration",
    name: "Event Decoration",
    seoTitle: "Event Decoration Services in Delhi",
    category: "decor-catering",
    short: "Venue transformations designed around your theme.",
    intro:
      "Décor sets the mood the moment guests walk in. We design and install stages, entrances, ceilings, table settings and lighting for every kind of event, working to your theme and budget.",
    includes: ["Theme and mood boards", "Stage and entrance décor", "Floral and fabric draping", "Lighting and props", "Setup and dismantling"],
    idealFor: ["All events", "Banquets & lawns", "Home functions"],
    image: IMG.tableFloral,
    keywords: ["decoration", "decor", "event decoration", "flower decoration", "stage decoration", "lighting"],
  }),
  S({
    slug: "wedding-decoration",
    name: "Wedding Decoration",
    seoTitle: "Wedding Decoration — Mandap, Stage & Floral Décor",
    category: "decor-catering",
    short: "Mandaps, stages and florals for every wedding function.",
    intro:
      "From a marigold-filled mehndi to a crystal-lit reception stage, we design wedding décor for each function — mandap, varmala stage, entrance, aisle and photo zones — so every ritual has its own beautiful setting.",
    includes: ["Mandap design", "Varmala and reception stage", "Entrance and aisle florals", "Haldi and mehndi setups", "Photo-zone installations"],
    idealFor: ["Weddings", "Receptions", "Engagements"],
    image: IMG.floralAisle,
    keywords: ["wedding decoration", "mandap", "varmala", "wedding stage", "floral", "wedding decor"],
  }),
  S({
    slug: "birthday-decoration",
    name: "Birthday Decoration",
    seoTitle: "Birthday Decoration Services",
    category: "decor-catering",
    short: "Balloons, backdrops and themes for every age.",
    intro:
      "Balloon arches, themed backdrops, cake tables and room makeovers — we decorate birthdays at homes, banquets and restaurants with themes chosen for the birthday person.",
    includes: ["Balloon arches and garlands", "Themed backdrops", "Cake table styling", "Home and venue setups"],
    idealFor: ["Kids' birthdays", "Surprise parties", "Milestone birthdays"],
    image: IMG.balloons,
    keywords: ["birthday decoration", "balloon decoration", "balloons", "backdrop", "theme decoration"],
  }),
  S({
    slug: "special-occasion-decoration",
    name: "Special Occasion Decoration",
    seoTitle: "Special Occasion Decoration",
    category: "decor-catering",
    short: "Proposals, anniversaries, festivals and welcomes.",
    intro:
      "For proposals, anniversaries, baby welcomes, festivals and housewarmings, we create décor that makes the moment feel special — from a candle-lit setting to a full festive makeover.",
    includes: ["Proposal and romantic setups", "Festival décor", "Baby welcome décor", "Housewarming décor"],
    idealFor: ["Proposals", "Festivals", "Welcomes"],
    image: IMG.pinkTable,
    keywords: ["occasion decoration", "proposal", "romantic decoration", "festival decoration", "housewarming"],
  }),
  S({
    slug: "catering-services",
    name: "Catering Services",
    seoTitle: "Catering Services for Weddings & Events in Delhi",
    category: "decor-catering",
    short: "Menus, live counters and service guests will talk about.",
    intro:
      "Our catering service plans menus around your guests — North Indian, regional, continental, chaat and live counters, desserts and beverages — with trained service staff and clean, well-presented buffets.",
    includes: ["Menu planning and tastings", "Live counters", "Buffet and plated service", "Service staff", "Veg and Jain options"],
    idealFor: ["Weddings", "Corporate events", "House parties"],
    image: IMG.catering,
    keywords: ["catering", "caterer", "food", "buffet", "menu", "live counter", "halwai"],
  }),
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function servicesIn(category: CategorySlug) {
  return SERVICES.filter((s) => s.category === category);
}
