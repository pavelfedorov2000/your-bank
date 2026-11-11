import React, { type FC } from "react";
import { graphql, type HeadFC, type PageProps } from "gatsby";

import { Layout } from "@components/layout";
import Seo from "@components/Seo";
import {
  HomeHero,
  TabbedCardsSection,
  UseCasesSection,
  FeaturesSection,
  FaqSection,
  TestimonialsSection,
  CtaSection,
} from "@components/sections";

const IndexPage: FC<PageProps<Queries.HomePageQuery>> = ({ data: { contentJson } }) => {
  if (!contentJson) return null;
  const {
    pages: {
      home: { hero, products, useCases, features, cta }
    },
    shared: { faq, testimonials }
  } = contentJson;

  return (
    <Layout>
      <HomeHero data={hero} />
      <TabbedCardsSection data={products} />
      <UseCasesSection data={useCases} />
      <FeaturesSection data={features} />
      <FaqSection data={faq} />
      <TestimonialsSection data={testimonials} />
      <CtaSection data={cta} />
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC<Queries.HomePageQuery> = ({ data: { contentJson }, location: { pathname } }) => (
  <>{contentJson && <Seo data={contentJson.pages.home.seo} pathname={pathname} />}</>
);

export const query = graphql`
  query HomePage {
    contentJson {
      pages {
        home {
          seo {
            ...Seo
          }
          hero {
            ...HomeHero
          }
          products {
            ...TabbedCardsSection
          }
          useCases {
            ...UseCasesSection
          }
          features {
            ...FeaturesSection
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
        testimonials {
          ...TestimonialsSection
        }
      }
    }
  }
`;
