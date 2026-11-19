/** Media queries checked from JS (useMediaQuery, matchMedia). Breakpoints — BREAKPOINTS. */
export const MEDIA_QUERIES = {
  /** The user asked the system to minimize animations */
  reducedMotion: "(prefers-reduced-motion: reduce)",
} as const;

/** Side of a width media query: from the breakpoint up (min, mobile-first) or below it (max). */
export const MEDIA_DIRECTIONS = {
  min: "min",
  max: "max",
} as const;
