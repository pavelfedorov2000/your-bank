import React, { type FC } from "react";

import { Title } from "@components/ui";
import { TextBlock } from "@components/content";

import "./ValueItem.scss";

const mainClass = "value-item";

type Props = {
  data: Queries.ValueItemFragment;
};

/** Careers "Our Values" item: big faded title and text with an accent line on the left. */
const ValueItem: FC<Props> = ({ data: { title, description } }) => (
  <TextBlock
    className={mainClass}
    title={
      <Title className={`${mainClass}__title`} as="h3">
        {title}
      </Title>
    }
    description={description}
  />
);

export default ValueItem;
