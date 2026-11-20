import { FOCUS_OPTIONS, FOCUSABLE_SELECTOR } from "@box/constants";

/**
 * Moves focus to the element with the id. No page jump by default (the caller decides about scrolling);
 * FOCUS_OPTIONS.scrollIntoView — scroll it into view (e.g. the first invalid field of a long form).
 */
export const focusById = (id: string, options: FocusOptions = FOCUS_OPTIONS.noScroll) => document.getElementById(id)?.focus(options);

/** Moves focus to the first keyboard-focusable element inside the element with the id. */
export const focusFirstInside = (id: string) =>
  document.getElementById(id)?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus(FOCUS_OPTIONS.noScroll);
