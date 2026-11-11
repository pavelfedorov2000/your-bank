import React, { type FC } from "react";
import { withPrefix } from "gatsby";
import { useSiteMetadata } from "@box/hooks";
import type { TWithChildren } from "@box/types";

type Props = Partial<TWithChildren> & {
  data: Queries.SeoFragment;
  pathname?: string;
};

const DEFAULT_TITLE = "YourBank";

/** Used inside each page's `export const Head`. */
const Seo: FC<Props> = ({ data: { title, description}, pathname = "", children }) => {
  const { title: siteTitle = DEFAULT_TITLE, siteUrl } = useSiteMetadata() ?? {};

  return (
    <>
      <html lang="en" />
      <title>{`${title} | ${siteTitle}`}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {siteUrl && <meta property="og:url" content={`${siteUrl}${pathname}`} />}
      {/** Logo mark without the wordmark: SVG for modern browsers, ICO fallback, PNG for iOS home screen. */}
      <link rel="icon" href={withPrefix("/favicon.svg")} type="image/svg+xml" />
      <link rel="icon" href={withPrefix("/favicon.ico")} sizes="32x32" />
      <link rel="apple-touch-icon" href={withPrefix("/apple-touch-icon.png")} />
      {children}
    </>
  );
};

export default Seo;
