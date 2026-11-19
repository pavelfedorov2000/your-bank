import { MEDIA_DIRECTIONS } from "@box/constants";
import type { TMediaDirection } from "@box/types";

/** Gap below a breakpoint for max queries: min and max of the same breakpoint never match together (fractional widths, zoom). */
const MAX_WIDTH_GAP = 0.02;

/**
 * Width media query for a breakpoint, for useMediaQuery / matchMedia:
 * getMediaQuery(BREAKPOINTS.sm) → "(min-width: 768px)" — from sm up;
 * getMediaQuery(BREAKPOINTS.sm, MEDIA_DIRECTIONS.max) → "(max-width: 767.98px)" — below sm.
 */
export const getMediaQuery = (breakpoint: number, direction: TMediaDirection = MEDIA_DIRECTIONS.min) =>
  direction === MEDIA_DIRECTIONS.min
    ? `(min-width: ${breakpoint}px)`
    : `(max-width: ${breakpoint - MAX_WIDTH_GAP}px)`;
