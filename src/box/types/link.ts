import type { TWithChildren, TWithClassName } from "./common";

/** AppLink: `to` — internal path ("/...") or any href ("#", mailto:, tel:, http). */
export type TAppLinkProps = TWithClassName<TWithChildren<{
  to: string;
}>>;
