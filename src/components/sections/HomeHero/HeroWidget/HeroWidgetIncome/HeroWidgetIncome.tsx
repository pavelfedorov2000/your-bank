import React, { type FC } from "react";

import { Icon } from "@components/ui";

import type { TWithClassName } from "@box/types";
import { cn } from "@box/utils";

import "./HeroWidgetIncome.scss";

const mainClass = "hero-widget-income";

type Props = TWithClassName<{
  data: Queries.StatFragment;
}>;

/** "+ $5000,00 Monthly Income" pill. Placement comes from the parent's element class. */
const HeroWidgetIncome: FC<Props> = ({ className, data: { value, label } }) => (
  <div className={cn(mainClass, className)}>
    <span className={`${mainClass}__icon-circle`}>
      <Icon className={`${mainClass}__icon`} name="plus" />
    </span>
    <span className={`${mainClass}__text`}>
      <strong className={`${mainClass}__value`}>{value}</strong>
      <span className={`${mainClass}__label`}>{label}</span>
    </span>
  </div>
);

export default HeroWidgetIncome;
