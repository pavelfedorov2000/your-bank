import type { ReactNode } from "react";

import type { ICONS } from "@components/ui/Icon/icons";

import type { ICON_NAMES } from "@box/constants";

/** One icon in ICONS (src/components/ui/Icon/icons.tsx). */
export type TIconDefinition = {
  viewBox: string;
  body: ReactNode;
};

/** Name of an icon from ICONS. */
export type TIconName = keyof typeof ICONS;

/** Key of ICON_NAMES ("arrowUpRight"): how icons are named in content.json (GraphQL enum IconName). */
export type TIconKey = keyof typeof ICON_NAMES;
