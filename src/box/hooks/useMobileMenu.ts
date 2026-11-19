import { useEffect } from "react";

import { useBooleanState } from "./useBooleanState";
import { useClickOutside } from "./useClickOutside";
import { useInertOutside } from "./useInertOutside";
import { useKeyDown } from "./useKeyDown";
import { useMediaQuery } from "./useMediaQuery";
import { useScrollLock } from "./useScrollLock";

import { focusById, focusFirstInside } from "@box/utils";
import { KEYS } from "@box/constants";

/**
 * Mobile menu that behaves like a modal while open:
 * - the page under it doesn't scroll and is inert (no focus, hidden from screen readers);
 * - focus moves to the first link of the menu;
 * - Escape closes it and returns focus to the trigger (the hidden menu would drop focus to <body>);
 * - a press outside the container closes it (focus follows the press itself);
 * - from `inlineQuery` the menu is inline (no trigger): an open menu closes.
 * const { isMenuOpen, toggleMenu, containerRef } = useMobileMenu({ menuId, triggerId, inlineQuery });
 * → <header ref={containerRef}> … <div id={menuId}> … <BurgerButton id={triggerId} onClick={toggleMenu} />
 */
export const useMobileMenu = <T extends HTMLElement>({
  menuId,
  triggerId,
  inlineQuery,
}: {
  menuId: string;
  triggerId: string;
  /** Media query from which the menu is shown inline */
  inlineQuery: string;
}) => {
  const [isMenuOpen, { toggleState: toggleMenu, setIsFalse: closeMenu }] = useBooleanState();
  const isMenuInline = useMediaQuery(inlineQuery);
  const containerRef = useInertOutside<T>(isMenuOpen);

  useScrollLock(isMenuOpen);

  useEffect(() => {
    if (isMenuInline) closeMenu();
  }, [isMenuInline, closeMenu]);

  useEffect(() => {
    if (isMenuOpen) focusFirstInside(menuId);
  }, [isMenuOpen, menuId]);

  useKeyDown(
    KEYS.escape,
    () => {
      closeMenu();
      focusById(triggerId);
    },
    isMenuOpen,
  );
  useClickOutside(containerRef, closeMenu, isMenuOpen);

  return { isMenuOpen, toggleMenu, containerRef };
};
