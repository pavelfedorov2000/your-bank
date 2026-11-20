import type { AnchorHTMLAttributes } from "react";

import type { TWithChildren, TWithClassName } from "./common";

/** AppLink: `to` — internal path ("/...") or any href ("#", mailto:, tel:, http); aria-label for icon-only links. */
export type TAppLinkProps = TWithClassName<TWithChildren<{
  to: string;
}>> & Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "aria-label">;
