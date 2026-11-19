import type { TWithClassName } from "./common";

import type { TitleVariants } from "@box/constants";

/** Text style of a Title: hero, section, subtitle, card. */
export type TTitleVariant = (typeof TitleVariants)[keyof typeof TitleVariants];

/** Semantic level of a Title. */
export type TTitleAs = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

/** Look of a Title without its content: level, text style, element class (e.g. TextBlock titleProps). */
export type TTitleProps = TWithClassName<Partial<{
  /** Semantic level — independent from the text style. Default h2. */
  as: TTitleAs;
  /** Text style from the design (TitleVariants, see styles/_typography.scss). */
  variant: TTitleVariant;
}>>;
