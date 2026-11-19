import { graphql } from "gatsby";

export const fragment = graphql`
  fragment PressReleaseCard on PressRelease {
    title
    image {
      childImageSharp {
        # Width in the layout (Desktop / Laptop / Mobile): the browser picks the file for it × screen density
        gatsbyImageData(sizes: "(min-width: 1920px) 723px, (min-width: 1440px) 646px, 100vw")
      }
    }
    meta {
      ...MetaItem
    }
    description
  }
`;
