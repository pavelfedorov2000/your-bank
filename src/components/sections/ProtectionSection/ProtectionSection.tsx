import React, { type FC } from "react";

import { Section } from "@components/layout";
import { List } from "@components/ui";
import { BenefitCard, SectionIntro } from "@components/content";

import { COMPONENT_MODS } from "@box/constants";

import "./ProtectionSection.scss";

const mainClass = "protection";

type Props = {
  data: Queries.ProtectionSectionFragment;
};

/** Security "How We Protect You" */
const ProtectionSection: FC<Props> = ({ data: { intro, items } }) => (
  <Section className={mainClass}>
    <SectionIntro data={intro} />

    <div className={`${mainClass}__content`}>
      <List
        className={`${mainClass}__list`}
        mods={[COMPONENT_MODS.list.twoColumns]}
        items={items}
        getKey={(item) => item.title}
        renderItem={(item) => <BenefitCard data={item} />}
      />
    </div>
  </Section>
);

export default ProtectionSection;
