import { graphql } from "gatsby";

export const fragment = graphql`
  fragment ColorStylesSection on ColorStyles {
    intro {
      ...SectionIntro
    }
    groups {
      title
      ...ColorGroup
    }
  }
`;
