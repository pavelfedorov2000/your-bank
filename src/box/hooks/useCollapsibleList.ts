import { useBooleanState } from "./useBooleanState";

/**
 * List that shows only the first `visibleCount` items until expanded ("Load All", "Show more").
 * const { visibleItems, isCollapsed, expand } = useCollapsibleList(items, 4);
 */
export const useCollapsibleList = <T>(items: readonly T[], visibleCount: number) => {
  const [isExpanded, { setIsTrue: expand }] = useBooleanState();

  /** Collapsed state (fade + "Load All") only makes sense when some items are hidden. */
  const isCollapsed = !isExpanded && items.length > visibleCount;
  const visibleItems = isCollapsed ? items.slice(0, visibleCount) : items;

  return { visibleItems, isCollapsed, expand };
};
