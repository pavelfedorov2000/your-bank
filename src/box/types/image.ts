import type { IGatsbyImageData } from "gatsby-plugin-image";

import type { TWithClassName } from "./common";

export type TImageProps = TWithClassName<{
  src: string;
  /** Text alternative. Required unless the image `isDecorative`. */
  alt?: string;
  /** Pure decoration (patterns, flags in a mock-up): empty alt + hidden from screen readers. */
  isDecorative?: boolean;
  width?: number;
  height?: number;
  /** "eager" for images in the first screen (logo, hero), "lazy" for the rest. */
  loading?: "lazy" | "eager";
}>;

/** Image field of a fragment: `image { childImageSharp { gatsbyImageData } }` (File node processed by gatsby-plugin-image). */
export type TContentImage = {
  readonly childImageSharp: { readonly gatsbyImageData: IGatsbyImageData } | null;
} | null;

/** Content photo processed by gatsby-plugin-image. */
export type TContentImageProps = TWithClassName<{
  image: TContentImage;
  /** Text alternative. Required unless the image `isDecorative`. */
  alt?: string;
  /** Pure decoration: empty alt. */
  isDecorative?: boolean;
  /** "eager" for the first screen (hero), "lazy" for the rest. */
  loading?: "lazy" | "eager";
}>;
