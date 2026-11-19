import { graphql } from "gatsby";

export const fragment = graphql`
  fragment CtaSection on Cta {
    title
    description
    button {
      ...LinkItem
    }
  }
`;
