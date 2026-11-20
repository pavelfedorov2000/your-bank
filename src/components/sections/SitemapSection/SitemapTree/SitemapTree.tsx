import React, { type FC } from "react";

import { AppLink, List, Title } from "@components/ui";

import "./SitemapTree.scss";

const mainClass = "sitemap-tree";

type Props = {
  data: Queries.SitemapTreeFragment;
};

/**
 * One page of the sitemap: the page link (lime) branches into a panel with its sections, joined by lines.
 * Lines are decor: the branches are ::before / ::after of the panel, the links between sections — ::before of an item.
 */
const SitemapTree: FC<Props> = ({ data: { page, sections } }) => (
  <div className={mainClass}>
    <Title className={`${mainClass}__title`} as="h3">
      <AppLink className={`${mainClass}__page`} to={page.path}>
        {page.label}
      </AppLink>
    </Title>

    <List
      className={`${mainClass}__sections`}
      itemClassName={`${mainClass}__section`}
      items={sections}
      getKey={(section) => section}
      renderItem={(section) => section}
    />
  </div>
);

export default SitemapTree;
