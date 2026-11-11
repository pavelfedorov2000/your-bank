import { graphql } from "gatsby";

export const fragment = graphql`
  fragment BenefitCard on Card {
    title
    description
    icon
  }
`;
