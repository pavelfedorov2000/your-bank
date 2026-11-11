import { graphql } from "gatsby";

export const fragment = graphql`
  fragment TabbedCardsSection on TabbedCards {
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
