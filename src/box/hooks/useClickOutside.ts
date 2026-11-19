import { type RefObject, useEffect, useRef } from "react";

import type { TNullable } from "@box/types";

/**
 * Calls `onClickOutside` on a press anywhere outside the element, while `isActive` (open menu, popover).
 * pointerdown: closes before the click lands (mouse, touch, pen). Works over `inert` content too: the event reaches the document.
 * useClickOutside(headerRef, closeMenu, isMenuOpen);
 */
export const useClickOutside = <T extends HTMLElement>(
  elementRef: RefObject<TNullable<T>>,
  onClickOutside: () => void,
  isActive = true,
) => {
  /** Latest handler without re-subscribing on every render */
  const handlerRef = useRef(onClickOutside);
  handlerRef.current = onClickOutside;

  useEffect(() => {
    if (!isActive) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !elementRef.current?.contains(event.target)) handlerRef.current();
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [elementRef, isActive]);
};
