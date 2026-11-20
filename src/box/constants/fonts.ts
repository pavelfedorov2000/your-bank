/** Font of the design from Google Fonts, connected in gatsby-ssr.tsx. */
export const GOOGLE_FONTS = {
  /** Origins to preconnect: the CSS comes from googleapis, the font files from gstatic */
  origins: {
    css: "https://fonts.googleapis.com",
    files: "https://fonts.gstatic.com",
  },
  /** Keep in sync with --font-family in global.scss */
  family: "Lexend",
  /** Keep in sync with --font-weight-* in global.scss */
  weights: [300, 400, 500, 600, 700],
} as const;
