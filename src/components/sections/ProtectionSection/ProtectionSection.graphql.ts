import { graphql } from "gatsby";

export const fragment = graphql`
  fragment ProtectionSection on IntroWithCards {
    intro {
      ...SectionIntro
    }
    items {
      title
      ...BenefitCard
    }
  }
`;
