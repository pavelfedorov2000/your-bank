import React, { type FC } from "react";

import { AppLink, Title } from "@components/ui";

import { cn } from "@box/utils";
import type { TTitleAs, TWithClassName } from "@box/types";

import "./GuideHero.scss";

const mainClass = "guide-hero";

type Props = TWithClassName<{
  data: Queries.GuideHeroFragment;
  /** Level of the template name: h1 on the guide pages, lower where the banner repeats it (preloader) */
  titleAs?: TTitleAs;
}>;

/** Design guide cover (Figma "Template Guide" banner): template name, author pill, tagline over the screens collage. */
const GuideHero: FC<Props> = ({ className, data: { title, description, author }, titleAs = "h1" }) => (
  <section className={cn(mainClass, className)}>
    <div className={`${mainClass}__head`}>
      <Title className={`${mainClass}__title`} as={titleAs}>
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
