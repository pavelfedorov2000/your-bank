import React, { type FC } from "react";

import { Header, Footer, Container } from "@components/layout";

import type { TWithChildren } from "@box/types";

import "./Layout.scss";

const mainClass = "layout";

/** Common page shell: Navbar + content + Footer (same on every page in the design). */
const Layout: FC<TWithChildren> = ({ children }) => (
  <div className={mainClass}>
    <Header />
    <main className={`${mainClass}__main`}>
      <Container>
        <div className={`${mainClass}__content`}>{children}</div>
      </Container>
    </main>
    <Footer />
  </div>
);

export default Layout;
