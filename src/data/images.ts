/**
 * Photography library. All photos are from Unsplash (free licence, https://unsplash.com/license)
 * unless noted. Swap any entry for your own event photography — keep the same keys.
 */
export type Photo = {
  id: string;
  alt: string;
  /** Full URL for non-Unsplash images (e.g. Wikimedia Commons). */
  src?: string;
  credit?: string;
  creditUrl?: string;
  license?: string;
  position?: string;
};

const p = (id: string, alt: string, position?: string): Photo => ({ id, alt, position });

export const IMG = {
  mandap: p("1587271407850-8d438ca9fdf2", "Couple performing wedding rituals under a floral mandap in a candle-lit ballroom"),
  mandapOutdoor: p("1587271636175-90d58cdad458", "Couple in traditional attire seated under a pink floral wedding canopy outdoors"),
  bride: p("1610173827043-9db50e0d8ef9", "Indian bride in a red lehenga with gold jewellery and henna", "50% 30%"),
  henna: p("1621801306185-8c0ccf9c8eb8", "Bride and groom holding hands decorated with intricate henna"),
  mehndiGroup: p("1505932794465-147d1f1b2c97", "Group of hands showing mehndi designs at a celebration"),
  mehndiMarigold: p("1771992226177-759e116e72f4", "Henna-adorned hands resting among marigold garlands"),
  reception: p("1757017199822-beab923a1afc", "Newlyweds seated under glowing chandeliers at a wedding reception"),
  receptionOutdoor: p("1772127822525-7eda37383b9f", "Outdoor wedding reception with draped canopy and dressed tables"),
  floralAisle: p("1757589227072-0dd17af42433", "Floral archway and white chairs set for a wedding ceremony"),
  banquet: p("1519167758481-83f550bb49b3", "Banquet hall laid with round tables and chandeliers for a formal dinner"),
  tablescape: p("1767050292710-8e5da59ec5d8", "Elegant table setting with floral arrangements and gold cutlery"),
  tableFloral: p("1511795409834-ef04bbd61622", "Long dinner table with a colourful floral centrepiece"),
  sangeet: p("1587012521796-6359d3678f2a", "Family celebrating at a sangeet in traditional saris"),
  haldi: p("1681717166573-f71589207785", "Bride laughing as she is showered during a haldi ceremony", "50% 25%"),
  concert: p("1470229722913-7c0e2dbbafd3", "Audience silhouetted against a blazing concert stage"),
  crowd: p("1501386761578-eac5c94b800a", "Excited crowd cheering at a live show"),
  confettiStage: p("1647885672601-da4e2f8eaf94", "Red stage lights beaming through falling confetti"),
  stage: p("1576514129883-2f1d47a65da6", "Empty stage lit with purple and pink stage lights"),
  liveBand: p("1499364615650-ec38552f4f34", "Band performing on stage under blue lights"),
  singerSilhouette: p("1620577610365-86c411bad78d", "Singer performing on stage in front of an audience"),
  singer: p("1597169428801-7c1adf2623bd", "Vocalist singing passionately into a microphone on stage"),
  mic: p("1507676385008-e7fb562d11f8", "Stage microphone under a single spotlight"),
  dj: p("1470225620780-dba8ba36b745", "DJ performing behind decks in red light"),
  conference: p("1587825140708-dfaf72ae4b04", "Speaker on stage addressing a large conference audience"),
  seminar: p("1540575467063-178a50c2df87", "Audience seated at a conference session"),
  corporateParty: p("1492684223066-81342ee5ff30", "Confetti bursting over a crowd at a celebration"),
  toast: p("1527529482837-4698179dc6ce", "Guests raising glasses at a celebration"),
  balloons: p("1530103862676-de8c9debad1d", "Bunches of colourful balloons at a party"),
  cake: p("1577998474517-7eeeed4e448a", "Celebration cake topped with a lit sparkler"),
  kidsParty: p("1765530950709-67e6af4ce3ad", "Children celebrating a birthday party with balloons and cake"),
  babyLetters: p("1768776183122-95c7d3adbf3e", "Illuminated BABY letters surrounded by pastel balloons"),
  pinkTable: p("1767070805821-60c701885151", "Long table set for a party with pink decorations"),
  anniversary: p("1768508949619-c255d2630447", "Couple raising glasses at a formal anniversary dinner"),
  diyas: p("1577083753695-e010191bacb5", "Lit clay diyas on a decorative tray with flower petals"),
  puja: p("1635919254233-38ea27301900", "Family celebrating a ceremony with marigold garlands"),
  barMitzvah: p("1781958893427-3a63df62b94f", "Guest lifted in celebration at a family event"),
  classicalDancer: p("1764014792668-bc484714744f", "Dancer in traditional Indian costume performing on stage"),
  folkDancers: p("1463592177119-bab2a00f3ccb", "Dancers performing a traditional Indian dance"),
  stageDancers: p("1786452158003-a8b93e8b7b86", "Dancers in red and gold costumes performing on a lit stage"),
  balletStage: p("1758529224901-5235d86ce125", "Troupe of dancers in white costumes performing on stage"),
  contemporary: p("1550026593-cb89847b168d", "Dance troupe performing on stage in warm light"),
  danceClass: p("1524594152303-9fd13543fe6e", "Dance class practising choreography in a studio"),
  singingKid: p("1453738773917-9c3eff1db985", "Young student singing into a studio microphone"),
  catering: p("1555244162-803834f70033", "Buffet table with silver chafing dishes of food"),
  grazing: p("1576842546422-60562b9242ae", "Grazing table laid with a variety of food"),
  holi: p("1603228254119-e6a4d095dc59", "Crowd throwing coloured powder into the air at a festival"),
  redCarpet: p("1778356192459-40546f005dc6", "Guest posing on a red carpet at a premiere event"),
} satisfies Record<string, Photo>;

export const SAPNA_PHOTO: Photo = {
  id: "wikimedia-sapna-choudhary",
  src: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Muharat-of-the-film-Dosti-Ke-Side-Effect-8.jpg",
  alt: "Sapna Choudhary at the muhurat of the film Dosti Ke Side Effects",
  credit: "Bollywood Hungama",
  creditUrl: "https://commons.wikimedia.org/wiki/File:Muharat-of-the-film-Dosti-Ke-Side-Effect-8.jpg",
  license: "CC BY 3.0",
  position: "50% 20%",
};

export function photoUrl(photo: Photo, width = 1200, height?: number): string {
  if (photo.src) return photo.src;
  const h = height ? `&h=${height}` : "";
  return `https://images.unsplash.com/photo-${photo.id}?auto=format&fit=crop&w=${width}${h}&q=75`;
}

export function photoSrcSet(photo: Photo, widths = [480, 800, 1200, 1600]): string | undefined {
  if (photo.src) return undefined;
  return widths.map((w) => `${photoUrl(photo, w)} ${w}w`).join(", ");
}
