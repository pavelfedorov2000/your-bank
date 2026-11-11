import React, { type FC } from "react";

import { List } from "@components/ui";
import { GuideBlock } from "@components/content";
import ColorGroup from "./ColorGroup";

import "./ColorStylesSection.scss";

const mainClass = "color-styles";

type Props = {
  data: Queries.ColorStylesSectionFragment;
};

/** Design guide "🎨 Color Styles": palette groups with their swatches. */
const ColorStylesSection: FC<Props> = ({ data: { intro, groups } }) => (
  <GuideBlock className={mainClass} panelClassName={`${mainClass}__panel`} intro={intro}>
    <List
      className={`${mainClass}__groups`}
      items={groups}
      getKey={(group) => group.title}
      renderItem={(group) => <ColorGroup data={group} />}
    />
  </GuideBlock>
);

export default ColorStylesSection;
