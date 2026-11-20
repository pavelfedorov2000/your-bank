import React, { type FC, type HTMLAttributes } from "react";

import { Button } from "@components/ui";

import { useScrollActiveIntoView } from "@box/hooks";
import { cn, getClassNameByMods } from "@box/utils";
import type { TWithClassName, TWithPropsMods } from "@box/types";
import { getTabProps } from "@box/tabs";

import "./Tabs.scss";

const mainClass = "tabs";

type Props = TWithClassName<TWithPropsMods<{
  /** Base of the tab / panel ids (useId() in useTabs) */
  tabsId: string;
  items: readonly string[];
  activeIndex: number;
  onChange: (index: number) => void;
}> & Required<Pick<HTMLAttributes<HTMLDivElement>, "onKeyDown">>>;

/**
 * Tab switcher: pills "For Individuals / For Businesses" by default, panel menu with COMPONENT_MODS.tabs.vertical.
 * When the row scrolls (vertical tabs on mobile), the active tab is scrolled into view.
 * Keyboard (WAI-ARIA tabs): only the active tab is in the Tab order, arrows / Home / End switch tabs (handler from useTabs).
 */
const Tabs: FC<Props> = ({ className, mods, tabsId, items, activeIndex, onChange, onKeyDown }) => {
  const listRef = useScrollActiveIntoView<HTMLDivElement>(activeIndex);

  return (
    <div ref={listRef} className={cn(mainClass, getClassNameByMods(mainClass, mods), className)} role="tablist" onKeyDown={onKeyDown}>
      {items.map((item, index) => (
        <Button
          key={item}
          className={`${mainClass}__item`}
          {...getTabProps(tabsId, index, activeIndex)}
          onClick={() => onChange(index)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
};

export default Tabs;
