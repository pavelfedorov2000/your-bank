import React, { type FC } from "react";

import { Icon } from "@components/ui";

import { cn, getClassNameByMods } from "@box/utils";
import type { TWithClassName } from "@box/types";

import "./IconBadge.scss";

type Props = TWithClassName<{
  name: string;
  /** lg — Products (98px on desktop), md — Use Cases cards (78px). Without it: md or the --icon-badge-* vars of a parent. */
  size?: "lg" | "md";
}>;

const mainClass = "icon-badge";

/** Icon in two nested glowing circles (Figma "Icon Container"). */
const IconBadge: FC<Props> = ({ name, size, className }) => (
  <span className={cn(mainClass, getClassNameByMods(mainClass, [size]), className)}>
    <span className={`${mainClass}__inner`}>
      <Icon className={`${mainClass}__icon`} name={name} />
    </span>
  </span>
);

export default IconBadge;
