import { graphql } from "gatsby";

export const fragment = graphql`
  fragment CurrencyAmount on CurrencyAmount {
    code
    name
    amount
  }

  fragment MoneyExchange on Exchange {
    title
    from {
      ...CurrencyAmount
    }
    to {
      ...CurrencyAmount
    }
    buttonLabel
  }
`;
