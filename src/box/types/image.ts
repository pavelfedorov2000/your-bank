import type { GatsbyImageProps, IGatsbyImageData } from "gatsby-plugin-image";
import type { ImgHTMLAttributes } from "react";

import type { TWithClassName } from "./common";

type TImgAttributes = ImgHTMLAttributes<HTMLImageElement>;

/** Plain `<img>`: src / alt / width / height / loading as in the HTML attributes. */
export type TImageProps = TWithClassName<
  Required<Pick<TImgAttributes, "src">> &
    Pick<TImgAttributes, "alt" | "width" | "height" | "loading"> & {
      /** Pure decoration (patterns, flags in a mock-up): empty alt + hidden from screen readers. */
      isDecorative?: boolean;
    }
>;

/** Image field of a fragment: `image { childImageSharp { gatsbyImageData } }` (File node processed by gatsby-plugin-image). */
export type TContentImage = {
  readonly childImageSharp: { readonly gatsbyImageData: IGatsbyImageData } | null;
} | null;

/**
 * Content photo processed by gatsby-plugin-image: alt / loading as in GatsbyImage.
 * alt is required: "" — decorative (the text next to it carries the meaning), otherwise — what the photo shows.
 */
export type TContentImageProps = TWithClassName<
  Pick<GatsbyImageProps, "alt" | "loading"> & {
    image: TContentImage;
  }
>;
