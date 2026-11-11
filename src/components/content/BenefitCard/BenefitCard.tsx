import React, { type FC } from "react";

import { Card, IconBadge, Title } from "@components/ui";

import { CardMods } from "@box/constants";

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
  <Card className={mainClass} mods={[CardMods.Noise]}>
    <div className={`${mainClass}__head`}>
      {icon && <IconBadge className={`${mainClass}__icon`} name={icon} size="lg" />}
      <Title className={`${mainClass}__title`} as="h3">
        {title}
      </Title>
    </div>

    <p className={`${mainClass}__description`}>{description}</p>
  </Card>
);

export default BenefitCard;
