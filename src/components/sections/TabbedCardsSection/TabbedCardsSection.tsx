import React, { type FC } from "react";

import { Section } from "@components/layout";
import { Tabs, IconBadge, Title, List } from "@components/ui";
import { SectionIntro, TextBlock } from "@components/content";

import { TitleVariants } from "@box/constants";
import { useTabs } from "@box/hooks";

import "./TabbedCardsSection.scss";

const mainClass = "tabbed-cards";

type Props = {
  data: Queries.TabbedCardsSectionFragment;
};

/** Intro + tabs + centered cards with icons, divided by lines. Home "Our Products". */
const TabbedCardsSection: FC<Props> = ({ data: { intro, tabs } }) => {
  const { activeTab: { items }, tabsProps } = useTabs(tabs);

  return (
    <Section className={mainClass}>
      <SectionIntro data={intro} actions={<Tabs {...tabsProps} />} />

      <List
        className={`${mainClass}__list`}
        itemClassName={`${mainClass}__item`}
        role="tabpanel"
        items={items}
        getKey={(card) => card.title}
        renderItem={(card) => (
          <>
            {card.icon && <IconBadge name={card.icon} size="lg" />}
            <TextBlock
              className={`${mainClass}__text`}
              title={
                <Title as="h3" variant={TitleVariants.Card}>
                  {card.title}
                </Title>
              }
              description={card.description}
            />
          </>
        )}
      />
    </Section>
  );
};

export default TabbedCardsSection;
