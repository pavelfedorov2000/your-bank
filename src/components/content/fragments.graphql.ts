import { graphql } from "gatsby";

/**
 * Shared GraphQL fragments of small content shapes used by many sections (no component of their own).
 * Fragments are global in Gatsby: any query can use ...LinkItem, ...Card etc.
 */
export const fragment = graphql`
  fragment LinkItem on LinkItem {
    label
    path
  }

  fragment Card on Card {
    title
    description
    icon
  }

  fragment Stat on Stat {
    value
    label
  }

  fragment MetaItem on MetaItem {
    label
    value
  }
`;
