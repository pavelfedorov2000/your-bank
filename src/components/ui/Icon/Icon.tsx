import React, { type FC } from "react";

import { ICONS } from "./icons";

import { cn } from "@box/utils";
import type { TIconName, TWithClassName } from "@box/types";

import "./Icon.scss";

const mainClass = "icon";

type Props = TWithClassName<{
  /** Icon from ICONS (`icons.tsx`): ICON_NAMES.x; a string from content.json — via getIconName(). */
  name: TIconName;
  /** Accessible name. Without it the icon is decorative and hidden from screen readers. */
  title?: string;
}>;

/** Inline SVG icon from the design. Color follows CSS `color` (currentColor), size — `--icon-size` in SCSS. */
const Icon: FC<Props> = ({ name, className, title }) => {
  const { viewBox, body } = ICONS[name];

  return (
    <svg
      className={cn(mainClass, className)}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden={!title}
      focusable="false"
    >
      {title && <title>{title}</title>}
      {body}
    </svg>
  );
};

export default Icon;
