import React, { type FC } from "react";

import type { TTitleVariant, TWithChildren, TWithClassName } from "@box/types";
import { cn, getClassNameByMods } from "@box/utils";

import "./Title.scss";

type Props = TWithClassName<TWithChildren<Partial<{
  /** Semantic level — independent from the text style. */
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /** Text style from the design (TitleVariants, see styles/_typography.scss). Without it only the className styles apply. */
  variant: TTitleVariant;
}>>>;

const mainClass = "title";

/** Heading element: semantic level (`as`) + text style (`variant`). */
const Title: FC<Props> = ({ as: Tag = "h2", variant, className, children }) => (
  <Tag className={cn(mainClass, getClassNameByMods(mainClass, [variant]), className)}>{children}</Tag>
);

export default Title;
