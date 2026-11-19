import type { CONTACT_TYPES } from "@box/constants";

/** Kind of a company contact (GraphQL enum ContactType). */
export type TContactType = (typeof CONTACT_TYPES)[keyof typeof CONTACT_TYPES];
