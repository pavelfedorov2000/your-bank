import { type TransitionEvent, useEffect } from "react";

import { useBooleanState } from "./useBooleanState";
import { useIsWindowLoaded } from "./useIsWindowLoaded";
import { useScrollLock } from "./useScrollLock";

import { getIsReducedMotion } from "@box/utils";

/**
 * Preloader over the page until the window has loaded (useIsWindowLoaded), then it fades out and unmounts.
 * Only on a full page load: client-side navigation starts loaded, so the preloader is never mounted.
 * While visible the page doesn't scroll.
 * const { isMounted, isVisible, onTransitionEnd } = usePreloader();
 * → isMounted && <div className={isVisible && "…--visible"} onTransitionEnd={onTransitionEnd} />
 */
export const usePreloader = () => {
  const isLoaded = useIsWindowLoaded();
  const [isMounted, { setIsFalse: unmount }] = useBooleanState(!isLoaded);

  useScrollLock(isMounted && !isLoaded);

  /** Reduced motion: no fade (--transition is 0s), so no transitionend either */
  useEffect(() => {
    if (isLoaded && getIsReducedMotion()) unmount();
  }, [isLoaded, unmount]);

  /** The fade-out of the preloader itself is over (not a transition of something inside) */
  const onTransitionEnd = (event: TransitionEvent<HTMLElement>) => {
    if (isLoaded && event.target === event.currentTarget) unmount();
  };

  return { isMounted, isVisible: !isLoaded, onTransitionEnd };
};
