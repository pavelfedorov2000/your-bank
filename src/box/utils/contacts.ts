import { CONTACT_TYPES, REG_EXP_PATTERNS } from "@box/constants";

/** "hello@skillbirdge.com" → "mailto:hello@skillbirdge.com" */
export const getEmailHref = (email: string): string => `mailto:${email.trim()}`;

/** "+91 91813 23 2309" → "tel:+9191813232309": digits only, the leading "+" is kept. */
export const getPhoneHref = (phone: string): string => {
  const digits = phone.replace(REG_EXP_PATTERNS.nonDigits, "");

  return `tel:${phone.trim().startsWith("+") ? "+" : ""}${digits}`;
};

/** Link of a contact by its type: mailto: / tel:, null for contacts without a link (location). */
export const getContactHref = (type: string, label: string): string | null => {
  switch (type) {
    case CONTACT_TYPES.email:
      return getEmailHref(label);
    case CONTACT_TYPES.phone:
      return getPhoneHref(label);
    default:
      return null;
  }
};
