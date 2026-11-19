import { FOCUSABLE_SELECTOR } from "@box/constants";

/** Moves focus to the element with the id (no page jump: the caller decides about scrolling). */
export const focusById = (id: string) => document.getElementById(id)?.focus({ preventScroll: true });

/** Moves focus to the first keyboard-focusable element inside the element with the id. */
export const focusFirstInside = (id: string) =>
  document.getElementById(id)?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus({ preventScroll: true });
