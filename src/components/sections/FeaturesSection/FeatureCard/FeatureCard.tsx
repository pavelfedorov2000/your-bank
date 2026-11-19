import React, { type FC } from "react";

import { Card, Icon, Title } from "@components/ui";

import { getIconName } from "@box/utils";
import { COMPONENT_MODS } from "@box/constants";

import "./FeatureCard.scss";

const mainClass = "feature-card";

type Props = {
  data: Queries.CardFragment;
};

/** Home "Our Features" card: title with an accent arrow, description. Fills the height of its grid cell. */
const FeatureCard: FC<Props> = ({ data: { title, description, icon } }) => (
  <Card className={mainClass} mods={[COMPONENT_MODS.card.surface]}>
    <div className={`${mainClass}__head`}>
      <Title className={`${mainClass}__title`} as="h3">
        {title}
      </Title>
      {icon && <Icon className={`${mainClass}__icon`} name={getIconName(icon)} />}
    </div>
    <p className={`${mainClass}__description`}>{description}</p>
  </Card>
);

export default FeatureCard;
