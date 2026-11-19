/**
 * Accessible names (aria-label) of interface controls that have no visible text.
 * Texts from content.json (social links, providers, placeholders) stay in the data.
 */
export const ARIA_LABELS = {
  burgerBtn: {
    open: "Open menu",
    close: "Close menu",
  },
  passwordToggle: {
    show: "Show password",
    hide: "Hide password",
  },
  sliderControls: {
    testimonials: {
      prev: "Previous testimonial",
      next: "Next testimonial",
    },
  },
  nav: {
    header: "Header",
    footer: "Footer",
  },
} as const;
