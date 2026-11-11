import React, { type FC } from "react";
import { cn } from "@box/utils";
import type { TImageProps } from "@box/types";

const mainClass = "image";

/** <img> with project defaults: lazy loading, async decoding, decorative mode. */
const Image: FC<TImageProps> = ({ src, alt = "", isDecorative = false, width, height, loading = "lazy", className }) => (
  <img
    className={cn(mainClass, className)}
    src={src}
    alt={isDecorative ? "" : alt}
    aria-hidden={isDecorative}
    width={width}
    height={height}
    loading={loading}
    decoding="async"
  />
);

export default Image;
