import { useEffect, useRef } from "react";

import type { TNullable } from "@box/types";

const getCenter = (rect: DOMRect) => rect.left + rect.width / 2;

/**
 * Keeps the active child of a horizontally scrollable row in view (tabs, chips on mobile):
 * when `activeIndex` changes, the row scrolls so the active child is centered.
 * Scrolls only the row itself (not the page, unlike scrollIntoView) and only when the row overflows.
 * const listRef = useScrollActiveIntoView<HTMLDivElement>(activeIndex); → <div ref={listRef}>{items}</div>
 */
export const useScrollActiveIntoView = <T extends HTMLElement>(activeIndex: number) => {
  const containerRef = useRef<TNullable<T>>(null);

  useEffect(() => {
    const container = containerRef.current;
    const activeItem = container?.children[activeIndex];

    if (!container || !activeItem || container.scrollWidth <= container.clientWidth) return;

    const containerRect = container.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();

    /** Distance from the item's center to the container's center */
    const itemCenter = getCenter(itemRect);
    const containerCenter = getCenter(containerRect);
    const offset = itemCenter - containerCenter;
    
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    container.scrollBy({ left: offset, behavior: isReducedMotion ? "auto" : "smooth" });
  }, [activeIndex]);

  return containerRef;
};
