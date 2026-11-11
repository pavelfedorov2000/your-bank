import React, { type FC } from "react";

import { Icon } from "@components/ui";

import type { TIconName, TWithChildren, TWithClassName } from "@box/types";
import { cn } from "@box/utils";

import "./Badge.scss";

const mainClass = "badge";

type Props = TWithClassName<TWithChildren<{
  /** Accent icon before the text (e.g. "badge-check"). */
  icon?: TIconName;
}>>;

/** Small pill with an optional accent icon (Figma hero "No LLC Required, No Credit Check."). */
const Badge: FC<Props> = ({ icon, className, children }) => (
  <span className={cn(mainClass, className)}>
    {icon && <Icon className={`${mainClass}__icon`} name={icon} />}
    {children}
  </span>
);

export default Badge;
