import React, { type FC } from "react";

import { ZoomImage } from "@components/ui";
import { TextBlock } from "@components/content";

import { cn, getClassNameByMods } from "@box/utils";
import type { TWithPropsMods } from "@box/types";

import "./MissionVisionItem.scss";

const mainClass = "mission-vision-item";

type Props = TWithPropsMods<{
  data: Queries.MissionVisionItemFragment;
}>;

/** Subsection of "Mission & Vision": decorated photo + title and text. Mod `reversed` puts the photo on the right. */
const MissionVisionItem: FC<Props> = ({ data: { title, description, image, imageAlt }, mods }) => (
  <section className={cn(mainClass, getClassNameByMods(mainClass, mods))}>
    <div className={`${mainClass}__media`}>
      <ZoomImage className={`${mainClass}__image`} image={image} alt={imageAlt ?? ""} />
    </div>

    <TextBlock
      className={`${mainClass}__content`}
      title={title}
      titleProps={{ as: "h3", className: `${mainClass}__title` }}
      description={description}
    />
  </section>
);

export default MissionVisionItem;
