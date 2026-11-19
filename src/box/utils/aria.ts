import { SPECIAL_CHARS } from "@box/constants";

/** Value of aria-describedby / aria-labelledby from optional ids: ("a", false, "b") → "a b", nothing → undefined (no attribute). */
export const getAriaIdList = (...ids: Array<string | false | null | undefined>) =>
  ids.filter(Boolean).join(SPECIAL_CHARS.space) || undefined;
