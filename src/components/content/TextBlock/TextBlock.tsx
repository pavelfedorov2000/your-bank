import React, { type FC, type ReactNode } from "react";

import type { TMaybe, TWithClassName } from "@box/types";
import { cn } from "@box/utils";

import "./TextBlock.scss";

const mainClass = "text-block";

type Props = TWithClassName<{
  /** Ready title element (Title / Heading): its level and look stay with the caller. */
  title: ReactNode;
  description?: TMaybe<string>;
  as?: "div" | "header";
}>;

/**
 * Title + description pair (Figma "Text Container"): column with a gap, the description in the muted body style.
 * Placement, alignment and the gap (--text-block-gap) come from the mixed-in element via className.
 */
const TextBlock: FC<Props> = ({ className, title, description, as: Tag = "div" }) => (
  <Tag className={cn(mainClass, className)}>
    {title}
    {description && <p className={`${mainClass}__description`}>{description}</p>}
  </Tag>
);

export default TextBlock;
