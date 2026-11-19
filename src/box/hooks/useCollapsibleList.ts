import { useEffect, useId } from "react";

import { useBooleanState } from "./useBooleanState";

import { focusById } from "@box/utils";

/**
 * List that shows only the first `visibleCount` items until expanded ("Load All", "Show more").
 * After expanding, focus moves to the first revealed item: the button disappears, focus must not fall to <body>.
 * const { visibleItems, isCollapsed, expand, listId, getItemProps } = useCollapsibleList(items, 4);
 * → <List id={listId} … renderItem={(item, index) => <Card {...getItemProps(index)} />} />
 *   <Button aria-controls={listId} onClick={expand} />
 */
export const useCollapsibleList = <T>(items: readonly T[], visibleCount: number) => {
  const listId = useId();
  const firstRevealedId = `${listId}-revealed`;
  const [isExpanded, { setIsTrue: expand }] = useBooleanState();

  /** Collapsed state (fade + "Load All") only makes sense when some items are hidden. */
  const isCollapsed = !isExpanded && items.length > visibleCount;
  const visibleItems = isCollapsed ? items.slice(0, visibleCount) : items;

  useEffect(() => {
    if (isExpanded) focusById(firstRevealedId);
  }, [isExpanded, firstRevealedId]);

  /** The first revealed item is focusable from code only (tabIndex -1): the target for focus after expanding */
  const getItemProps = (index: number) => (index === visibleCount ? { id: firstRevealedId, tabIndex: -1 } : {});

  return { visibleItems, isCollapsed, expand, listId, getItemProps };
};
