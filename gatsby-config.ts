import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `YourBank`,
    siteUrl: `https://pavelfedorov2000.github.io`
  },
  /**
   * GitHub Pages serves the project site from a subfolder: https://pavelfedorov2000.github.io/your-bank/.
   * Applied only with `gatsby build --prefix-paths` (npm run build:gh-pages); develop / plain build stay at the root.
   */
  pathPrefix: `/your-bank`,
  /**
   * More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
   * Learn more at: https://gatsby.dev/graphql-typegen
   */
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-sitemap",
    {
      /** All site texts live in src/data/content.json -> node type `ContentJson` */
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data",
        path: "./src/data/"
      }
    },
    {
      /**
       * Name GraphQL types after the file (content.json -> ContentJson),
       * by default single-object files are named after their folder (DataJson).
       */
      resolve: "gatsby-transformer-json",
      options: {
        typeName: ({ node }: { node: { name: string } }) =>
          `${node.name
            .split(/[-_\s]+/)
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join("")}Json`
      }
    }
  ]
};

export default config;
