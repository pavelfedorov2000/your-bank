import { graphql } from "gatsby";

export const fragment = graphql`
  fragment UseCasesSection on UseCases {
    intro {
      ...SectionIntro
    }
    groups {
      audience
      title
      description
      cases {
        title
        icon
      }
      stats {
        ...Stat
      }
      button {
        ...LinkItem
      }
    }
  }
`;
