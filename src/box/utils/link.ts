import { REG_EXP_PATTERNS } from "@box/constants";

/** Whether a link leads to another site: "https://…" / "http://…" (not "/about/", "#", "mailto:", "tel:"). */
export const getIsExternalLink = (to: string): boolean => REG_EXP_PATTERNS.externalLink.test(to);

/** Whether a link is a path of this site ("/about/"): goes through Gatsby <Link>. */
export const getIsInternalLink = (to: string): boolean => to.startsWith("/");
