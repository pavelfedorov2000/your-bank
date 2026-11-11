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
