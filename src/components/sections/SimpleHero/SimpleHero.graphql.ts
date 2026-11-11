import { graphql } from "gatsby";

export const fragment = graphql`
  fragment SimpleHero on SimpleHero {
    supTitle
    title {
      ...Heading
    }
    description
  }
`;
