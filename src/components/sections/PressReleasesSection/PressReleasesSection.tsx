import React, { type FC } from "react";

import { Section } from "@components/layout";
import { List } from "@components/ui";
import { SectionIntro } from "@components/content";
import PressReleaseCard from "./PressReleaseCard";

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
      className={`${mainClass}__grid`}
      items={items}
      getKey={(item) => item.title}
      renderItem={(item) => <PressReleaseCard data={item} />}
    />
  </Section>
);

export default PressReleasesSection;
