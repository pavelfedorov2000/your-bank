/** Whether the user asked the system to minimize animations (prefers-reduced-motion). */
export const getIsReducedMotion = (): boolean => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Scroll behavior that respects prefers-reduced-motion: instant jump instead of a smooth scroll. */
export const getScrollBehavior = (): ScrollBehavior => (getIsReducedMotion() ? "auto" : "smooth");
