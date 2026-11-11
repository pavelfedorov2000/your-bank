/** DOM ids used for a11y links (aria-controls, aria-labelledby) and anchors. Keep them unique across the page. */
export const ELEMENT_IDS = {
  menu: "header-menu",
} as const;

export type TElementId = (typeof ELEMENT_IDS)[keyof typeof ELEMENT_IDS];
