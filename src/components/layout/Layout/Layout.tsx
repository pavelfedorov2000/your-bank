import React, { type FC } from "react";

import { Container, Footer, Header } from "@components/layout";
import ScrollTopButton from "./ScrollTopButton";
import SkipLink from "./SkipLink";

import { ELEMENT_IDS } from "@box/constants";
import type { TWithChildren } from "@box/types";

import "./Layout.scss";

const mainClass = "layout";

/**
 * Common page shell: skip link + Navbar + content + Footer (same on every page in the design) + floating "Back to top" button.
 * <main> takes focus from the skip link (tabIndex -1: focusable from code / anchors, not in the Tab order).
 */
const Layout: FC<TWithChildren> = ({ children }) => (
  <div className={mainClass}>
    <SkipLink />
    <Header />
    <main id={ELEMENT_IDS.main} className={`${mainClass}__main`} tabIndex={-1}>
      <Container>
        <div className={`${mainClass}__content`}>{children}</div>
      </Container>
    </main>
    <Footer />
    <ScrollTopButton />
  </div>
);

export default Layout;
