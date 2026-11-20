import type { TTabPanelProps, TTabProps } from "./types";

import { KEYS } from "@box/constants";

/** Id of a tab button: `${tabsId}-tab-${index}` (tabsId comes from useId() in useTabs). */
export const getTabId = (tabsId: string, index: number) => `${tabsId}-tab-${index}`;

/** Id of the tab panel: `${tabsId}-panel`. */
export const getTabPanelId = (tabsId: string) => `${tabsId}-panel`;

/**
 * A11y props of a tab (WAI-ARIA tabs pattern): linked to the panel, only the active tab is in the Tab order.
 * <Button {...getTabProps(tabsId, index, activeIndex)} />
 */
export const getTabProps = (tabsId: string, index: number, activeIndex: number): TTabProps => ({
  id: getTabId(tabsId, index),
  role: "tab",
  "aria-selected": index === activeIndex,
  "aria-controls": getTabPanelId(tabsId),
  tabIndex: index === activeIndex ? 0 : -1,
});

/**
 * A11y props of the panel with the active tab's content: labelled by the active tab, focusable
 * (Tab from the active tab goes to the panel: the cards inside have nothing focusable).
 */
export const getTabPanelProps = (tabsId: string, activeIndex: number): TTabPanelProps => ({
  id: getTabPanelId(tabsId),
  role: "tabpanel",
  "aria-labelledby": getTabId(tabsId, activeIndex),
  tabIndex: 0,
});

/**
 * Tab to move to by a key (WAI-ARIA tabs pattern): ←/↑ — previous, →/↓ — next (both wrap around), Home / End — first / last.
 * null for other keys. Both arrow pairs work: the tabs are vertical on desktop and horizontal on mobile.
 */
export const getNextTabIndex = (key: string, activeIndex: number, count: number) => {
  switch (key) {
    case KEYS.arrowLeft:
    case KEYS.arrowUp:
      return (activeIndex - 1 + count) % count;
    case KEYS.arrowRight:
    case KEYS.arrowDown:
      return (activeIndex + 1) % count;
    case KEYS.home:
      return 0;
    case KEYS.end:
      return count - 1;
    default:
      return null;
  }
};
