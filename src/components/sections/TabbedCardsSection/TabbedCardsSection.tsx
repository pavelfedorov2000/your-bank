import React, { type FC } from "react";

import { Section } from "@components/layout";
import { List, Tabs, Title } from "@components/ui";
import { IconTextBlock, SectionIntro } from "@components/content";

import { useTabs } from "@box/hooks";
import { COMPONENT_MODS, TitleVariants } from "@box/constants";

import "./TabbedCardsSection.scss";

const mainClass = "tabbed-cards";

type Props = {
  data: Queries.TabbedCardsSectionFragment;
};

/** Intro + tabs + centered cards with icons, divided by lines. Home "Our Products". */
const TabbedCardsSection: FC<Props> = ({ data: { intro, tabs } }) => {
  const { activeItems: items, tabsProps, panelProps } = useTabs(tabs);

  return (
    <Section className={mainClass}>
      <SectionIntro data={intro} actions={<Tabs {...tabsProps} />} />

      <div className={`${mainClass}__panel`} {...panelProps}>
        <List
          className={`${mainClass}__list`}
          itemClassName={`${mainClass}__item`}
          items={items}
          getKey={(card) => card.title}
          renderItem={(card) => (
            <IconTextBlock
              icon={card.icon}
              iconMods={[COMPONENT_MODS.iconBadge.large]}
              title={
                <Title as="h3" variant={TitleVariants.Card}>
                  {card.title}
                </Title>
              }
              description={card.description}
            />
          )}
        />
      </div>
    </Section>
  );
};

export default TabbedCardsSection;
