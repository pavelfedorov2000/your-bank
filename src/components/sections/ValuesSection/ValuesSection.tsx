import React, { type FC } from "react";

import { Section } from "@components/layout";
import { List } from "@components/ui";
import { SectionIntro } from "@components/content";
import ValueItem from "./ValueItem";

import "./ValuesSection.scss";

const mainClass = "values";

type Props = {
  data: Queries.ValuesSectionFragment;
};

/** Careers "Our Values". */
const ValuesSection: FC<Props> = ({ data: { intro, items } }) => (
  <Section className={mainClass}>
    <SectionIntro data={intro} />

    <List
      className={`${mainClass}__grid`}
      items={items}
      getKey={(item) => item.title}
      renderItem={(item) => <ValueItem data={item} />}
    />
  </Section>
);

export default ValuesSection;
