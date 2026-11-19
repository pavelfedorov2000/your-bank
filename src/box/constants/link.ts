/** Attributes of a link to another site: new tab, no access to window.opener, no referrer. */
export const EXTERNAL_LINK_ATTRS = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
