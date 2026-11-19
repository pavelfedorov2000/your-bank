import React, { type FC } from "react";

import { Icon } from "@components/ui";

import { ICON_NAMES } from "@box/constants";

import "./TransactionCard.scss";

const mainClass = "transaction-card";

type Props = {
  data: Queries.TransactionCardFragment;
};

/** One transaction in the hero widget: swap icon, label + name, amount. */
const TransactionCard: FC<Props> = ({ data: { label, name, amount } }) => (
  <div className={mainClass}>
    <span className={`${mainClass}__info`}>
      <span className={`${mainClass}__icon-circle`}>
        <Icon className={`${mainClass}__icon`} name={ICON_NAMES.swap} />
      </span>
      <span className={`${mainClass}__text`}>
        <span className={`${mainClass}__label`}>{label}</span>
        <span className={`${mainClass}__name`}>{name}</span>
      </span>
    </span>
    <span className={`${mainClass}__amount`}>{amount}</span>
  </div>
);

export default TransactionCard;
