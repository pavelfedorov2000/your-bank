import React, { type FC } from "react";

import { Container } from "@components/layout";
import { AppLink, List } from "@components/ui";
import { Logo, NavMenu } from "@components/content";
import Contacts from "./Contacts";
import Socials from "./Socials";

import { useLayoutContent } from "@box/hooks";
import { ARIA_LABELS, COMPONENT_MODS } from "@box/constants";

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

            <NavMenu items={navigation} aria-label={ARIA_LABELS.nav.footer} mods={[COMPONENT_MODS.navMenu.text]} />
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
