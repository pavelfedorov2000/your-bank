import { graphql } from "gatsby";

export const fragment = graphql`
  fragment ValuesSection on IntroWithCards {
    intro {
      ...SectionIntro
    }
    items {
      title
      ...ValueItem
    }
  }
`;
