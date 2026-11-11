import React, { type FC } from "react";

import { Section } from "@components/layout";
import { IconBadge, Button, Title, List } from "@components/ui";
import { SectionIntro, StatsList, TextBlock } from "@components/content";

import { ButtonMods, TitleVariants, SectionMods } from "@box/constants";

import "./UseCasesSection.scss";

const mainClass = "use-cases";

type Props = {
  data: Queries.UseCasesSectionFragment;
};

/** "Use Cases" — two groups (individuals / business): panel with case cards + text with stats. */
const UseCasesSection: FC<Props> = ({ data: { intro, groups } }) => (
  <Section className={mainClass} mods={[SectionMods.Large]}>
    <SectionIntro data={intro} />

    <div className={`${mainClass}__groups`}>
      {groups.map((group) => (
        <section className={`${mainClass}__group`} key={group.audience}>
          <div className={`${mainClass}__panel`}>
            <List
              className={`${mainClass}__cases`}
              itemClassName={`${mainClass}__case`}
              items={group.cases}
              getKey={(item) => item.title}
              renderItem={(item) => (
                <>
                  <IconBadge name={item.icon} size="md" />
                  <span className={`${mainClass}__case-title`}>{item.title}</span>
                </>
              )}
            />
          </div>

          <div className={`${mainClass}__content`}>
            <TextBlock
              title={
                <Title as="h3" variant={TitleVariants.Subtitle}>
                  {group.title}
                </Title>
              }
              description={group.description}
            />

            <StatsList className={`${mainClass}__stats`} items={group.stats} />

            <Button to={group.button.path} mods={[ButtonMods.Secondary]}>
              {group.button.label}
            </Button>
          </div>
        </section>
      ))}
    </div>
  </Section>
);

export default UseCasesSection;
