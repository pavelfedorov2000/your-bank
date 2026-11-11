import React, { type FC } from "react";

import { List, Title } from "@components/ui";

import TransactionCard from "../TransactionCard";

import "./HeroWidgetTransactions.scss";

const mainClass = "hero-widget-transactions";

type Props = {
  data: Queries.HeroWidgetTransactionsFragment;
};

/** "Your Transactions": cards stacked over each other, every next one is narrower and more transparent. */
const HeroWidgetTransactions: FC<Props> = ({ data: { title, list } }) => (
  <section className={mainClass}>
    <Title className={`${mainClass}__title`} as="h3">
      {title}
    </Title>
    <List
      className={`${mainClass}__list`}
      itemClassName={`${mainClass}__item`}
      items={list}
      getKey={(tx) => tx.name}
      renderItem={(tx) => <TransactionCard data={tx} />}
    />
  </section>
);

export default HeroWidgetTransactions;
