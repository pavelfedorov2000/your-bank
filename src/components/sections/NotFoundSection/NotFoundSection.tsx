import React, { type FC } from "react";

import { Section } from "@components/layout";
import { Card, Ctas, Title } from "@components/ui";
import { TextBlock } from "@components/content";

import { COMPONENT_MODS, TitleVariants } from "@box/constants";

import "./NotFoundSection.scss";

const mainClass = "not-found";

type Props = {
  data: Queries.NotFoundSectionFragment;
};

/**
 * 404: panel with the big error code, title, description and the way back.
 * Not drawn in the design: built from its parts (Card frame, lime accent, dots decor, Ctas).
 */
const NotFoundSection: FC<Props> = ({ data: { code, title, description, button, secondaryButton } }) => (
  <Section className={mainClass}>
    <Card className={`${mainClass}__panel`}>
      {/** Decorative: the title says the same in words */}
      <p className={`${mainClass}__code`} aria-hidden="true">
        {code}
      </p>

      <TextBlock
        className={`${mainClass}__text`}
        title={<Title className={`${mainClass}__title`} as="h1" variant={TitleVariants.Section} html={title} />}
        description={description}
      />

      <Ctas
        className={`${mainClass}__ctas`}
        items={[
          { label: button.label, to: button.path, mods: [COMPONENT_MODS.button.primary] },
          { label: secondaryButton.label, to: secondaryButton.path, mods: [COMPONENT_MODS.button.secondary] },
        ]}
      />
    </Card>
  </Section>
);

export default NotFoundSection;
