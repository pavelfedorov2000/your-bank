import { graphql } from "gatsby";

export const fragment = graphql`
  fragment JobsSection on Jobs {
    intro {
      ...SectionIntro
    }
    aboutLabel
    requirementsLabel
    items {
      title
      ...JobCard
    }
  }
`;
