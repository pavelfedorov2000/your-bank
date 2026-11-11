import React, { type FC } from "react";
import { graphql, type HeadFC, type PageProps } from "gatsby";

import { Layout } from "@components/layout";
import Seo from "@components/Seo";
import { NotFoundSection } from "@components/sections";

const NotFoundPage: FC<PageProps<Queries.NotFoundPageQuery>> = ({ data: { contentJson } }) => {
  if (!contentJson) return null;
  const { pages: { notFound: { content } } } = contentJson;

  return (
    <Layout>
      <NotFoundSection data={content} />
    </Layout>
  );
};

export default NotFoundPage;

export const Head: HeadFC<Queries.NotFoundPageQuery> = ({ data: { contentJson }, location: { pathname } }) => (
  <>{contentJson && <Seo data={contentJson.pages.notFound.seo} pathname={pathname} />}</>
);

export const query = graphql`
  query NotFoundPage {
    contentJson {
      pages {
        notFound {
          seo {
            ...Seo
          }
          content {
            ...NotFoundSection
          }
        }
      }
    }
  }
`;
