import React, { type FC } from "react";

import { Section } from "@components/layout";
import { List } from "@components/ui";
import { SectionIntro } from "@components/content";
import PressReleaseCard from "./PressReleaseCard";

import { COMPONENT_MODS } from "@box/constants";

import "./PressReleasesSection.scss";

const mainClass = "press-release-cards";

type Props = {
  data: Queries.PressReleasesSectionFragment;
};

/** About "Press Releases". */
const PressReleasesSection: FC<Props> = ({ data: { intro, items } }) => (
  <Section className={mainClass}>
    <SectionIntro data={intro} />

    <List
      className={`${mainClass}__list`}
      mods={[COMPONENT_MODS.list.twoColumns]}
      items={items}
      getKey={(item) => item.title}
      renderItem={(item) => <PressReleaseCard data={item} />}
    />
  </Section>
);

export default PressReleasesSection;
