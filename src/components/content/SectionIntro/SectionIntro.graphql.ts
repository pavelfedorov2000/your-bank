import { graphql } from "gatsby";

export const fragment = graphql`
  fragment SectionIntro on SectionIntro {
    title {
      ...Heading
    }
    description
  }
`;
