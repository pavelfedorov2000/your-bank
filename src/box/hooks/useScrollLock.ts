import { useEffect } from "react";

/**
 * Locks the page scroll while `isLocked` (open mobile menu, modal): overflow hidden on <html>.
 * The width of the hidden scrollbar is added as padding, so the layout doesn't shift on desktop.
 * Previous inline styles are restored on unlock.
 */
export const useScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (!isLocked) return;

    const root = document.documentElement;
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    const { overflow, paddingRight } = root.style;

    root.style.overflow = "hidden";
    if (scrollbarWidth > 0) root.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      root.style.overflow = overflow;
      root.style.paddingRight = paddingRight;
    };
  }, [isLocked]);
};
