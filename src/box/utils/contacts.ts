import { CONTACT_HREF_PREFIXES, CONTACT_TYPES, REG_EXP_PATTERNS, SPECIAL_CHARS } from "@box/constants";
import type { TContactType } from "@box/types";

/** "hello@skillbirdge.com" → "mailto:hello@skillbirdge.com" */
export const getEmailHref = (email: string): string => `${CONTACT_HREF_PREFIXES.email}${email.trim()}`;

/** "+91 91813 23 2309" → "tel:+9191813232309": digits only, the leading "+" is kept. */
export const getPhoneHref = (phone: string): string => {
  const digits = phone.replace(REG_EXP_PATTERNS.nonDigits, "");
  const plusSign = phone.trim().startsWith(SPECIAL_CHARS.plus) ? SPECIAL_CHARS.plus : "";

  return `${CONTACT_HREF_PREFIXES.phone}${plusSign}${digits}`;
};

/** Link of a contact by its type: mailto: / tel:, null for contacts without a link (location). */
export const getContactHref = (type: TContactType, label: string): string | null => {
  switch (type) {
    case CONTACT_TYPES.email:
      return getEmailHref(label);
    case CONTACT_TYPES.phone:
      return getPhoneHref(label);
    default:
      return null;
  }
};
