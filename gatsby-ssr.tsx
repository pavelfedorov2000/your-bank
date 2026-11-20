import React from "react";
import type { GatsbySSR } from "gatsby";

import { PRELOADER_CLASS } from "@components/layout/Layout/Preloader";

import { getGoogleFontsUrl } from "@box/utils";
import { GOOGLE_FONTS } from "@box/constants";

/**
 * Added once to <head> of every page:
 * - the font of the design (GOOGLE_FONTS): preconnect to both origins + the stylesheet;
 * - without JS the preloader would never hide: it's hidden right away.
 */
export const onRenderBody: GatsbySSR["onRenderBody"] = ({ setHeadComponents }) => {
  setHeadComponents([
    <link key="fonts-preconnect-css" rel="preconnect" href={GOOGLE_FONTS.origins.css} />,
    <link key="fonts-preconnect-files" rel="preconnect" href={GOOGLE_FONTS.origins.files} crossOrigin="anonymous" />,
    <link key="fonts-stylesheet" rel="stylesheet" href={getGoogleFontsUrl()} />,
    <noscript key="no-preloader">
      <style>{`.${PRELOADER_CLASS} { display: none; }`}</style>
    </noscript>,
  ]);
};
