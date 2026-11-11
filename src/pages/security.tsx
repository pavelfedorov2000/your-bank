import React, { type FC } from "react";
import { graphql, type HeadFC, type PageProps } from "gatsby";

import { Layout } from "@components/layout";
import Seo from "@components/Seo";
import { SimpleHero, ProtectionSection, FaqSection } from "@components/sections";

import heroImage from "@images/heroes/security.webp";

const SecurityPage: FC<PageProps<Queries.SecurityPageQuery>> = ({ data: { contentJson } }) => {
  if (!contentJson) return null;
  const { pages: { security: { hero, protection } }, shared: { faq} } = contentJson;

  return (
    <Layout>
      <SimpleHero data={hero} image={heroImage} />
      <ProtectionSection data={protection} />
      <FaqSection data={faq} />
    </Layout>
  );
};

export default SecurityPage;

export const Head: HeadFC<Queries.SecurityPageQuery> = ({ data: { contentJson }, location: { pathname } }) => (
  <>{contentJson && <Seo data={contentJson.pages.security.seo} pathname={pathname} />}</>
);

export const query = graphql`
  query SecurityPage {
    contentJson {
      pages {
        security {
          seo {
            ...Seo
          }
          hero {
            ...SimpleHero
          }
          protection {
            ...ProtectionSection
          }
        }
      }
      shared {
        faq {
          ...FaqSection
        }
      }
    }
  }
`;
