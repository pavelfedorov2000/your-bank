import React, { type FC } from "react";
import { Link } from "gatsby";

import { getIsExternalLink, getIsInternalLink } from "@box/utils";
import { EXTERNAL_LINK_ATTRS } from "@box/constants";
import type { TAppLinkProps } from "@box/types";

/**
 * Internal paths ("/...") go through Gatsby <Link>, everything else ("#", mailto:, tel:, http) — plain <a>.
 * Link to the current page gets aria-current="page": style it with [aria-current="page"].
 * External http(s) links open in a new tab.
 */
const AppLink: FC<TAppLinkProps> = ({ to, children, className }) => {
  if (getIsInternalLink(to)) {
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );
  }

  return (
    <a className={className} href={to} {...(getIsExternalLink(to) && EXTERNAL_LINK_ATTRS)}>
      {children}
    </a>
  );
};

export default AppLink;
