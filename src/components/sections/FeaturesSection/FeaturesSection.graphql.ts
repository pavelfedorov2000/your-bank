import { graphql } from "gatsby";

export const fragment = graphql`
  fragment FeaturesSection on TabbedCards {
    intro {
      ...SectionIntro
    }
    tabs {
      label
      items {
        ...Card
      }
    }
  }
`;
