import React, { type FC } from "react";

import { AppLink, List } from "@components/ui";

import type { TWithClassName, TWithPropsMods } from "@box/types";
import { cn, getClassNameByMods } from "@box/utils";

import "./NavMenu.scss";

const mainClass = "nav-menu";

type Props = TWithClassName<TWithPropsMods<{
  items: readonly Queries.LinkItemFragment[];
  /** Accessible name of the <nav> landmark (e.g. "Main"). */
  ariaLabel: string;
}>>;

/**
 * Site navigation links (header, footer); the current page link gets aria-current="page" from Gatsby <Link>.
 * Look via mods (NavMenuMods), placement via the parent's element class.
 */
const NavMenu: FC<Props> = ({ items, ariaLabel, mods, className }) => (
  <nav className={cn(mainClass, getClassNameByMods(mainClass, mods), className)} aria-label={ariaLabel}>
    <List
      className={`${mainClass}__list`}
      itemClassName={`${mainClass}__item`}
      items={items}
      getKey={(item) => item.path}
      renderItem={(item) => (
        <AppLink className={`${mainClass}__link`} to={item.path}>
          {item.label}
        </AppLink>
      )}
    />
  </nav>
);

export default NavMenu;
