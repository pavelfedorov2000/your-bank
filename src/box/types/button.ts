import type { ButtonHTMLAttributes } from "react";
import type { TIconName } from "./icon";
import type { ButtonMods } from "@box/constants";

export type TButtonMod = (typeof ButtonMods)[keyof typeof ButtonMods];

/** Button modifiers; falsy values are skipped (`isCompact && ButtonMods.Small`). */
export type TButtonMods = Array<TButtonMod | false | null | undefined>;

/** Native <button> attributes (type, onClick, disabled, aria-*, className, children...) + design props. */
export type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Renders a link when set, otherwise a <button> (native attributes apply to the <button> only). */
  to?: string;
  /** Look of the button: color, type, size... from ButtonMods. */
  mods?: TButtonMods;
  /** Icon after the label (e.g. chevron in "Load All FAQ's"). */
  icon?: TIconName;
};
