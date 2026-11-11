import { graphql } from "gatsby";

export const fragment = graphql`
  fragment BenefitsSection on IntroWithCards {
    intro {
      ...SectionIntro
    }
    items {
      title
      ...BenefitCard
    }
  }
`;
