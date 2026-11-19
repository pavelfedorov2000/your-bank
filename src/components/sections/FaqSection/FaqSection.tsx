import React, { type FC } from "react";

import { Section } from "@components/layout";
import { Button, Card, List } from "@components/ui";
import { SectionIntro, TextBlock } from "@components/content";

import { useCollapsibleList } from "@box/hooks";
import { cn, getClassNameByMods } from "@box/utils";
import { COMPONENT_MODS, GENERAL_MODS, ICON_NAMES } from "@box/constants";

import "./FaqSection.scss";

const mainClass = "faq";

type Props = {
  data: Queries.FaqSectionFragment;
};

const VISIBLE_FAQS_COUNT = 4;

/** "Frequently Asked Questions" — Home, Careers, Security. */
const FaqSection: FC<Props> = ({ data: { intro, items, loadMoreButtonText } }) => {
  const { visibleItems, isCollapsed, expand, listId, getItemProps } = useCollapsibleList(items, VISIBLE_FAQS_COUNT);

  return (
    <Section className={mainClass}>
      <SectionIntro data={intro} />

      <div className={cn(`${mainClass}__body`, getClassNameByMods(`${mainClass}__body`, [!isCollapsed && GENERAL_MODS.open]))}>
        <List
          id={listId}
          className={`${mainClass}__list`}
          mods={[COMPONENT_MODS.list.twoColumns]}
          items={visibleItems}
          getKey={(item) => item.question}
          renderItem={(item, index) => (
            <Card className={`${mainClass}__item`} {...getItemProps(index)}>
              <TextBlock
                className={`${mainClass}__text`}
                title={item.question}
                titleProps={{ as: "h3", className: `${mainClass}__question` }}
                description={item.answer}
              />
            </Card>
          )}
        />

        {isCollapsed && (
          <Button
            className={`${mainClass}__more`}
            mods={[COMPONENT_MODS.button.secondary]}
            icon={ICON_NAMES.chevronDown}
            aria-controls={listId}
            onClick={expand}
          >
            {loadMoreButtonText}
          </Button>
        )}
      </div>
    </Section>
  );
};

export default FaqSection;
