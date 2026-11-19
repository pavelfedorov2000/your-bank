import { graphql } from "gatsby";

export const fragment = graphql`
  fragment Seo on Seo {
    title
    description
  }
`;
