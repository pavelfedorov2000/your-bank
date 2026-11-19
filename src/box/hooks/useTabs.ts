import { useState } from "react";

/**
 * Active tab of a tabbed section whose content comes as `tabs: [{ label, items }]`.
 * const { activeItems, tabsProps } = useTabs(tabs); → <Tabs {...tabsProps} /> + activeItems
 */
export const useTabs = <TItem>(tabs: readonly { label: string; items: readonly TItem[] }[]) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return {
    activeIndex,
    /** Items of the active tab; empty when there are no tabs */
    activeItems: tabs[activeIndex]?.items ?? [],
    /** Ready props for <Tabs />: labels, active index, change handler */
    tabsProps: {
      items: tabs.map((tab) => tab.label),
      activeIndex,
      onChange: setActiveIndex,
    },
  };
};
