import { graphql } from "gatsby";

export const fragment = graphql`
  fragment MissionVisionSection on MissionVision {
    intro {
      ...SectionIntro
    }
    items {
      title
      ...MissionVisionItem
    }
  }
`;
