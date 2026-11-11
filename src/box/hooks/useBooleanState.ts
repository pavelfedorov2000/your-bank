import { useCallback, useState } from "react";

/** Boolean state with stable setters: `[isOpen, { setIsTrue, setIsFalse, toggleState, setState }]`. */
export const useBooleanState = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const setIsTrue = useCallback(() => setState(true), []);
  const setIsFalse = useCallback(() => setState(false), []);
  const toggleState = useCallback(() => setState((prev) => !prev), []);

  return [state, { setIsTrue, setIsFalse, toggleState, setState }] as const;
};
