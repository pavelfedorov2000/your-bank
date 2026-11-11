import React, { type FC } from "react";
import { Link } from "gatsby";
import type { TWithChildren, TWithClassName } from "@box/types";

type Props = TWithClassName<TWithChildren<{
  to: string;
}>>;

/**
 * Internal paths ("/...") go through Gatsby <Link>, everything else ("#", mailto:, tel:, http) — plain <a>.
 * Link to the current page gets aria-current="page": style it with [aria-current="page"].
 * External http(s) links open in a new tab.
 */
const AppLink: FC<Props> = ({ to, children, className }) => {
  const isInternal = to.startsWith("/");

  if (isInternal) {
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );
  }

  const isExternal = /^https?:\/\//.test(to);

  return (
    <a className={className} href={to} {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}>
      {children}
    </a>
  );
};

export default AppLink;
