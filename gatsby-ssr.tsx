import React from "react";
import type { GatsbySSR } from "gatsby";

// Font from the design: Lexend (Google Fonts). Added once to <head> of every page.
// Without JS the preloader (Layout/Preloader) would never hide: it's hidden right away.
export const onRenderBody: GatsbySSR["onRenderBody"] = ({ setHeadComponents }) => {
  setHeadComponents([
    <link key="gf-preconnect" rel="preconnect" href="https://fonts.googleapis.com" />,
    <link key="gf-preconnect-static" rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />,
    <link
      key="gf-lexend"
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap"
    />,
    <noscript key="no-preloader">
      <style>{".preloader { display: none; }"}</style>
    </noscript>,
  ]);
};
