import React, { type HTMLAttributes, type Key, type ReactNode } from "react";

import { cn, getClassNameByMods } from "@box/utils";
import type { TWithClassName, TWithPropsMods } from "@box/types";

import "./List.scss";

const mainClass = "list";

type TItemCallback<T, R> = (item: T, index: number) => R;

type Props<T> = TWithClassName<TWithPropsMods<{
  items: readonly T[];
  renderItem: TItemCallback<T, ReactNode>;
  getKey?: TItemCallback<T, Key>;
  as?: "ul" | "ol";
  itemClassName?: string;
}> & Pick<HTMLAttributes<HTMLUListElement>, "role">>;

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
