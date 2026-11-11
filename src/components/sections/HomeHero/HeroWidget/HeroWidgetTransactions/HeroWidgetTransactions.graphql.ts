import { graphql } from "gatsby";

export const fragment = graphql`
  fragment HeroWidgetTransactions on Transactions {
    title
    list {
      ...TransactionCard
    }
  }
`;
