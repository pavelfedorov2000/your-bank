import React, { type AriaRole, type Key, type ReactNode } from "react";

import { cn } from "@box/utils";
import type { TWithClassName } from "@box/types";

import "./List.scss";

const mainClass = "list";

type Props<T> = TWithClassName<{
  items: readonly T[];
  renderItem: (item: T, index: number) => ReactNode;
  /** React key of an item. Defaults to the index. */
  getKey?: (item: T, index: number) => Key;
  as?: "ul" | "ol";
  /** Class of every <li> (BEM element, e.g. "faq__item"). */
  itemClassName?: string;
  role?: AriaRole;
}>;

/** Typed <ul>/<ol>: maps items to <li> with keys and BEM classes. */
const List = <T,>({ items, renderItem, getKey, as: Tag = "ul", className, itemClassName, role }: Props<T>) => (
  <Tag className={cn(mainClass, className)} role={role}>
    {items.map((item, index) => (
      <li className={itemClassName} key={getKey ? getKey(item, index) : index}>
        {renderItem(item, index)}
      </li>
    ))}
  </Tag>
);

export default List;
