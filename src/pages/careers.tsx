import React, { type FC } from "react";
import { graphql, type HeadFC, type PageProps } from "gatsby";

import { Layout } from "@components/layout";
import { Seo } from "@components/content";
import { BenefitsSection, CtaSection, FaqSection, JobsSection, SimpleHero, ValuesSection } from "@components/sections";

const CareersPage: FC<PageProps<Queries.CareersPageQuery>> = ({ data: { contentJson } }) => {
  if (!contentJson) return null;
  const { pages: { careers: { hero, values, benefits, jobs, cta } }, shared: { faq} } = contentJson;

  return (
    <Layout>
      <SimpleHero data={hero} />
      <ValuesSection data={values} />
      <BenefitsSection data={benefits} />
      <JobsSection data={jobs} />
      <FaqSection data={faq} />
      <CtaSection data={cta} />
    </Layout>
  );
};

export default CareersPage;

export const Head: HeadFC<Queries.CareersPageQuery> = ({ data: { contentJson }, location: { pathname } }) => (
  <>{contentJson && <Seo data={contentJson.pages.careers.seo} pathname={pathname} />}</>
);

export const query = graphql`
  query CareersPage {
    contentJson {
      pages {
        careers {
          seo {
            ...Seo
          }
          hero {
            ...SimpleHero
          }
          values {
            ...ValuesSection
          }
          benefits {
            ...BenefitsSection
          }
          jobs {
            ...JobsSection
          }
          cta {
            ...CtaSection
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
