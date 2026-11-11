import { ICONS } from "@components/ui/Icon/icons";
import type { TIconName } from "@box/types";

/** Type guard: whether a string (e.g. an icon name from content.json) is an icon from icons.tsx. */
export const getIsIconName = (name: string): name is TIconName => name in ICONS;
