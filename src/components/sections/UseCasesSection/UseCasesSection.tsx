import React, { type FC } from "react";

import { Section } from "@components/layout";
import { Button, List } from "@components/ui";
import { IconTextBlock, SectionIntro, StatsList, TextBlock } from "@components/content";

import { COMPONENT_MODS, TitleVariants } from "@box/constants";

import "./UseCasesSection.scss";

const mainClass = "use-cases";

type Props = {
  data: Queries.UseCasesSectionFragment;
};

/** "Use Cases" — two groups (individuals / business): panel with case cards + text with stats. */
const UseCasesSection: FC<Props> = ({ data: { intro, groups } }) => (
  <Section className={mainClass} mods={[COMPONENT_MODS.section.large]}>
    <SectionIntro data={intro} />

    <div className={`${mainClass}__groups`}>
      {groups.map((group) => (
        <section key={group.audience} className={`${mainClass}__group`}>
          <div className={`${mainClass}__panel`}>
            <List
              className={`${mainClass}__cases`}
              itemClassName={`${mainClass}__case`}
              items={group.cases}
              getKey={(item) => item.title}
              renderItem={(item) => (
                <IconTextBlock
                  icon={item.icon}
                  iconMods={[COMPONENT_MODS.iconBadge.medium]}
                  title={<span className={`${mainClass}__case-title`}>{item.title}</span>}
                />
              )}
            />
          </div>

          <div className={`${mainClass}__content`}>
            <TextBlock
              title={group.title}
              titleProps={{ as: "h3", variant: TitleVariants.Subtitle }}
              description={group.description}
            />

            <StatsList className={`${mainClass}__stats`} items={group.stats} />

            <Button to={group.button.path} mods={[COMPONENT_MODS.button.secondary]}>
              {group.button.label}
            </Button>
          </div>
        </section>
      ))}
    </div>
  </Section>
);

export default UseCasesSection;
