import { graphql } from "gatsby";

export const fragment = graphql`
  fragment Heading on Heading {
    text
    highlight
  }
`;
