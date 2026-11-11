import React, { type FC } from "react";

import { Section } from "@components/layout";
import { List } from "@components/ui";
import { BenefitCard, SectionIntro } from "@components/content";

import "./ProtectionSection.scss";

const mainClass = "protection";

type Props = {
  data: Queries.ProtectionSectionFragment;
};

/** Security "How We Protect You": cards over a decorative "noise" panel (from sm). */
const ProtectionSection: FC<Props> = ({ data: { intro, items } }) => (
  <Section className={mainClass}>
    <SectionIntro data={intro} />

    <div className={`${mainClass}__content`}>
      <List
        className={`${mainClass}__grid`}
        items={items}
        getKey={(item) => item.title}
        renderItem={(item) => <BenefitCard data={item} />}
      />
    </div>
  </Section>
);

export default ProtectionSection;
