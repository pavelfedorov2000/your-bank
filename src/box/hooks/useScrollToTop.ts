import { useCallback } from "react";

import { getScrollBehavior } from "@box/utils";

/**
 * Stable handler that scrolls the window to `topOffset` px from the top (0 — the very top).
 * Smooth, or instant with prefers-reduced-motion. const scrollToTop = useScrollToTop(); → <Button onClick={scrollToTop} />
 */
export const useScrollToTop = (topOffset = 0) =>
  useCallback(() => window.scrollTo({ top: topOffset, behavior: getScrollBehavior() }), [topOffset]);
