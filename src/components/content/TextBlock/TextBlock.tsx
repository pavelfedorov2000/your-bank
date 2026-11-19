import React, { type FC, type ReactNode } from "react";

import { cn } from "@box/utils";
import type { TMaybe, TWithChildren, TWithClassName } from "@box/types";

import "./TextBlock.scss";

const mainClass = "text-block";

type Props = TWithClassName<Partial<TWithChildren> & {
  title: ReactNode;
  description?: TMaybe<string>;
  as?: "div" | "header" | "section";
}>;

/**
 * Title + content (Figma "Text Container"): column with a gap.
 * Content: `description` (paragraph in the muted body style) and / or any children after it.
 * Placement, alignment and the gap (--text-block-gap) come from the mixed-in element via className.
 */
const TextBlock: FC<Props> = ({ className, title, description, as: Tag = "div", children }) => (
  <Tag className={cn(mainClass, className)}>
    {title}
    {description && <p className={`${mainClass}__description`}>{description}</p>}
    {children}
  </Tag>
);

export default TextBlock;
