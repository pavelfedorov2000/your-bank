import { graphql } from "gatsby";

export const fragment = graphql`
  fragment MissionVisionItem on MissionVisionItem {
    title
    description
    imageAlt
    image {
      childImageSharp {
        # Width in the layout (Desktop / Laptop / Mobile): the browser picks the file for it × screen density
        gatsbyImageData(sizes: "(min-width: 1920px) 550px, (min-width: 1440px) 485px, 100vw")
      }
    }
  }
`;
