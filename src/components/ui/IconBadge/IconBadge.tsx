import React, { type FC } from "react";

import { Icon } from "@components/ui";

import { cn, getClassNameByMods } from "@box/utils";
import type { TIconName, TWithClassName, TWithPropsMods } from "@box/types";

import "./IconBadge.scss";

type Props = TWithClassName<TWithPropsMods<{
  name: TIconName;
}>>;

const mainClass = "icon-badge";

/** Icon in two nested glowing circles */
const IconBadge: FC<Props> = ({ className, name, mods }) => (
  <span className={cn(mainClass, getClassNameByMods(mainClass, mods), className)}>
    <span className={`${mainClass}__inner`}>
      <Icon className={`${mainClass}__icon`} name={name} />
    </span>
  </span>
);

export default IconBadge;
