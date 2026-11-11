import React, { type FC } from "react";
import { withPrefix } from "gatsby";

import { Card, Title, ZoomImage } from "@components/ui";
import { MetaTags } from "@components/content";

import { CardMods } from "@box/constants";

import "./PressReleaseCard.scss";

const mainClass = "press-release-card";

type Props = {
  data: Queries.PressReleaseCardFragment;
};

/** About "Press Releases" card: photo, title, meta tags (location, date), description. */
const PressReleaseCard: FC<Props> = ({ data: { title, image, meta, description } }) => (
  <Card className={mainClass} as="article" mods={[CardMods.Surface]}>
    <ZoomImage className={`${mainClass}__image`} src={withPrefix(image)} isDecorative />

    <div className={`${mainClass}__body`}>
      <div className={`${mainClass}__head`}>
        <Title className={`${mainClass}__title`} as="h3">
          {title}
        </Title>
        <MetaTags className={`${mainClass}__tags`} items={meta} />
      </div>

      <p className={`${mainClass}__description`}>{description}</p>
    </div>
  </Card>
);

export default PressReleaseCard;
