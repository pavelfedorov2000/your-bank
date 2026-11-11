import React, { type FC } from "react";
import { Section } from "@components/layout";
import { Button, Card, Title, List } from "@components/ui";
import { SectionIntro } from "@components/content";
import { useBooleanState } from "@box/hooks";
import { cn, getClassNameByMods } from "@box/utils";
import { GENERAL_MODS, ButtonMods } from "@box/constants";
import "./FaqSection.scss";

const mainClass = "faq";

type Props = {
  data: Queries.FaqSectionFragment;
};

/** How many questions are shown before "Load All FAQ's" (the last row fades out). */
const VISIBLE_COUNT = 4;

/** "Frequently Asked Questions" — Home, Careers, Security. */
const FaqSection: FC<Props> = ({ data: { intro, items, loadMoreButtonText } }) => {
  const [isExpanded, { setIsTrue: expand }] = useBooleanState();
  /** Collapsed state (fade + "Load All") only makes sense when some questions are hidden. */
  const isCollapsed = !isExpanded && items.length > VISIBLE_COUNT;
  const visibleItems = isCollapsed ? items.slice(0, VISIBLE_COUNT) : items;

  return (
    <Section className={mainClass}>
      <SectionIntro data={intro} />

      <div className={cn(`${mainClass}__body`, getClassNameByMods(`${mainClass}__body`, [!isCollapsed && GENERAL_MODS.open]))}>
        <List
          className={`${mainClass}__list`}
          items={visibleItems}
          getKey={(item) => item.question}
          renderItem={(item) => (
            <Card className={`${mainClass}__item`}>
              <Title className={`${mainClass}__question`} as="h3">
                {item.question}
              </Title>
              <p className={`${mainClass}__answer`}>{item.answer}</p>
            </Card>
          )}
        />

        {isCollapsed && (
          <Button className={`${mainClass}__more`} mods={[ButtonMods.Secondary]} icon="chevron-down" onClick={expand}>
            {loadMoreButtonText}
          </Button>
        )}
      </div>
    </Section>
  );
};

export default FaqSection;
