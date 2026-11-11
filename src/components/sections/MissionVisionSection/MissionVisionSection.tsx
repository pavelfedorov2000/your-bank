import React, { type FC } from "react";

import { Section } from "@components/layout";
import { List } from "@components/ui";
import { SectionIntro } from "@components/content";
import MissionVisionItem from "./MissionVisionItem";

import { GENERAL_MODS, SectionMods } from "@box/constants";

import "./MissionVisionSection.scss";

const mainClass = "mission-vision";

type Props = {
  data: Queries.MissionVisionSectionFragment;
};

/** About "Mission & Vision": intro + subsections (Mission, Vision) with the photo on alternating sides. */
const MissionVisionSection: FC<Props> = ({ data: { intro, items } }) => (
  <Section className={mainClass} mods={[SectionMods.Large]}>
    <SectionIntro data={intro} />

    <List
      className={`${mainClass}__list`}
      itemClassName={`${mainClass}__item`}
      items={items}
      getKey={(item) => item.title}
      renderItem={(item, index) => (
        <MissionVisionItem data={item} mods={[index % 2 === 1 && GENERAL_MODS.reversed]} />
      )}
    />
  </Section>
);

export default MissionVisionSection;
