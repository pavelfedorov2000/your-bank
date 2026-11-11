import React, { type FC } from "react";
import { withPrefix } from "gatsby";

import { Title, ZoomImage } from "@components/ui";
import { TextBlock } from "@components/content";

import type { TWithPropsMods } from "@box/types";
import { cn, getClassNameByMods } from "@box/utils";

import "./MissionVisionItem.scss";

const mainClass = "mission-vision-item";

type Props = TWithPropsMods<{
  data: Queries.MissionVisionItemFragment;
}>;

/** Subsection of "Mission & Vision": decorated photo + title and text. Mod `reversed` puts the photo on the right. */
const MissionVisionItem: FC<Props> = ({ data: { title, description, image }, mods }) => (
  <section className={cn(mainClass, getClassNameByMods(mainClass, mods))}>
    <div className={`${mainClass}__media`}>
      <ZoomImage className={`${mainClass}__image`} src={withPrefix(image)} isDecorative />
    </div>

    <TextBlock
      className={`${mainClass}__content`}
      title={
        <Title className={`${mainClass}__title`} as="h3">
          {title}
        </Title>
      }
      description={description}
    />
  </section>
);

export default MissionVisionItem;
