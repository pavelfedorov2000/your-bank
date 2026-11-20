import React, { type FC } from "react";
import { graphql, type HeadFC, type PageProps } from "gatsby";

import { Layout } from "@components/layout";
import { Seo } from "@components/content";
import { GuideHero, SitemapSection } from "@components/sections";

/** Sitemap of the template (Figma "⭐ Sitemap"): every page and its sections. */
const SitemapPage: FC<PageProps<Queries.SitemapPageQuery>> = ({ data: { contentJson } }) => {
  if (!contentJson) return null;
  const { shared: { templateHero }, pages: { sitemap: { sitemap } } } = contentJson;

  return (
    <Layout>
      <GuideHero data={templateHero} />
      <SitemapSection data={sitemap} />
    </Layout>
  );
};

export default SitemapPage;

export const Head: HeadFC<Queries.SitemapPageQuery> = ({ data: { contentJson }, location: { pathname } }) => (
  <>{contentJson && <Seo data={contentJson.pages.sitemap.seo} pathname={pathname} />}</>
);

export const query = graphql`
  query SitemapPage {
    contentJson {
      shared {
        templateHero {
          ...GuideHero
        }
      }
      pages {
        sitemap {
          seo {
            ...Seo
          }
          sitemap {
            ...SitemapSection
          }
        }
      }
    }
  }
`;
