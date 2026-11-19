import { graphql } from "gatsby";

export const fragment = graphql`
  fragment AuthFormSection on AuthForm {
    title
    description
    fields {
      name
      type
      placeholder
      autoComplete
    }
    forgotPasswordLabel
    submitLabel
    secondaryButton {
      ...LinkItem
    }
    socialLabel
    socialProviders {
      name
      icon
    }
  }
`;
