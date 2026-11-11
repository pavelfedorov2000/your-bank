import React, { type FC } from "react";

import { Container } from "@components/layout";
import { Logo, NavMenu } from "@components/content";
import Contacts from "./Contacts";
import Socials from "./Socials";
import { NavMenuMods } from "@box/constants";
import { AppLink, List } from "@components/ui";

import { useLayoutContent } from "@box/hooks";

import "./Footer.scss";

const mainClass = "footer";

const Footer: FC = () => {
  const { navigation, footer: { contacts, socials, copyright, legalLinks} } = useLayoutContent();

  return (
    <footer className={mainClass}>
      <Container>
        <div className={`${mainClass}__inner`}>
          <div className={`${mainClass}__top`}>
            <Logo className={`${mainClass}__logo`} />

            <NavMenu items={navigation} ariaLabel="Footer" mods={[NavMenuMods.Text]} />
          </div>

          <Contacts className={`${mainClass}__contacts`} items={contacts} />

          <div className={`${mainClass}__bottom`}>
            <Socials className={`${mainClass}__socials`} items={socials} />

            <p className={`${mainClass}__copyright`}>{copyright}</p>
            <List
              className={`${mainClass}__legal`}
              itemClassName={`${mainClass}__legal-item`}
              items={legalLinks}
              getKey={(link) => link.label}
              renderItem={(link) => (
                <AppLink className={`${mainClass}__legal-link`} to={link.path}>
                  {link.label}
                </AppLink>
              )}
            />
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
