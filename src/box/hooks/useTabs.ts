import { useId, useState } from "react";

import { getTabId, getTabPanelId } from "@box/utils";
import type { TTabPanelProps } from "@box/types";

/**
 * Active tab of a tabbed section whose content comes as `tabs: [{ label, items }]`.
 * const { activeItems, tabsProps, panelProps } = useTabs(tabs); → <Tabs {...tabsProps} /> + <div {...panelProps}><List items={activeItems} /></div>
 * Tabs and the panel are linked by ids from useId(): tab → aria-controls, panel → aria-labelledby (active tab).
 */
export const useTabs = <TItem>(tabs: readonly { label: string; items: readonly TItem[] }[]) => {
  const tabsId = useId();
  const [activeIndex, setActiveIndex] = useState(0);

  const panelProps: TTabPanelProps = {
    id: getTabPanelId(tabsId),
    role: "tabpanel",
    "aria-labelledby": getTabId(tabsId, activeIndex),
    /** Tab from the active tab goes to the panel (WAI-ARIA tabs: the cards inside have nothing focusable) */
    tabIndex: 0,
  };

  return {
    activeIndex,
    /** Items of the active tab; empty when there are no tabs */
    activeItems: tabs[activeIndex]?.items ?? [],
    /** Ready props for <Tabs />: id base, labels, active index, change handler */
    tabsProps: {
      tabsId,
      items: tabs.map((tab) => tab.label),
      activeIndex,
      onChange: setActiveIndex,
    },
    /** Ready props for the element with the active tab's content */
    panelProps,
  };
};
