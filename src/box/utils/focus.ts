import { FOCUSABLE_SELECTOR } from "@box/constants";

/**
 * Moves focus to the element with the id. No page jump by default (the caller decides about scrolling);
 * { preventScroll: false } — scroll it into view (e.g. the first invalid field of a long form).
 */
export const focusById = (id: string, options: FocusOptions = { preventScroll: true }) => document.getElementById(id)?.focus(options);

/** Moves focus to the first keyboard-focusable element inside the element with the id. */
export const focusFirstInside = (id: string) =>
  document.getElementById(id)?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus({ preventScroll: true });
