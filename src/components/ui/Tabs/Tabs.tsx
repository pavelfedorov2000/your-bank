import React, { type FC } from "react";

import { Button } from "@components/ui";

import type { TWithClassName, TWithPropsMods } from "@box/types";
import { cn, getClassNameByMods } from "@box/utils";

import "./Tabs.scss";

const mainClass = "tabs";

type Props = TWithClassName<TWithPropsMods<{
  items: readonly string[];
  activeIndex: number;
  onChange: (index: number) => void;
}>>;

/** Tab switcher: pills "For Individuals / For Businesses" by default, panel menu with TabsMods.Vertical. */
const Tabs: FC<Props> = ({ className, mods, items, activeIndex, onChange }) => (
  <div className={cn(mainClass, getClassNameByMods(mainClass, mods), className)} role="tablist">
    {items.map((item, index) => (
      <Button
        className={`${mainClass}__item`}
        key={item}
        role="tab"
        aria-selected={index === activeIndex}
        onClick={() => onChange(index)}
      >
        {item}
      </Button>
    ))}
  </div>
);

export default Tabs;
