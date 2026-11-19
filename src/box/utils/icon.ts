import type { TIconName } from "@box/types";

/**
 * Icon name from content.json as TIconName. Every "icon" in content.json is checked against ICON_NAMES
 * at build / develop start (gatsby-node onPreBootstrap), so an unknown name never reaches the components.
 */
export const getIconName = (name: string) => name as TIconName;
