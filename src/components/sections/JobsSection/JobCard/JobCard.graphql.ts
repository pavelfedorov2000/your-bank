import { graphql } from "gatsby";

export const fragment = graphql`
  fragment JobCard on Job {
    title
    meta {
      ...MetaItem
    }
    about
    requirements
    button {
      ...LinkItem
    }
  }
`;
