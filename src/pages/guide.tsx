import React, { type FC } from "react";
import { graphql, type HeadFC, type PageProps } from "gatsby";

import { Layout } from "@components/layout";
import Seo from "@components/Seo";
import { AssetsSection, ColorStylesSection, GuideHero, TypographySection } from "@components/sections";

/** Design guide of the template (Figma "🚀 Guide"): colors, typography, assets. */
const GuidePage: FC<PageProps<Queries.GuidePageQuery>> = ({ data: { contentJson } }) => {
  if (!contentJson) return null;
  const { pages: { guide: { hero, colors, typography, assets } } } = contentJson;

  return (
    <Layout>
      <GuideHero data={hero} />
      <ColorStylesSection data={colors} />
      <TypographySection data={typography} />
      <AssetsSection data={assets} />
    </Layout>
  );
};

export default GuidePage;

export const Head: HeadFC<Queries.GuidePageQuery> = ({ data: { contentJson }, location: { pathname } }) => (
  <>{contentJson && <Seo data={contentJson.pages.guide.seo} pathname={pathname} />}</>
);

export const query = graphql`
  query GuidePage {
    contentJson {
      pages {
        guide {
          seo {
            ...Seo
          }
          hero {
            ...GuideHero
          }
          colors {
            ...ColorStylesSection
          }
          typography {
            ...TypographySection
          }
          assets {
            ...AssetsSection
          }
        }
      }
    }
  }
`;
