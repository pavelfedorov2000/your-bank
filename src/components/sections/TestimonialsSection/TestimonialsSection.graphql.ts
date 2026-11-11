import { graphql } from "gatsby";

export const fragment = graphql`
  fragment TestimonialsSection on Testimonials {
    intro {
      ...SectionIntro
    }
    tabs {
      label
      items {
        author
        ...TestimonialCard
      }
    }
  }
`;
