import { useState } from "react";

/**
 * Active tab of a tabbed section whose content comes as `tabs: [{ label, ... }]`.
 * const { activeTab, tabsProps } = useTabs(tabs); → <Tabs {...tabsProps} /> + activeTab.items
 */
export const useTabs = <T extends { label: string }>(tabs: readonly T[]) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return {
    activeIndex,
    activeTab: tabs[activeIndex],
    /** Ready props for <Tabs />: labels, active index, change handler */
    tabsProps: {
      items: tabs.map((tab) => tab.label),
      activeIndex,
      onChange: setActiveIndex,
    },
  };
};
