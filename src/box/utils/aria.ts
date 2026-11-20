import type { TSkippable } from "@box/types";

/** Value of aria-describedby / aria-labelledby from optional ids: ("a", false, "b") → "a b", nothing → undefined (no attribute). */
export const getAriaIdList = (...ids: Array<TSkippable<string> | null>) =>
  ids.filter(Boolean).join(" ") || undefined;
