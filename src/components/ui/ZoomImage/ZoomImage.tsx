import React, { type FC } from "react";
import { GatsbyImage } from "gatsby-plugin-image";

import { cn } from "@box/utils";
import type { TContentImageProps } from "@box/types";

import "./ZoomImage.scss";

const mainClass = "zoom-image";

/**
 * Content photo (gatsby-plugin-image: srcset for 1x–3x screens, webp / avif, placeholder) that slightly zooms in on hover.
 * The wrapper clips the zoom: size, aspect ratio and border radius go to it via className (mix), the image covers it.
 */
const ZoomImage: FC<TContentImageProps> = ({ className, image, alt = "", isDecorative = false, loading = "lazy" }) => {
  const imageData = image?.childImageSharp?.gatsbyImageData;

  return (
    <div className={cn(mainClass, className)}>
      {imageData && (
        <GatsbyImage className={`${mainClass}__img`} image={imageData} alt={isDecorative ? "" : alt} loading={loading} />
      )}
    </div>
  );
};

export default ZoomImage;
