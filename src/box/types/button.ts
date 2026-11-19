import type { ButtonHTMLAttributes } from "react";

import type { TIconName } from "./icon";
import type { TAppLinkProps } from "./link";

import type { COMPONENT_MODS } from "@box/constants";

export type TButtonMod = (typeof COMPONENT_MODS.button)[keyof typeof COMPONENT_MODS.button];

/** Button modifiers; falsy values are skipped (`isCompact && COMPONENT_MODS.button.small`). */
export type TButtonMods = Array<TButtonMod>;

/** Native <button> attributes (type, onClick, disabled, aria-*, className, children...) + design props. */
export type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & Partial<{
  /** Renders a link when set, otherwise a <button> (native attributes apply to the <button> only). */
  to: TAppLinkProps["to"];
  /** Look of the button: color, type, size... from COMPONENT_MODS.button. */
  mods: TButtonMods;
  /** Icon after the label (e.g. chevron in "Load All FAQ's"). */
  icon: TIconName;
}>;
