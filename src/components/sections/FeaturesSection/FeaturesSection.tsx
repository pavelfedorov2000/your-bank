import React, { type FC } from "react";
import { Section } from "@components/layout";
import { List, Tabs } from "@components/ui";
import { SectionIntro } from "@components/content";
import FeatureCard from "./FeatureCard";
import { TabsMods } from "@box/constants";
import { useTabs } from "@box/hooks";
import "./FeaturesSection.scss";

const mainClass = "features";

type Props = {
  data: Queries.FeaturesSectionFragment;
};

/** Home "Our Features": vertical tab menu (horizontal on mobile) + 2×2 cards. */
const FeaturesSection: FC<Props> = ({ data: { intro, tabs } }) => {
  const { activeTab: { items }, tabsProps } = useTabs(tabs);

  return (
    <Section className={mainClass}>
      <SectionIntro data={intro} />

      <div className={`${mainClass}__body`}>
        <Tabs mods={[TabsMods.Vertical]} {...tabsProps} />

        <List
          className={`${mainClass}__list`}
          role="tabpanel"
          items={items}
          getKey={(card) => card.title}
          renderItem={(card) => <FeatureCard data={card} />}
        />
      </div>
    </Section>
  );
};

export default FeaturesSection;
