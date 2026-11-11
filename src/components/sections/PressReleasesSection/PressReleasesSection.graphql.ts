import { graphql } from "gatsby";

export const fragment = graphql`
  fragment PressReleasesSection on PressReleases {
    intro {
      ...SectionIntro
    }
    items {
      title
      ...PressReleaseCard
    }
  }
`;
