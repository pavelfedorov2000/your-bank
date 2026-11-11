import React, { type FC } from "react";

import { Button, Card, Icon, List, Title } from "@components/ui";
import { MetaTags } from "@components/content";

import { ButtonMods, CardMods, ICON_NAMES } from "@box/constants";

import "./JobCard.scss";

const mainClass = "job-card";

type Props = {
  data: Queries.JobCardFragment;
  /** Subheadings shared by all cards ("About This Job", "Requirements & Qualifications") */
  labels: {
    about: string;
    requirements: string;
  };
};

/** Careers "Job Openings" card: title, meta (location, department), about, requirements, apply link. */
const JobCard: FC<Props> = ({ data: { title, meta, about, requirements, button }, labels }) => (
  <Card className={mainClass} as="article" mods={[CardMods.Surface]}>
    <header className={`${mainClass}__head`}>
      <Title className={`${mainClass}__title`} as="h3">
        {title}
      </Title>
      <MetaTags className={`${mainClass}__tags`} items={meta} />
    </header>

    <div className={`${mainClass}__details`}>
      <section className={`${mainClass}__group`}>
        <Title className={`${mainClass}__subtitle`} as="h4">
          {labels.about}
        </Title>
        <p className={`${mainClass}__about`}>{about}</p>
      </section>

      <section className={`${mainClass}__group`}>
        <Title className={`${mainClass}__subtitle`} as="h4">
          {labels.requirements}
        </Title>
        <List
          className={`${mainClass}__requirements`}
          itemClassName={`${mainClass}__requirement`}
          items={requirements}
          getKey={(requirement) => requirement}
          renderItem={(requirement) => (
            <>
              <Icon name={ICON_NAMES.briefcase} />
              {requirement}
            </>
          )}
        />
      </section>
    </div>

    <Button className={`${mainClass}__button`} to={button.path} mods={[ButtonMods.Primary, ButtonMods.Small]}>
      {button.label}
    </Button>
  </Card>
);

export default JobCard;
