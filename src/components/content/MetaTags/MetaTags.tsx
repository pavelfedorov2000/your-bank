import React, { type FC } from "react";

import { List, Tag } from "@components/ui";

import type { TWithClassName } from "@box/types";
import { cn } from "@box/utils";

import "./MetaTags.scss";

const mainClass = "meta-tags";

type Props = TWithClassName<{
  items: readonly Queries.MetaItemFragment[];
}>;

/** Meta info as a wrapping row of tags: "Location: India", "Date: 06/11/2024". Placement via className. */
const MetaTags: FC<Props> = ({ className, items }) => (
  <List
    className={cn(mainClass, className)}
    items={items}
    getKey={(item) => item.label}
    renderItem={(item) => <Tag>{`${item.label}: ${item.value}`}</Tag>}
  />
);

export default MetaTags;
