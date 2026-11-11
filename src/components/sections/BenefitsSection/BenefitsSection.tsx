import React, { type FC } from "react";

import { Section } from "@components/layout";
import { List } from "@components/ui";
import { BenefitCard, SectionIntro } from "@components/content";

import { SectionMods } from "@box/constants";

import "./BenefitsSection.scss";

const mainClass = "benefits";

type Props = {
  data: Queries.BenefitsSectionFragment;
};

/** Careers "Our Benefits": cards in a grid split by dashed lines. */
const BenefitsSection: FC<Props> = ({ data: { intro, items } }) => (
  <Section className={mainClass} mods={[SectionMods.Large]}>
    <SectionIntro data={intro} />

    <List
      className={`${mainClass}__grid`}
      itemClassName={`${mainClass}__item`}
      items={items}
      getKey={(item) => item.title}
      renderItem={(item) => <BenefitCard data={item} />}
    />
  </Section>
);

export default BenefitsSection;
