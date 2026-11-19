import React, { type FC } from "react";

import { cn, getClassNameByMods } from "@box/utils";
import type { TTitleVariant, TWithChildren, TWithClassName } from "@box/types";

import "./Title.scss";

type Props = TWithClassName<TWithChildren<Partial<{
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /** Text style from the design (TitleVariants, see styles/_typography.scss). */
  variant: TTitleVariant;
  /** Trusted HTML from content.json instead of children (accents in <mark>). Only our own data — never user input. */
  html: string;
}>>>;

const mainClass = "title";

/** Heading element: semantic level (`as`) + text style (`variant`). Content: children or `html`. */
const Title: FC<Props> = ({ as: Tag = "h2", variant, html, className, children }) => (
  <Tag
    className={cn(mainClass, getClassNameByMods(mainClass, [variant]), className)}
    {...(html ? { dangerouslySetInnerHTML: { __html: html } } : { children })}
  />
);

export default Title;
