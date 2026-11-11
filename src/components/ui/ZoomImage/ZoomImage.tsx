import React, { type FC } from "react";

import { Image } from "@components/ui";

import type { TImageProps } from "@box/types";
import { cn } from "@box/utils";

import "./ZoomImage.scss";

const mainClass = "zoom-image";

/**
 * Content photo that slightly zooms in on hover. The wrapper clips the zoom:
 * size, aspect ratio and border radius go to the wrapper via className (mix), the <img> just covers it.
 */
const ZoomImage: FC<TImageProps> = ({ className, ...imageProps }) => (
  <div className={cn(mainClass, className)}>
    <Image className={`${mainClass}__img`} {...imageProps} />
  </div>
);

export default ZoomImage;
