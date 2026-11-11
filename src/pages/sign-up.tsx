import React, { type FC } from "react";
import { graphql, type HeadFC, type PageProps } from "gatsby";

import { Layout } from "@components/layout";
import Seo from "@components/Seo";
import { AuthFormSection, TestimonialsSection } from "@components/sections";

import { AUTH_MODES, useRedirectIfAuthenticated } from "@features/auth";

const SignUpPage: FC<PageProps<Queries.SignUpPageQuery>> = ({ data: { contentJson } }) => {
  const isRedirecting = useRedirectIfAuthenticated();

  if (!contentJson || isRedirecting) return null;
  const { pages: { signUp }, shared: { testimonials} } = contentJson;

  return (
    <Layout>
      <AuthFormSection data={signUp.form} mode={AUTH_MODES.signUp} />
      <TestimonialsSection data={testimonials} />
    </Layout>
  );
};

export default SignUpPage;

export const Head: HeadFC<Queries.SignUpPageQuery> = ({ data: { contentJson }, location: { pathname } }) => (
  <>{contentJson && <Seo data={contentJson.pages.signUp.seo} pathname={pathname} />}</>
);

export const query = graphql`
  query SignUpPage {
    contentJson {
      pages {
        signUp {
          seo {
            ...Seo
          }
          form {
            ...AuthFormSection
          }
        }
      }
      shared {
        testimonials {
          ...TestimonialsSection
        }
      }
    }
  }
`;
