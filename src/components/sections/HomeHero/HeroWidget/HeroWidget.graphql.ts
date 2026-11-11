import { graphql } from "gatsby";

export const fragment = graphql`
  fragment HeroWidget on HeroWidget {
    income {
      ...Stat
    }
    transactions {
      ...HeroWidgetTransactions
    }
    exchange {
      ...MoneyExchange
    }
    supportedCurrencies {
      ...CurrenciesBar
    }
  }
`;
