import { IMG, type Photo } from "./images";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMinutes: number;
  image: Photo;
  body: { h?: string; p: string[]; list?: string[] }[];
};

export const POSTS: Post[] = [
  {
    slug: "indian-wedding-planning-checklist",
    title: "The Indian Wedding Planning Checklist: Function by Function",
    excerpt: "A practical, function-by-function checklist to help families plan roka to reception without the last-minute rush.",
    category: "Weddings",
    readMinutes: 6,
    image: IMG.mandapOutdoor,
    body: [
      { p: ["An Indian wedding is not one event — it is a series of celebrations, each with its own rituals, guests and mood. Planning gets far easier when you treat every function as its own mini-event, with a clear owner, budget and timeline."] },
      { h: "Start with the big decisions", p: ["Before booking anything, agree on three things as a family: the number of functions, the approximate guest count for each, and an overall budget range. These three numbers drive every other decision — venue size, décor scale, catering quantities and entertainment."] },
      { h: "Function-by-function essentials", p: ["Use this as a starting list and adapt it to your traditions:"], list: [
        "Haldi — a bright, easy-to-clean setup, marigold décor, dhol and a playlist.",
        "Mehndi — mehndi artists booked for the bride and guests, comfortable seating, folk music or a DJ, chaat counters.",
        "Sangeet — stage and dance floor, sound and lights, choreography sessions for family performers, a host or anchor, and a headline act if you want one.",
        "Wedding — mandap, varmala stage, pandit coordination, baraat arrangements, and a clear ritual timeline.",
        "Reception — couple's stage, photo zones, live singer or band, and a well-planned dinner service.",
      ] },
      { h: "Book entertainment early", p: ["Celebrity artists, popular dance groups and live bands are often booked well in advance for peak wedding dates. If a particular artist matters to you, check availability first and plan the sangeet date around it where possible."] },
      { h: "Keep one point of contact", p: ["The biggest stress on wedding days comes from too many people coordinating too many vendors. A single coordination team — with one timeline shared with family members — keeps every function running on time."] },
    ],
  },
  {
    slug: "how-to-book-a-celebrity-for-your-event",
    title: "How to Book a Celebrity Artist for Your Event",
    excerpt: "What to prepare, what affects availability and fees, and how a celebrity live show booking actually works.",
    category: "Live Shows",
    readMinutes: 5,
    image: IMG.concert,
    body: [
      { p: ["Booking a celebrity singer or performer — Bollywood, Haryanvi or Bhojpuri — can turn a good event into an unforgettable one. Here is how the process typically works, and how to prepare."] },
      { h: "Prepare these details first", p: ["Artists and their teams need specifics before they can confirm anything:"], list: [
        "Event date, city and venue",
        "Type of event (wedding, corporate, public show)",
        "Expected audience size",
        "Performance duration you are looking for",
        "Your budget range",
      ] },
      { h: "What affects availability and fees", p: ["Fees vary with the artist, the date (weekends and wedding season are in demand), travel distance, performance length and technical requirements. Public ticketed shows usually involve different terms from private events."] },
      { h: "The technical rider", p: ["Most artists share a technical rider listing the sound, stage, lighting and hospitality they need. Planning for the rider early avoids costly last-minute changes on show day."] },
      { h: "Confirmation, not assumption", p: ["An enquiry only starts the conversation. A booking is confirmed once the artist's team agrees to the date and terms in writing. Be cautious of anyone who 'guarantees' a celebrity without that confirmation."] },
    ],
  },
  {
    slug: "planning-a-memorable-corporate-event",
    title: "Planning a Corporate Event People Actually Enjoy",
    excerpt: "From annual days to product launches — how to balance the agenda, entertainment and hospitality.",
    category: "Corporate",
    readMinutes: 4,
    image: IMG.conference,
    body: [
      { p: ["Corporate events have two jobs: deliver the company's message and give people a good time. The best events plan for both from the start."] },
      { h: "Define the purpose", p: ["Is this an award night, a launch, a dealer meet or a festive celebration? The purpose decides the agenda length, the tone of the stage, and how much of the evening is given to entertainment."] },
      { h: "Keep the agenda tight", p: ["Long speeches lose an audience. Schedule key messages early, keep award segments brisk, and let entertainment build energy towards dinner."] },
      { h: "Choose entertainment that fits your audience", p: ["A mixed-age audience may enjoy a live band or Bollywood singer; younger teams often love a DJ and dance acts. A headline performance is a great way to end the formal programme on a high."] },
      { h: "Hospitality matters", p: ["Smooth registration, comfortable seating, good sound and well-timed food service make a bigger impression than most people expect."] },
    ],
  },
  {
    slug: "choosing-a-dance-group-for-your-sangeet",
    title: "Choosing a Dance Group for Your Sangeet",
    excerpt: "Bollywood, bhangra, folk or international acts — how to pick performances that suit your crowd.",
    category: "Dance & Music",
    readMinutes: 4,
    image: IMG.stageDancers,
    body: [
      { p: ["A professional dance performance can be the highlight of a sangeet — the moment the whole room gets on its feet. Here is how to choose the right act."] },
      { h: "Match the act to your guests", p: ["Bollywood medleys work for almost every crowd. Punjabi bhangra and Haryanvi folk bring instant energy. Classical pieces add elegance, and international dance groups make a glamorous showstopper at receptions."] },
      { h: "Mix professionals with family", p: ["Many families combine a professional act with their own performances. Sangeet choreography sessions help relatives perform confidently without weeks of stress."] },
      { h: "Plan the stage and timing", p: ["Check the stage size, floor surface, sound and lighting with your planner. Schedule the professional act at a peak moment — usually after the family performances, just before the dance floor opens."] },
    ],
  },
];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
