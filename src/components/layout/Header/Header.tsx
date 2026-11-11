import React, { type FC } from "react";

import { BurgerButton, Ctas } from "@components/ui";
import { Container } from "@components/layout";
import { Logo, NavMenu } from "@components/content";
import UserMenu from "./UserMenu";

import { ELEMENT_IDS, GENERAL_MODS, ButtonMods } from "@box/constants";
import { useLayoutContent, useBooleanState } from "@box/hooks";
import { cn, getClassNameByMods } from "@box/utils";

import { useAuth } from "@features/auth";

import "./Header.scss";

const mainClass = "header";

const Header: FC = () => {
  const { navigation, auth: { signUp, login, logoutLabel } } = useLayoutContent();
  const { user, logout } = useAuth();
  const [isMenuOpen, { toggleState: toggleMenu }] = useBooleanState();

  return (
    <header className={mainClass}>
      <Container>
        <div className={`${mainClass}__bar`}>
          <Logo className={`${mainClass}__logo`} loading="eager" />

          <div id={ELEMENT_IDS.menu} className={cn(`${mainClass}__menu`, getClassNameByMods(`${mainClass}__menu`, [isMenuOpen && GENERAL_MODS.open]))}>
            <NavMenu className={`${mainClass}__nav`} items={navigation} ariaLabel="Header" />

            {user ? (
              <UserMenu className={`${mainClass}__user`} user={user} logoutLabel={logoutLabel} onLogout={logout} />
            ) : (
              <Ctas
                className={`${mainClass}__ctas`}
                mods={[ButtonMods.Small]}
                items={[
                  { label: signUp.label, to: signUp.path, mods: [ButtonMods.Text] },
                  { label: login.label, to: login.path, mods: [ButtonMods.Primary] },
                ]}
              />
            )}
          </div>

          <BurgerButton className={`${mainClass}__burger`} isOpen={isMenuOpen} controls={ELEMENT_IDS.menu} onClick={toggleMenu} />
        </div>
      </Container>
    </header>
  );
};

export default Header;
