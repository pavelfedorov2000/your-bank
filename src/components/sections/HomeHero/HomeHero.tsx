import React, { type FC } from "react";

import { Badge, Button, Title } from "@components/ui";
import HeroWidget from "./HeroWidget";

import { COMPONENT_MODS, ICON_NAMES, TitleVariants } from "@box/constants";

import "./HomeHero.scss";

const mainClass = "hero-section";

type Props = {
  data: Queries.HomeHeroFragment;
};

const HomeHero: FC<Props> = ({ data: { badge, title, description, button, widget } }) => (
  <section className={mainClass}>

    <div className={`${mainClass}__content`}>
      <Badge className={`${mainClass}__badge`} icon={ICON_NAMES.badgeCheck}>
        {badge}
      </Badge>
      <Title className={`${mainClass}__title`} as="h1" variant={TitleVariants.Hero} html={title} />
      <p className={`${mainClass}__description`}>{description}</p>
      <Button to={button.path} mods={[COMPONENT_MODS.button.primary]}>
        {button.label}
      </Button>
    </div>

    <HeroWidget data={widget} />
  </section>
);

export default HomeHero;
