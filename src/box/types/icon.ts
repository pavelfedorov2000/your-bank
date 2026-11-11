import type { ReactNode } from "react";
import type { ICONS } from "@components/ui/Icon/icons";

/** One icon in ICONS (src/components/ui/Icon/icons.tsx). */
export type TIconDefinition = {
  viewBox: string;
  body: ReactNode;
};

/** Name of an icon from ICONS. */
export type TIconName = keyof typeof ICONS;
