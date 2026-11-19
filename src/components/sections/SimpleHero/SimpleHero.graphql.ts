import { graphql } from "gatsby";

export const fragment = graphql`
  fragment SimpleHero on SimpleHero {
    supTitle
    title
    description
    imageAlt
    image {
      childImageSharp {
        # Width in the layout (Desktop / Laptop / Mobile): the browser picks the file for it × screen density
        gatsbyImageData(sizes: "(min-width: 1920px) 966px, (min-width: 1440px) 792px, 100vw")
      }
    }
  }
`;
