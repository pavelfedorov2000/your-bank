import { graphql } from "gatsby";

export const fragment = graphql`
  fragment SitemapSection on Sitemap {
    intro {
      ...SectionIntro
    }
    trees {
      page {
        path
      }
      ...SitemapTree
    }
  }
`;
