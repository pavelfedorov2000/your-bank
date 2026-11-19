import React, { type FC, type KeyboardEvent } from "react";

import { Button } from "@components/ui";

import { useScrollActiveIntoView } from "@box/hooks";
import { cn, getClassNameByMods, getNextTabIndex, getTabId, getTabPanelId } from "@box/utils";
import type { TWithClassName, TWithPropsMods } from "@box/types";

import "./Tabs.scss";

const mainClass = "tabs";

type Props = TWithClassName<TWithPropsMods<{
  /** Base of the tab / panel ids (useId() in useTabs) */
  tabsId: string;
  items: readonly string[];
  activeIndex: number;
  onChange: (index: number) => void;
}>>;

/**
 * Tab switcher: pills "For Individuals / For Businesses" by default, panel menu with COMPONENT_MODS.tabs.vertical.
 * When the row scrolls (vertical tabs on mobile), the active tab is scrolled into view.
 * Keyboard (WAI-ARIA tabs): only the active tab is in the Tab order, arrows / Home / End switch tabs.
 */
const Tabs: FC<Props> = ({ className, mods, tabsId, items, activeIndex, onChange }) => {
  const listRef = useScrollActiveIntoView<HTMLDivElement>(activeIndex);

  /** Arrows / Home / End switch the tab and move focus to it (the row scrolls to it via useScrollActiveIntoView) */
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const nextIndex = getNextTabIndex(event.key, activeIndex, items.length);

    if (nextIndex === null) return;

    event.preventDefault();
    onChange(nextIndex);
    document.getElementById(getTabId(tabsId, nextIndex))?.focus({ preventScroll: true });
  };

  return (
    <div ref={listRef} className={cn(mainClass, getClassNameByMods(mainClass, mods), className)} role="tablist" onKeyDown={handleKeyDown}>
      {items.map((item, index) => (
        <Button
          key={item}
          className={`${mainClass}__item`}
          id={getTabId(tabsId, index)}
          role="tab"
          aria-selected={index === activeIndex}
          aria-controls={getTabPanelId(tabsId)}
          tabIndex={index === activeIndex ? 0 : -1}
          onClick={() => onChange(index)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
};

export default Tabs;
