import { useInsertionEffect, useRef } from "react";

/**
 * Ref that always holds the latest value (a handler from props): read it in event listeners / effects
 * without re-subscribing on every render. Updated right after the render is committed, not during it
 * (a discarded concurrent render never leaks into the ref); useInsertionEffect runs before any other effect / event.
 * const handlerRef = useLatestRef(onKeyDown); → handlerRef.current() inside a listener
 */
export const useLatestRef = <T>(value: T) => {
  const ref = useRef(value);

  useInsertionEffect(() => {
    ref.current = value;
  });

  return ref;
};
