import React, { type FC } from "react";

import { Icon, List } from "@components/ui";

import { cn, getIconName } from "@box/utils";
import type { TWithClassName } from "@box/types";

import "./Socials.scss";

const mainClass = "socials";

type Props = TWithClassName<{
  items: readonly Queries.SocialLinkFragment[];
}>;

/** Round social network links (Facebook, Twitter, LinkedIn). Placement comes from the parent's element class. */
const Socials: FC<Props> = ({ items, className }) => (
  <List
    className={cn(mainClass, className)}
    items={items}
    getKey={(social) => social.label}
    renderItem={(social) => (
      <a className={`${mainClass}__link`} href={social.href} aria-label={social.label}>
        <Icon className={`${mainClass}__icon`} name={getIconName(social.icon)} />
      </a>
    )}
  />
);

export default Socials;
