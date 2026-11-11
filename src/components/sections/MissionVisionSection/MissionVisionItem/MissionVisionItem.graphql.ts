import { graphql } from "gatsby";

export const fragment = graphql`
  fragment MissionVisionItem on MissionVisionItem {
    title
    description
    image
  }
`;
