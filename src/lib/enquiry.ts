// Enquiry form logic shared by the form component and its tests.
// Nothing here touches the network: the enquiry becomes a WhatsApp
// message on the visitor's own device.

export const interestOptions = [
  "Skincare and Cosmetics",
  "Haircare and Serums",
  "Weight Management Products",
  "Supplements",
  "Wellness Accessories",
  "Other Products",
] as const;

export type Interest = (typeof interestOptions)[number];

export type EnquiryValues = {
  name: string;
  email: string;
  whatsapp: string;
  interests: string[];
  idea: string;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Normalises a typed WhatsApp number to E.164 style ("+" and digits). */
export function normaliseWhatsApp(raw: string): string | null {
  const trimmed = raw.trim().replace(/^00/, "+");
  const digits = trimmed.replace(/[^\d]/g, "");
  if (!trimmed.startsWith("+")) return null;
  if (digits.length < 8 || digits.length > 15) return null;
  if (digits.startsWith("0")) return null;
  return `+${digits}`;
}

export function validateEnquiry(values: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!emailPattern.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (!normaliseWhatsApp(values.whatsapp))
    errors.whatsapp = "Enter your number with the international code, for example +44 7700 900123.";
  if (values.interests.length === 0) errors.interests = "Select at least one product interest.";
  if (values.idea.trim().length > 1500) errors.idea = "Please keep this under 1,500 characters.";
  return errors;
}

/** The message the visitor reviews in WhatsApp before sending. */
export function buildEnquiryMessage(values: EnquiryValues, siteName: string, domain: string): string {
  const lines = [
    `New enquiry via ${domain}`,
    "",
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    `WhatsApp: ${normaliseWhatsApp(values.whatsapp) ?? values.whatsapp.trim()}`,
    `Product interests: ${values.interests.join(", ")}`,
  ];
  const idea = values.idea.trim();
  if (idea) {
    lines.push("", "About the idea:", idea);
  }
  lines.push("", `Sent to ${siteName} from the website enquiry form.`);
  return lines.join("\n");
}

export function buildWhatsAppUrl(destinationNumber: string, message: string): string {
  return `https://wa.me/${destinationNumber}?text=${encodeURIComponent(message)}`;
}
