import { useEffect } from "react";

import { useBooleanState } from "./useBooleanState";

/**
 * Whether the page is scrolled further than `offset` px (by default — one screen height).
 * Listens to scroll passively and checks once per frame. const isScrolled = useIsScrolledPast(400);
 */
export const useIsScrolledPast = (offset?: number) => {
  const [isScrolledPast, { setState: setIsScrolledPast }] = useBooleanState();

  useEffect(() => {
    let frame = 0;

    const check = () => {
      frame = 0;
      setIsScrolledPast(window.scrollY > (offset ?? window.innerHeight));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(check);
    };

    check();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [offset, setIsScrolledPast]);

  return isScrolledPast;
};
