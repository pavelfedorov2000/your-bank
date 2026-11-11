import React, { type FC } from "react";

import flagIn from "@images/decor/flag-in.png";
import flagUs from "@images/decor/flag-us.png";

import { Button, Image, Title } from "@components/ui";

import "./MoneyExchange.scss";

const mainClass = "money-exchange";

/** Currency flags (not part of the content, purely decorative). */
const FLAGS: Record<string, string> = {
  INR: flagIn,
  USD: flagUs,
};

type Props = {
  data: Queries.MoneyExchangeFragment;
};

/** "Money Exchange": 2×2 table (currencies on top, amounts below) + exchange pill. */
const MoneyExchange: FC<Props> = ({ data: { title, from, to, buttonLabel } }) => {
  const currencies = [from, to];

  return (
    <section className={mainClass}>
      <Title className={`${mainClass}__title`} as="h3">
        {title}
      </Title>
      <div className={`${mainClass}__table`}>
        {currencies.map((currency) => (
          <div className={`${mainClass}__currency`} key={currency.code}>
            <span className={`${mainClass}__code`}>
              {FLAGS[currency.code] && <Image className={`${mainClass}__flag`} src={FLAGS[currency.code]} isDecorative />}
              {currency.code}
            </span>
            <span className={`${mainClass}__name`}>{currency.name}</span>
          </div>
        ))}
        {currencies.map((currency) => (
          <div className={`${mainClass}__amount`} key={`${currency.code}-amount`}>
            {currency.amount}
          </div>
        ))}
      </div>
      {/** No action yet; tabIndex -1: the whole widget is decorative (aria-hidden) */}
      <Button className={`${mainClass}__button`} tabIndex={-1}>
        {buttonLabel}
      </Button>
    </section>
  );
};

export default MoneyExchange;
