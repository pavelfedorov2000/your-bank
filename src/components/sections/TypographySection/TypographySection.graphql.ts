import { graphql } from "gatsby";

export const fragment = graphql`
  fragment TypographySection on TypographyGuide {
    intro {
      ...SectionIntro
    }
    fontName
    weightsTitle
    weights {
      label
      value
    }
    charsets {
      title
      characters
    }
  }
`;
