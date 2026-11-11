import type { TitleVariants } from "@box/constants";

/** Text style of a Title: hero, section, subtitle, card. */
export type TTitleVariant = (typeof TitleVariants)[keyof typeof TitleVariants];
