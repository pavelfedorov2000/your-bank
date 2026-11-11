import { graphql } from "gatsby";

export const fragment = graphql`
  fragment TestimonialCard on Testimonial {
    quote
    author
  }
`;
