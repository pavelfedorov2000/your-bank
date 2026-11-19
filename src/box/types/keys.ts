import type { KEYS } from "@box/constants";

/** KeyboardEvent.key value from KEYS ("Escape", "ArrowLeft"…). */
export type TKey = (typeof KEYS)[keyof typeof KEYS];
