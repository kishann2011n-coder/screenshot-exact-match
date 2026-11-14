import { describe, expect, it } from "vitest";
import { waLink, validateEnquiry, enquiryMessage, isValidIndianPhone } from "@/lib/whatsapp";
import { search, SUGGESTIONS } from "@/lib/search";
import { SITE } from "@/data/site";
import { STATS, TESTIMONIALS } from "@/data/content";
import { ARTISTS } from "@/data/artists";

describe("WhatsApp hand-off", () => {
  it("uses the primary number +91 76784 87866", () => {
    expect(SITE.whatsappNumber).toBe("917678487866");
    expect(waLink("Hi")).toBe("https://wa.me/917678487866?text=Hi");
  });

  it("URL-encodes the pre-filled message", () => {
    expect(waLink("Hello & welcome\nline 2")).toBe(
      "https://wa.me/917678487866?text=Hello%20%26%20welcome%0Aline%202",
    );
  });

  it("keeps +91 85879 75898 as the alternate contact", () => {
    expect(SITE.phones.map((p) => p.e164)).toEqual(["+917678487866", "+918587975898"]);
  });
});

describe("Plan Your Event validation", () => {
  const base = { fullName: "Asha Verma", phone: "9876543210", eventType: "Wedding" };

  it("requires full name, phone and event type", () => {
    const errors = validateEnquiry({ fullName: "", phone: "", eventType: "" });
    expect(Object.keys(errors).sort()).toEqual(["eventType", "fullName", "phone"]);
  });

  it("accepts a valid enquiry", () => {
    expect(validateEnquiry(base)).toEqual({});
  });

  it("rejects invalid phone numbers", () => {
    expect(isValidIndianPhone("12345")).toBe(false);
    expect(isValidIndianPhone("5876543210")).toBe(false);
    expect(isValidIndianPhone("+91 98765 43210")).toBe(true);
  });

  it("includes every filled field in the WhatsApp message", () => {
    const msg = enquiryMessage({ ...base, location: "Rohini", guests: "300", services: ["Catering", "Decoration"] });
    expect(msg).toContain("Asha Verma");
    expect(msg).toContain("Wedding");
    expect(msg).toContain("Rohini");
    expect(msg).toContain("300");
    expect(msg).toContain("Catering, Decoration");
  });
});

describe("Search", () => {
  it("finds the wedding planning service for 'wedding'", () => {
    expect(search("wedding")[0]?.title).toBe("Wedding Planning");
  });

  it("finds Sapna Choudhary when searching haryanvi artists", () => {
    expect(search("haryanvi", "artists").map((r) => r.title)).toContain("Sapna Choudhary");
  });

  it("returns nothing for unrelated words", () => {
    expect(search("submarine repair")).toEqual([]);
  });

  it("every suggestion returns at least one result", () => {
    for (const s of SUGGESTIONS) expect(search(s.query, s.scope).length, s.label).toBeGreaterThan(0);
  });
});

describe("Honesty rules", () => {
  it("ships with no invented testimonials", () => {
    expect(TESTIMONIALS).toHaveLength(0);
  });

  it("does not show unverified company stats", () => {
    expect(STATS.filter((s) => s.label === "Events delivered")[0]?.value).toBeNull();
  });

  it("keeps the email hidden until verified", () => {
    expect(SITE.email).toBe("");
  });

  it("does not mark any artist as verified by default", () => {
    expect(ARTISTS.every((a) => a.verified === false)).toBe(true);
  });
});
