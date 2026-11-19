import { useEffect } from "react";

import { useBooleanState } from "./useBooleanState";

/**
 * Whether a media query matches, kept in sync on change (resize, rotation, system settings).
 * false on the server and on the first render. const isLaptop = useMediaQuery(getMediaQuery(BREAKPOINTS.lg));
 */
export const useMediaQuery = (query: string) => {
  const [isMatching, { setState: setIsMatching }] = useBooleanState();

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const update = () => setIsMatching(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, [query, setIsMatching]);

  return isMatching;
};
