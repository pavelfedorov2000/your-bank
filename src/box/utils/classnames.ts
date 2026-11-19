import { SPECIAL_CHARS } from "@box/constants";
import type { TClassValue, TPropsMods } from "@box/types";

/** Joins class names, skipping falsy values; nested arrays (e.g. from getClassNameByMods) are flattened. */
export const cn = (...values: TClassValue[]): string =>
  values
    .flat(Infinity as 1)
    .filter(Boolean)
    .join(SPECIAL_CHARS.space);

/**
 * BEM modifiers: getClassNameByMods("header__menu", [isOpen && GENERAL_MODS.open]) → ["header__menu--open"].
 * Falsy items are skipped, so conditions can be written inline.
 */
export const getClassNameByMods = (className: string, mods: TPropsMods = []) =>
  mods.filter(Boolean).map((mod) => `${className}--${mod}`);
