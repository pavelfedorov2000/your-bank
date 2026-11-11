import { graphql } from "gatsby";

export const fragment = graphql`
  fragment GuideHero on GuideHero {
    title
    description
    author {
      ...LinkItem
    }
  }
`;
