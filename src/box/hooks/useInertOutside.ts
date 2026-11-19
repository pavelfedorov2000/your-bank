import { useEffect, useRef } from "react";

import type { TNullable } from "@box/types";

/**
 * While `isActive`, everything on the page except the element is `inert`: not focusable, not clickable,
 * hidden from screen readers (open mobile menu, modal). Walks from the element up to <body> and marks
 * the siblings on every level; restores them on deactivate.
 * const headerRef = useInertOutside<HTMLElement>(isMenuOpen); → <header ref={headerRef}>
 */
export const useInertOutside = <T extends HTMLElement>(isActive: boolean) => {
  const elementRef = useRef<TNullable<T>>(null);

  useEffect(() => {
    if (!isActive || !elementRef.current) return;

    const inertElements: HTMLElement[] = [];

    for (let node: TNullable<HTMLElement> = elementRef.current; node && node !== document.body; node = node.parentElement) {
      Array.from(node.parentElement?.children ?? []).forEach((sibling) => {
        if (sibling !== node && sibling instanceof HTMLElement && !sibling.inert) {
          sibling.inert = true;
          inertElements.push(sibling);
        }
      });
    }

    return () => inertElements.forEach((element) => (element.inert = false));
  }, [isActive]);

  return elementRef;
};
