import React, { type FC } from "react";
import { Button } from "@components/ui";
import { Heading, TextBlock } from "@components/content";
import { ButtonMods } from "@box/constants";
import "./CtaSection.scss";

const mainClass = "cta-section";

type Props = {
  data: Queries.CtaSectionFragment;
};

/** Call-to-action banner — Home, Careers. */
const CtaSection: FC<Props> = ({ data: { title, description, button } }) => (
  <section className={mainClass}>
    <TextBlock
      className={`${mainClass}__text`}
      title={<Heading className={`${mainClass}__title`} data={title} />}
      description={description}
    />
    <Button to={button.path} mods={[ButtonMods.Primary]}>{button.label}</Button>
  </section>
);

export default CtaSection;
