import React, { type FC } from "react";

import { Title, ZoomImage } from "@components/ui";

import "./SimpleHero.scss";

const mainClass = "simple-hero";

type Props = {
  data: Queries.SimpleHeroFragment;
  image: string;
};

/**
 * Hero of Careers / About / Security pages: content card overlapping the photo.
 * Grid: mobile — photo, then content pulled up over it; from sm — content (cols 1–2) over photo (cols 2–3).
 */
const SimpleHero: FC<Props> = ({ data: { supTitle, title, description }, image }) => (
  <section className={mainClass}>
    <div className={`${mainClass}__content`}>
      <div className={`${mainClass}__heading`}>
        {supTitle && <p className={`${mainClass}__sup-title`}>{supTitle}</p>}
        <Title className={`${mainClass}__title`} as="h1" html={title} />
      </div>
      <p className={`${mainClass}__description`}>{description}</p>
    </div>

    <ZoomImage className={`${mainClass}__image`} src={image} isDecorative loading="eager" />
  </section>
);

export default SimpleHero;
