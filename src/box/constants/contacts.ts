/** Kinds of company contacts in content.json (layout.footer.contacts[].type). */
export const CONTACT_TYPES = {
  email: "email",
  phone: "phone",
  location: "location",
} as const;

/** URL schemes of the contact links: "mailto:hello@…", "tel:+91…". */
export const CONTACT_HREF_PREFIXES = {
  email: "mailto:",
  phone: "tel:",
} as const;
