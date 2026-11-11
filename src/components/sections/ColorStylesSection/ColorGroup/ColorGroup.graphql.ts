import { graphql } from "gatsby";

export const fragment = graphql`
  fragment ColorGroup on ColorGroup {
    title
    description
    columns
    swatches {
      name
      hex
    }
  }
`;
