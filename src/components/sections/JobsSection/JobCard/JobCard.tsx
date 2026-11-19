import React, { type FC } from "react";

import { Button, Card, Icon, List, Title } from "@components/ui";
import { MetaTags, TextBlock } from "@components/content";

import { COMPONENT_MODS, ICON_NAMES } from "@box/constants";

import "./JobCard.scss";

const mainClass = "job-card";

type Props = {
  data: Queries.JobCardFragment;
  /** Subheadings shared by all cards ("About This Job", "Requirements & Qualifications") */
  labels: Pick<Queries.JobsSectionFragment, "aboutLabel" | "requirementsLabel">;
};

/** Careers "Job Openings" card: title, meta (location, department), about, requirements, apply link. */
const JobCard: FC<Props> = ({ data: { title, meta, about, requirements, button }, labels: { aboutLabel, requirementsLabel } }) => (
  <Card className={mainClass} as="article" mods={[COMPONENT_MODS.card.surface]}>
    <header className={`${mainClass}__head`}>
      <Title className={`${mainClass}__title`} as="h3">
        {title}
      </Title>
      <MetaTags className={`${mainClass}__tags`} items={meta} />
    </header>

    <div className={`${mainClass}__details`}>
      <TextBlock
        className={`${mainClass}__group`}
        as="section"
        title={
          <Title className={`${mainClass}__subtitle`} as="h4">
            {aboutLabel}
          </Title>
        }
        description={about}
      />

      <TextBlock
        className={`${mainClass}__group`}
        as="section"
        title={
          <Title className={`${mainClass}__subtitle`} as="h4">
            {requirementsLabel}
          </Title>
        }
      >
        <List
          className={`${mainClass}__requirements`}
          itemClassName={`${mainClass}__requirement`}
          items={requirements}
          getKey={(requirement) => requirement}
          renderItem={(requirement) => (
            <>
              <Icon name={ICON_NAMES.briefcase} />
              <span className={`${mainClass}__requirement-text`}>{requirement}</span>
            </>
          )}
        />
      </TextBlock>
    </div>

    <Button className={`${mainClass}__button`} to={button.path} mods={[COMPONENT_MODS.button.primary, COMPONENT_MODS.button.small]}>
      {button.label}
    </Button>
  </Card>
);

export default JobCard;
