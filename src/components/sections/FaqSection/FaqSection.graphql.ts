import { graphql } from "gatsby";

export const fragment = graphql`
  fragment FaqSection on Faq {
    intro {
      ...SectionIntro
    }
    items {
      question
      answer
    }
    loadMoreButtonText
  }
`;
