import { useEffect } from "react";

import { useBooleanState } from "./useBooleanState";

/** Set once per page session: the first full load is over, client-side navigation starts loaded. */
let isWindowLoaded = false;

/**
 * Whether the window has finished loading (fonts, images, styles — the "load" event).
 * false on the server and on the first render of a full page load; true right away after client-side navigation.
 */
export const useIsWindowLoaded = () => {
  const [isLoaded, { setIsTrue: setIsLoaded }] = useBooleanState(isWindowLoaded);

  useEffect(() => {
    if (isLoaded) return;

    const finish = () => {
      isWindowLoaded = true;
      setIsLoaded();
    };

    if (document.readyState === "complete") {
      finish();
      return;
    }

    window.addEventListener("load", finish);

    return () => window.removeEventListener("load", finish);
  }, [isLoaded, setIsLoaded]);

  return isLoaded;
};
