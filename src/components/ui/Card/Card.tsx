import React, { type FC } from "react";

import { cn, getClassNameByMods } from "@box/utils";
import type { TWithChildren, TWithClassName, TWithPropsMods } from "@box/types";

import "./Card.scss";

const mainClass = "card";

type Props = TWithClassName<TWithPropsMods<TWithChildren<{
  as?: "div" | "article" | "section";
}>>>;

/**
 * Card frame: 1px border, radius, paddings, vertical rhythm. Fill via mods (COMPONENT_MODS.card).
 * A card block mixed in via className (job-card, faq__item…) sets the sizes through --card-* vars.
 */
const Card: FC<Props> = ({ as: Tag = "div", mods, className, children }) => (
  <Tag className={cn(mainClass, getClassNameByMods(mainClass, mods), className)}>{children}</Tag>
);

export default Card;
