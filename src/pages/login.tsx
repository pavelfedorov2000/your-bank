import React, { type FC } from "react";
import { graphql, type HeadFC, type PageProps } from "gatsby";

import { Layout } from "@components/layout";
import Seo from "@components/Seo";
import { AuthFormSection, TestimonialsSection } from "@components/sections";

import { AUTH_MODES, useRedirectIfAuthenticated } from "@features/auth";

const LoginPage: FC<PageProps<Queries.LoginPageQuery>> = ({ data: { contentJson } }) => {
  const isRedirecting = useRedirectIfAuthenticated();

  if (!contentJson || isRedirecting) return null;
  const { pages: { login}, shared: { testimonials} } = contentJson;

  return (
    <Layout>
      <AuthFormSection data={login.form} mode={AUTH_MODES.login} />
      <TestimonialsSection data={testimonials} />
    </Layout>
  );
};

export default LoginPage;

export const Head: HeadFC<Queries.LoginPageQuery> = ({ data: { contentJson }, location: { pathname } }) => (
  <>{contentJson && <Seo data={contentJson.pages.login.seo} pathname={pathname} />}</>
);

export const query = graphql`
  query LoginPage {
    contentJson {
      pages {
        login {
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
