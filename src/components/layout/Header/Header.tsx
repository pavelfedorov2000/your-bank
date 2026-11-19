import React, { type FC } from "react";

import { Container } from "@components/layout";
import { BurgerButton, Ctas } from "@components/ui";
import { Logo, NavMenu } from "@components/content";
import UserMenu from "./UserMenu";

import { useLayoutContent, useMobileMenu } from "@box/hooks";
import { cn, getClassNameByMods } from "@box/utils";
import { ARIA_LABELS, BREAKPOINTS, COMPONENT_MODS, ELEMENT_IDS, GENERAL_MODS } from "@box/constants";
import { useAuth } from "@features/auth";

import "./Header.scss";

const mainClass = "header";

/**
 * Sticky site header: logo, navigation, auth actions. Below sm — burger menu (behavior: useMobileMenu).
 */
const Header: FC = () => {
  const { navigation, auth: { signUp, login, logoutBtnText } } = useLayoutContent();
  const { user, logout } = useAuth();
  const { isMenuOpen, toggleMenu, containerRef: headerRef } = useMobileMenu<HTMLElement>({
    menuId: ELEMENT_IDS.menu,
    triggerId: ELEMENT_IDS.burger,
    /** From sm the menu is inline in the bar (no burger) */
    inlineQuery: `(min-width: ${BREAKPOINTS.sm}px)`,
  });

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
