import type { MEDIA_DIRECTIONS } from "@box/constants";

/** "min" | "max" from MEDIA_DIRECTIONS. */
export type TMediaDirection = (typeof MEDIA_DIRECTIONS)[keyof typeof MEDIA_DIRECTIONS];
