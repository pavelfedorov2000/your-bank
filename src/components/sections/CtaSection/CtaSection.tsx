import React, { type FC } from "react";

import { Button } from "@components/ui";
import { TextBlock } from "@components/content";

import { COMPONENT_MODS } from "@box/constants";

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
      title={title}
      titleProps={{ className: `${mainClass}__title` }}
      description={description}
    />
    <Button to={button.path} mods={[COMPONENT_MODS.button.primary]}>{button.label}</Button>
  </section>
);

export default CtaSection;
