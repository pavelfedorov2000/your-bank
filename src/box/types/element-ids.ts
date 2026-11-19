import type { ELEMENT_IDS } from "@box/constants";

/** Fixed DOM id from ELEMENT_IDS ("main-content", "header-menu"…). */
export type TElementId = (typeof ELEMENT_IDS)[keyof typeof ELEMENT_IDS];
