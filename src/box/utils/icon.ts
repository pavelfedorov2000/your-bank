import { ICON_NAMES } from "@box/constants";
import type { TIconKey } from "@box/types";

/** Icon from content.json ("arrowUpRight", GraphQL enum IconName) → its name in ICONS ("arrow-up-right"). */
export const getIconName = (key: TIconKey) => ICON_NAMES[key];
