import { type KeyboardEvent, useId, useState } from "react";

import { getNextTabIndex, getTabId, getTabPanelProps } from "./utils";

import { focusById } from "@box/utils";

/**
 * Active tab of a tabbed section whose content comes as `tabs: [{ label, items }]`.
 * const { activeItems, tabsProps, panelProps } = useTabs(tabs); → <Tabs {...tabsProps} /> + <div {...panelProps}><List items={activeItems} /></div>
 * Tabs and the panel are linked by ids from useId(): tab → aria-controls, panel → aria-labelledby (active tab).
 */
export const useTabs = <TItem>(tabs: readonly { label: string; items: readonly TItem[] }[]) => {
  const tabsId = useId();
  const [activeIndex, setActiveIndex] = useState(0);

  /** Arrows / Home / End switch the tab and move focus to it (the row scrolls to it via useScrollActiveIntoView in Tabs) */
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const nextIndex = getNextTabIndex(event.key, activeIndex, tabs.length);

    if (nextIndex === null) return;

    event.preventDefault();
    setActiveIndex(nextIndex);
    focusById(getTabId(tabsId, nextIndex));
  };

  return {
    activeIndex,
    /** Items of the active tab; empty when there are no tabs */
    activeItems: tabs[activeIndex]?.items ?? [],
    /** Ready props for <Tabs />: id base, labels, active index, click and keyboard handlers */
    tabsProps: {
      tabsId,
      items: tabs.map((tab) => tab.label),
      activeIndex,
      onChange: setActiveIndex,
      onKeyDown: handleKeyDown,
    },
    /** Ready props for the element with the active tab's content */
    panelProps: getTabPanelProps(tabsId, activeIndex),
  };
};
