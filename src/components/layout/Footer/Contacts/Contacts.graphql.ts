import { graphql } from "gatsby";

export const fragment = graphql`
  fragment Contact on Contact {
    type
    label
    href
    icon
  }
`;
