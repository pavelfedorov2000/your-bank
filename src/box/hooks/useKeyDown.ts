import { useEffect, useRef } from "react";

import type { TKey } from "@box/types";

/**
 * Calls `onKeyDown` when the key is pressed anywhere on the page, while `isActive`.
 * useKeyDown(KEYS.escape, closeMenu, isMenuOpen);
 */
export const useKeyDown = (key: TKey, onKeyDown: () => void, isActive = true) => {
  /** Latest handler without re-subscribing on every render */
  const handlerRef = useRef(onKeyDown);
  handlerRef.current = onKeyDown;

  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === key) handlerRef.current();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [key, isActive]);
};
