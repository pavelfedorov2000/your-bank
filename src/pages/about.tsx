import React, { type FC } from "react";
import { graphql, type HeadFC, type PageProps } from "gatsby";
import { Layout } from "@components/layout";
import Seo from "@components/Seo";
import { SimpleHero, MissionVisionSection, PressReleasesSection } from "@components/sections";

import heroImage from "@images/heroes/about.webp";

const AboutPage: FC<PageProps<Queries.AboutPageQuery>> = ({ data: { contentJson } }) => {
  if (!contentJson) return null;
  const { pages: { about: { hero, missionVision, pressReleases } } } = contentJson;

  return (
    <Layout>
      <SimpleHero data={hero} image={heroImage} />
      <MissionVisionSection data={missionVision} />
      <PressReleasesSection data={pressReleases} />
    </Layout>
  );
};

export default AboutPage;

export const Head: HeadFC<Queries.AboutPageQuery> = ({ data: { contentJson }, location: { pathname } }) => (
  <>{contentJson && <Seo data={contentJson.pages.about.seo} pathname={pathname} />}</>
);

export const query = graphql`
  query AboutPage {
    contentJson {
      pages {
        about {
          seo {
            ...Seo
          }
          hero {
            ...SimpleHero
          }
          missionVision {
            ...MissionVisionSection
          }
          pressReleases {
            ...PressReleasesSection
          }
        }
      }
    }
  }
`;
