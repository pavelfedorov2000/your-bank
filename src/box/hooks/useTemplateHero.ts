import { graphql, useStaticQuery } from "gatsby";

/** Banner of the template (guide, sitemap, preloader) — available in any component without a page query. */
export const useTemplateHero = () => {
  const data = useStaticQuery<Queries.TemplateHeroQuery>(graphql`
    query TemplateHero {
      contentJson {
        shared {
          templateHero {
            ...GuideHero
          }
        }
      }
    }
  `);

  if (!data.contentJson) {
    throw new Error("content.json is not sourced: check gatsby-source-filesystem config");
  }

  return data.contentJson.shared.templateHero;
};
