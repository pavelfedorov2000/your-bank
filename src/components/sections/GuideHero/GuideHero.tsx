import React, { type FC } from "react";

import { AppLink, Title } from "@components/ui";

import "./GuideHero.scss";

const mainClass = "guide-hero";

type Props = {
  data: Queries.GuideHeroFragment;
};

/** Design guide cover (Figma "Template Guide" banner): template name, author pill, tagline over the screens collage. */
const GuideHero: FC<Props> = ({ data: { title, description, author } }) => (
  <section className={mainClass}>
    <div className={`${mainClass}__head`}>
      <Title className={`${mainClass}__title`} as="h1">
        {title}
      </Title>
      <AppLink className={`${mainClass}__author`} to={author.path}>
        {author.label}
      </AppLink>
    </div>
    <p className={`${mainClass}__description`}>{description}</p>
  </section>
);

export default GuideHero;
