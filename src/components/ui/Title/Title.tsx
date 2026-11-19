import React, { type FC } from "react";

import { cn, getClassNameByMods } from "@box/utils";
import type { TTitleProps, TWithChildren } from "@box/types";

import "./Title.scss";

type Props = TWithChildren<TTitleProps & Partial<{
  /** Trusted HTML from content.json instead of children (accents in <mark>). Only our own data — never user input. */
  html: string;
}>>;

const mainClass = "title";

/** Heading element: semantic level (`as`) + text style (`variant`). Content: children or `html`. */
const Title: FC<Props> = ({ as: Tag = "h2", variant, html, className, children }) => (
  <Tag
    className={cn(mainClass, getClassNameByMods(mainClass, [variant]), className)}
    {...(html ? { dangerouslySetInnerHTML: { __html: html } } : { children })}
  />
);

export default Title;
