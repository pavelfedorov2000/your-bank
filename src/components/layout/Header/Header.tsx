import React, { type FC, useEffect } from "react";

import { Container } from "@components/layout";
import { BurgerButton, Ctas } from "@components/ui";
import { Logo, NavMenu } from "@components/content";
import UserMenu from "./UserMenu";

import { useBooleanState, useInertOutside, useKeyDown, useLayoutContent, useMediaQuery, useScrollLock } from "@box/hooks";
import { cn, focusById, focusFirstInside, getClassNameByMods } from "@box/utils";
import { ARIA_LABELS, BREAKPOINTS, COMPONENT_MODS, ELEMENT_IDS, GENERAL_MODS, KEYS } from "@box/constants";
import { useAuth } from "@features/auth";

import "./Header.scss";

const mainClass = "header";

/**
 * Sticky site header. Mobile menu (burger) while open: page under it is locked (scroll) and inert (focus, screen readers),
 * focus moves to the first menu link; Escape closes it and returns focus to the burger.
 */
const Header: FC = () => {
  const { navigation, auth: { signUp, login, logoutBtnText } } = useLayoutContent();
  const { user, logout } = useAuth();
  const [isMenuOpen, { toggleState: toggleMenu, setIsFalse: closeMenu }] = useBooleanState();
  /** From sm the menu is inline in the bar (no burger): an open mobile menu must not stay open / lock the page */
  const isMenuInline = useMediaQuery(`(min-width: ${BREAKPOINTS.sm}px)`);

  useEffect(() => {
    if (isMenuInline) closeMenu();
  }, [isMenuInline, closeMenu]);

  useScrollLock(isMenuOpen);
  const headerRef = useInertOutside<HTMLElement>(isMenuOpen);

  useEffect(() => {
    if (isMenuOpen) focusFirstInside(ELEMENT_IDS.menu);
  }, [isMenuOpen]);

  useKeyDown(
    KEYS.escape,
    () => {
      closeMenu();
      focusById(ELEMENT_IDS.burger);
    },
    isMenuOpen,
  );

  return (
    <header ref={headerRef} className={mainClass}>
      <Container>
        <div className={`${mainClass}__bar`}>
          <Logo className={`${mainClass}__logo`} loading="eager" />

          <div id={ELEMENT_IDS.menu} className={cn(`${mainClass}__menu`, getClassNameByMods(`${mainClass}__menu`, [isMenuOpen && GENERAL_MODS.open]))}>
            <NavMenu className={`${mainClass}__nav`} items={navigation} aria-label={ARIA_LABELS.nav.header} />

            {user ? (
              <UserMenu className={`${mainClass}__user`} user={user} logoutBtnText={logoutBtnText} onLogout={logout} />
            ) : (
              <Ctas
                className={`${mainClass}__ctas`}
                mods={[COMPONENT_MODS.button.small]}
                items={[
                  { label: signUp.label, to: signUp.path, mods: [COMPONENT_MODS.button.text] },
                  { label: login.label, to: login.path, mods: [COMPONENT_MODS.button.primary] },
                ]}
              />
            )}
          </div>

          <BurgerButton className={`${mainClass}__burger`} isOpen={isMenuOpen} onClick={toggleMenu} />
        </div>
      </Container>
    </header>
  );
};

export default Header;
