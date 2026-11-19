import React, { type FC } from "react";

import { Icon } from "@components/ui";

import { cn } from "@box/utils";
import type { TIconName, TWithChildren, TWithClassName } from "@box/types";

import "./Badge.scss";

const mainClass = "badge";

type Props = TWithClassName<TWithChildren<{
  icon?: TIconName;
}>>;

/** Small pill with an optional accent icon (Figma hero "No LLC Required, No Credit Check."). */
const Badge: FC<Props> = ({ icon, className, children }) => (
  <span className={cn(mainClass, className)}>
    {icon && <Icon className={`${mainClass}__icon`} name={icon} />}
    <span className={`${mainClass}__text`}>{children}</span>
  </span>
);

export default Badge;
