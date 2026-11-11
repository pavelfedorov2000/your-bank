import { graphql, useStaticQuery } from "gatsby";

/** Global layout texts (navigation, auth buttons, footer) — available in any component without a page query. */
export const useLayoutContent = () => {
  const data = useStaticQuery<Queries.LayoutContentQuery>(graphql`
    query LayoutContent {
      contentJson {
        layout {
          brand
          navigation {
            ...LinkItem
          }
          auth {
            signUp {
              ...LinkItem
            }
            login {
              ...LinkItem
            }
            logoutLabel
          }
          footer {
            contacts {
              ...Contact
            }
            socials {
              ...SocialLink
            }
            copyright
            legalLinks {
              ...LinkItem
            }
          }
        }
      }
    }
  `);

  if (!data.contentJson) {
    throw new Error("content.json is not sourced: check gatsby-source-filesystem config");
  }

  return data.contentJson.layout;
};
