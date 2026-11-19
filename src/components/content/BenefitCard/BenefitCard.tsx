import React, { type FC } from "react";

import { Card, Title } from "@components/ui";
import { IconTextBlock } from "@components/content";

import { COMPONENT_MODS } from "@box/constants";

import "./BenefitCard.scss";

const mainClass = "benefit-card";

type Props = {
  data: Queries.BenefitCardFragment;
};

/**
 * Card with an icon badge, title and text on the "noise" surface.
 * Used by: Careers "Our Benefits", Security "How We Protect You". Radius / border / gap come from --benefit-card-* vars.
 */
const BenefitCard: FC<Props> = ({ data: { title, description, icon } }) => (
  <Card className={mainClass} mods={[COMPONENT_MODS.card.noise]}>
    <IconTextBlock
      mods={[COMPONENT_MODS.iconTextBlock.row]}
      icon={icon}
      iconMods={[COMPONENT_MODS.iconBadge.large]}
      title={
        <Title className={`${mainClass}__title`} as="h3">
          {title}
        </Title>
      }
      description={description}
    />
  </Card>
);

export default BenefitCard;
