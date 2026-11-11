import React, { type FC } from "react";

import { Section } from "@components/layout";
import { List } from "@components/ui";
import { SectionIntro } from "@components/content";
import JobCard from "./JobCard";

import { SectionMods } from "@box/constants";

import "./JobsSection.scss";

const mainClass = "job-cards";

type Props = {
  data: Queries.JobsSectionFragment;
};

/** Careers "Job Openings". */
const JobsSection: FC<Props> = ({ data: { intro, aboutLabel, requirementsLabel, items } }) => (
  <Section className={mainClass} mods={[SectionMods.Large]}>
    <SectionIntro data={intro} />

    <List
      className={`${mainClass}__grid`}
      items={items}
      getKey={(job) => job.title}
      renderItem={(job) => <JobCard data={job} labels={{ about: aboutLabel, requirements: requirementsLabel }} />}
    />
  </Section>
);

export default JobsSection;
