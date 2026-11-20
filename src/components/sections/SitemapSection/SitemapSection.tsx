import React, { type FC } from "react";

import { Section } from "@components/layout";
import { List } from "@components/ui";
import { SectionIntro } from "@components/content";
import SitemapTree from "./SitemapTree";

import "./SitemapSection.scss";

const mainClass = "sitemap";

type Props = {
  data: Queries.SitemapSectionFragment;
};

/** "Sitemap Of The Template": a tree per page of the template — the page link and its sections from top to bottom. */
const SitemapSection: FC<Props> = ({ data: { intro, trees } }) => (
  <Section className={mainClass}>
    <SectionIntro data={intro} />

    <List
      className={`${mainClass}__list`}
      items={trees}
      getKey={(tree) => tree.page.path}
      renderItem={(tree) => <SitemapTree data={tree} />}
    />
  </Section>
);

export default SitemapSection;
