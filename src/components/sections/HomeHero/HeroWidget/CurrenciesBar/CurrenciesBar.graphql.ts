import { graphql } from "gatsby";

export const fragment = graphql`
  fragment CurrenciesBar on SupportedCurrencies {
    label
    list {
      code
      icon
    }
  }
`;
