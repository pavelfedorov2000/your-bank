import { GOOGLE_FONTS } from "@box/constants";

/** Stylesheet of the Google font: ".../css2?family=Lexend:wght@300;400;500;600;700&display=swap" (text visible while it loads). */
export const getGoogleFontsUrl = () => {
  const { origins, family, weights } = GOOGLE_FONTS;

  return `${origins.css}/css2?family=${family}:wght@${weights.join(";")}&display=swap`;
};
