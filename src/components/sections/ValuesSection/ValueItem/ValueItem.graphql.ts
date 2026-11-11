import { graphql } from "gatsby";

export const fragment = graphql`
  fragment ValueItem on Card {
    title
    description
  }
`;
