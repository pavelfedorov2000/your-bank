import React, { type AriaRole, type Key, type ReactNode } from "react";

import { cn, getClassNameByMods } from "@box/utils";
import type { TWithClassName, TWithPropsMods } from "@box/types";

import "./List.scss";

const mainClass = "list";

type Props<T> = TWithClassName<TWithPropsMods<{
  items: readonly T[];
  renderItem: (item: T, index: number) => ReactNode;
  getKey?: (item: T, index: number) => Key;
  as?: "ul" | "ol";
  itemClassName?: string;
  role?: AriaRole;
}>>;

/** Typed <ul>/<ol>: maps items to <li> with keys and BEM classes. */
const List = <T,>({ className, mods, items, renderItem, getKey, as: Tag = "ul", itemClassName, role }: Props<T>) => (
  <Tag className={cn(mainClass, getClassNameByMods(mainClass, mods), className)} role={role}>
    {items.map((item, index) => (
      <li className={cn(`${mainClass}__item`, itemClassName)} key={getKey ? getKey(item, index) : index}>
        {renderItem(item, index)}
      </li>
    ))}
  </Tag>
);

export default List;
