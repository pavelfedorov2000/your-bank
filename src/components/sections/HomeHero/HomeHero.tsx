import React, { type FC } from "react";
import { Badge, Button } from "@components/ui";
import { Heading } from "@components/content";
import HeroWidget from "./HeroWidget";
import { ButtonMods, TitleVariants } from "@box/constants";
import "./HomeHero.scss";

const mainClass = "hero-section";

type Props = {
  data: Queries.HomeHeroFragment;
};

const HomeHero: FC<Props> = ({ data: { badge, title, description, button, widget } }) => (
  <section className={mainClass}>

    <div className={`${mainClass}__content`}>
      <Badge className={`${mainClass}__badge`} icon="badge-check">
        {badge}
      </Badge>
      <Heading className={`${mainClass}__title`} data={title} as="h1" variant={TitleVariants.Hero} />
      <p className={`${mainClass}__description`}>{description}</p>
      <Button to={button.path} mods={[ButtonMods.Primary]}>
        {button.label}
      </Button>
    </div>

    <HeroWidget data={widget} />
  </section>
);

export default HomeHero;
