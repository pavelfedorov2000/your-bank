import { graphql } from "gatsby";

export const fragment = graphql`
  fragment AssetsSection on AssetsGuide {
    intro {
      ...SectionIntro
    }
    logoTitle
    logoVariants {
      label
      width
    }
    abstractTitle
    abstractDesigns {
      image
      alt
    }
  }
`;
