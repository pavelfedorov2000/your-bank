import React, { type FC } from "react";

import { Section } from "@components/layout";
import { List, Tabs } from "@components/ui";
import { SectionIntro } from "@components/content";
import FeatureCard from "./FeatureCard";

import { COMPONENT_MODS } from "@box/constants";
import { useTabs } from "@box/tabs";

import "./FeaturesSection.scss";

const mainClass = "features";

type Props = {
  data: Queries.FeaturesSectionFragment;
};

/** Home "Our Features": vertical tab menu (horizontal on mobile) + 2×2 cards. */
const FeaturesSection: FC<Props> = ({ data: { intro, tabs } }) => {
  const { activeItems: items, tabsProps, panelProps } = useTabs(tabs);

  return (
    <Section className={mainClass}>
      <SectionIntro data={intro} />

      <div className={`${mainClass}__body`}>
        <Tabs mods={[COMPONENT_MODS.tabs.vertical]} {...tabsProps} />

        <div className={`${mainClass}__panel`} {...panelProps}>
          <List
            className={`${mainClass}__list`}
            mods={[COMPONENT_MODS.list.twoColumns]}
            items={items}
            getKey={(card) => card.title}
            renderItem={(card) => <FeatureCard data={card} />}
          />
        </div>
      </div>
    </Section>
  );
};

export default FeaturesSection;
