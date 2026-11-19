import React, { type AriaAttributes, type FC } from "react";

import { AppLink, List } from "@components/ui";

import { cn, getClassNameByMods } from "@box/utils";
import type { TWithClassName, TWithPropsMods } from "@box/types";

import "./NavMenu.scss";

const mainClass = "nav-menu";

type Props = TWithClassName<TWithPropsMods<{
  items: readonly Queries.LinkItemFragment[];
}> & Required<Pick<AriaAttributes, "aria-label">>>;

/**
 * Site navigation links (header, footer); the current page link gets aria-current="page" from Gatsby <Link>.
 * Look via mods (COMPONENT_MODS.navMenu), placement via the parent's element class.
 */
const NavMenu: FC<Props> = ({ items, "aria-label": ariaLabel, mods, className }) => (
  <nav className={cn(mainClass, getClassNameByMods(mainClass, mods), className)} aria-label={ariaLabel}>
    <List
      className={`${mainClass}__list`}
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
