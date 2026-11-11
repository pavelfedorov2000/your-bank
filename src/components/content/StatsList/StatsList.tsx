import React, { type FC } from "react";

import type { TWithClassName } from "@box/types";
import { cn } from "@box/utils";

import "./StatsList.scss";

const mainClass = "stats-list";

type Props = TWithClassName<{
  items: readonly Queries.StatFragment[];
}>;

/** Figures with captions ("78% Secure Retirement Planning"): a description list, column on mobile, row with dividers from sm. */
const StatsList: FC<Props> = ({ className, items }) => (
  <dl className={cn(mainClass, className)}>
    {items.map((stat) => (
      <div className={`${mainClass}__item`} key={stat.label}>
        <dt className={`${mainClass}__value`}>{stat.value}</dt>
        <dd className={`${mainClass}__label`}>{stat.label}</dd>
      </div>
    ))}
  </dl>
);

export default StatsList;
