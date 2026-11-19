import { graphql } from "gatsby";

export const fragment = graphql`
  fragment NotFoundSection on NotFound {
    code
    title
    description
    button {
      ...LinkItem
    }
    secondaryButton {
      ...LinkItem
    }
  }
`;
