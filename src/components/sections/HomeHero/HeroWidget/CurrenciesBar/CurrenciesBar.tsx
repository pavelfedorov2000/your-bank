import React, { type FC } from "react";

import { Icon, List } from "@components/ui";

import type { TWithClassName } from "@box/types";
import { cn } from "@box/utils";

import "./CurrenciesBar.scss";

const mainClass = "currencies-bar";

type Props = TWithClassName<{
  data: Queries.CurrenciesBarFragment;
}>;

/** "Supported Currency" pill: label + currency icons. Placement comes from the parent's element class. */
const CurrenciesBar: FC<Props> = ({ data: { label, list }, className }) => (
  <div className={cn(mainClass, className)}>
    <span className={`${mainClass}__label`}>{label}</span>
    <List
      className={`${mainClass}__list`}
      items={list}
      getKey={(currency) => currency.code}
      renderItem={(currency) => <Icon className={`${mainClass}__icon`} name={currency.icon} title={currency.code} />}
    />
  </div>
);

export default CurrenciesBar;
