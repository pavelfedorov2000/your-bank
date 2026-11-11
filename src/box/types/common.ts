import type * as React from "react";

/** Adds a required `children` prop to the given props type. */
export type TWithChildren<T = {}> = T & {
  children: React.ReactNode;
};

/** Adds an optional `className` prop (BEM mix from the parent, e.g. "header__logo-image"). */
export type TWithClassName<T = {}> = T & {
  className?: string;
};

/** Value that may be explicitly empty: `T | null`. */
export type TNullable<T> = T | null;
export type TMaybe<T> = TNullable<T> | undefined;

/** BEM modifiers for getClassNameByMods: falsy values are skipped, so conditions can be inline (`isOpen && GENERAL_MODS.open`). */
export type TPropsMods = Array<string | false | null | undefined>;

/** Adds an optional `mods` prop (own BEM modifiers of the component's block). */
export type TWithPropsMods<T = {}> = T & {
  mods?: TPropsMods;
};

/** Argument of cn(): a class name, a falsy value to skip, or a nested array of them. */
export type TClassValue = string | false | null | undefined | TClassValue[];
