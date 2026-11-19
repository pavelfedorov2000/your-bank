import React, { type FC, type ReactNode } from "react";

import { IconBadge } from "@components/ui";

import { cn, getClassNameByMods, getIconName } from "@box/utils";
import type { TIconKey, TMaybe, TPropsMods, TWithClassName, TWithPropsMods } from "@box/types";

import "./IconTextBlock.scss";

const mainClass = "icon-text-block";

type Props = TWithClassName<TWithPropsMods<{
  icon?: TMaybe<TIconKey>;
  iconMods?: TPropsMods;
  title: ReactNode;
  description?: string;
}>>;

/**
 * Icon badge + title (+ text). Default: centered column (Products, Use Cases);
 * COMPONENT_MODS.iconTextBlock.row — icon beside the title, text below on the full width (benefit cards).
 * Gaps: --icon-text-block-head-gap (icon ↔ title), --icon-text-block-gap (head ↔ text); a parent or the mixed block sets them.
 */
const IconTextBlock: FC<Props> = ({ className, mods, icon, iconMods, title, description }) => (
  <div className={cn(mainClass, getClassNameByMods(mainClass, mods), className)}>
    <div className={`${mainClass}__head`}>
      {icon && <IconBadge className={`${mainClass}__icon`} name={getIconName(icon)} mods={iconMods} />}
      <span className={`${mainClass}__title`}>{title}</span>
    </div>
    {description && <p className={`${mainClass}__description`}>{description}</p>}
  </div>
);

export default IconTextBlock;
