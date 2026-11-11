import { graphql } from "gatsby";

export const fragment = graphql`
  fragment TransactionCard on Transaction {
    label
    name
    amount
  }
`;
