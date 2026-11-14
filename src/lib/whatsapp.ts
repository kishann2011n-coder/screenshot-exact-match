import { SITE } from "@/data/site";

export function waLink(message: string = SITE.whatsappGreeting, number: string = SITE.whatsappNumber) {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export type Enquiry = {
  fullName: string;
  phone: string;
  eventType: string;
  eventDate?: string;
  location?: string;
  guests?: string;
  budget?: string;
  services?: string[];
  notes?: string;
};

export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>;

/** Indian mobile: optional +91 / 91 / 0 prefix, then 10 digits starting 6-9. */
export function isValidIndianPhone(value: string) {
  const digits = value.replace(/[\s\-()]/g, "");
  return /^(?:\+?91|0)?[6-9]\d{9}$/.test(digits);
}

export function validateEnquiry(e: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (e.fullName.trim().length < 2) errors.fullName = "Please enter your full name.";
  if (!e.phone.trim()) errors.phone = "Please enter your phone number.";
  else if (!isValidIndianPhone(e.phone)) errors.phone = "Please enter a valid 10-digit mobile number.";
  if (!e.eventType.trim()) errors.eventType = "Please choose an event type.";
  if (e.guests && !/^\d{1,6}$/.test(e.guests.trim())) errors.guests = "Please enter a number of guests.";
  return errors;
}

export function enquiryMessage(e: Enquiry) {
  const lines = [
    "Hello Gauri Entertainment! I'd like to plan an event.",
    "",
    `*Name:* ${e.fullName.trim()}`,
    `*Phone:* ${e.phone.trim()}`,
    `*Event type:* ${e.eventType}`,
  ];
  if (e.eventDate) lines.push(`*Event date:* ${e.eventDate}`);
  if (e.location?.trim()) lines.push(`*Location:* ${e.location.trim()}`);
  if (e.guests?.trim()) lines.push(`*Expected guests:* ${e.guests.trim()}`);
  if (e.budget) lines.push(`*Budget range:* ${e.budget}`);
  if (e.services && e.services.length) lines.push(`*Services required:* ${e.services.join(", ")}`);
  if (e.notes?.trim()) lines.push("", `*Additional requirements:* ${e.notes.trim()}`);
  return lines.join("\n");
}

export function availabilityMessage(subject: string) {
  return `Hello Gauri Entertainment! I'd like to check availability for: ${subject}. Could you please share details?`;
}
