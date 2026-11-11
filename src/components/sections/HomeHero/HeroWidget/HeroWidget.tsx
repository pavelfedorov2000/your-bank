import React, { type FC } from "react";

import CurrenciesBar from "./CurrenciesBar";
import HeroWidgetIncome from "./HeroWidgetIncome";
import HeroWidgetTransactions from "./HeroWidgetTransactions";
import MoneyExchange from "./MoneyExchange";

import "./HeroWidget.scss";

const mainClass = "hero-widget";

type Props = {
  data: Queries.HeroWidgetFragment;
};

/** Decorative dashboard card in the Home hero. Sizes are in em: the whole widget scales with its font-size. */
const HeroWidget: FC<Props> = ({ data: { income, transactions, exchange, supportedCurrencies: currencies } }) => (
  <aside className={mainClass} aria-hidden="true">

    <HeroWidgetIncome className={`${mainClass}__income`} data={income} />

    <HeroWidgetTransactions data={transactions} />
    <MoneyExchange data={exchange} />
    <CurrenciesBar className={`${mainClass}__currencies`} data={currencies} />
  </aside>
);

export default HeroWidget;
