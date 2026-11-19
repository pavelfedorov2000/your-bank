import { KEYS } from "@box/constants";

/** Id of a tab button: `${tabsId}-tab-${index}` (tabsId comes from useId() in useTabs). */
export const getTabId = (tabsId: string, index: number) => `${tabsId}-tab-${index}`;

/** Id of the tab panel: `${tabsId}-panel`. */
export const getTabPanelId = (tabsId: string) => `${tabsId}-panel`;

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
