import { graphql } from "gatsby";

export const fragment = graphql`
  fragment HomeHero on HomeHero {
    badge
    title {
      ...Heading
    }
    description
    button {
      ...LinkItem
    }
    widget {
      ...HeroWidget
    }
  }
`;
