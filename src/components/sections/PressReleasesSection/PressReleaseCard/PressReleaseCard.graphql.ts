import { graphql } from "gatsby";

export const fragment = graphql`
  fragment PressReleaseCard on PressRelease {
    title
    image
    meta {
      ...MetaItem
    }
    description
  }
`;
