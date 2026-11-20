import { graphql } from "gatsby";

export const fragment = graphql`
  fragment SitemapTree on SitemapTree {
    page {
      ...LinkItem
    }
    sections
  }
`;
