import React, { type FC } from "react";

import { Section } from "@components/layout";
import { List } from "@components/ui";
import { SectionIntro } from "@components/content";
import JobCard from "./JobCard";

import { COMPONENT_MODS } from "@box/constants";

import "./JobsSection.scss";

const mainClass = "job-cards";

type Props = {
  data: Queries.JobsSectionFragment;
};

/** Careers "Job Openings". */
const JobsSection: FC<Props> = ({ data: { intro, aboutLabel, requirementsLabel, items } }) => (
  <Section className={mainClass} mods={[COMPONENT_MODS.section.large]}>
    <SectionIntro data={intro} />

    <List
      className={`${mainClass}__list`}
      mods={[COMPONENT_MODS.list.twoColumns]}
      items={items}
      getKey={(job) => job.title}
      renderItem={(job) => <JobCard data={job} labels={{ aboutLabel, requirementsLabel }} />}
    />
  </Section>
);

export default JobsSection;
