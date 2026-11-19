import React, { type FC } from "react";

import { Title } from "@components/ui";

import { cn } from "@box/utils";
import type { TMaybe, TTitleProps, TWithChildren, TWithClassName } from "@box/types";

import "./TextBlock.scss";

const mainClass = "text-block";

type Props = TWithClassName<TWithChildren<{
  /** Title text from content.json; may hold <mark> around the accent (rendered as trusted HTML). */
  title: string;
  /** Look of the title: level (`as`, default h2), text style (`variant`), element class. */
  titleProps?: TTitleProps;
  /** Text under the title (muted paragraph). For other content (a list…) pass children. */
  description?: TMaybe<string>;
  /** header — intro of a section / panel; section — a titled part of a card (job card groups). */
  as?: "div" | "header" | "section";
}>>;

/**
 * Title + content (Figma "Text Container"): column with a gap.
 * Content: `description` (paragraph in the muted body style) and / or any children after it.
 * Placement, alignment and the gap (--text-block-gap) come from the mixed-in element via className.
 */
const TextBlock: FC<Props> = ({ className, title, titleProps, description, as: Tag = "div", children }) => (
  <Tag className={cn(mainClass, className)}>
    <Title {...titleProps} html={title} />
    {description && <p className={`${mainClass}__description`}>{description}</p>}
    {children}
  </Tag>
);

export default TextBlock;
