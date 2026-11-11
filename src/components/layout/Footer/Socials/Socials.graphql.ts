import { graphql } from "gatsby";

export const fragment = graphql`
  fragment SocialLink on SocialLink {
    label
    href
    icon
  }
`;
