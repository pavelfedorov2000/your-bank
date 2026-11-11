import React, { type FC } from "react";
import { ICONS } from "./icons";
import type { TIconName, TWithClassName } from "@box/types";
import { cn, getIsIconName } from "@box/utils";

import "./Icon.scss";

const mainClass = "icon";

type Props = TWithClassName<{
  /** Icon from ICONS (`icons.tsx`). Strings from content.json are accepted too (checked at runtime). */
  name: TIconName | (string & {});
  /** Accessible name. Without it the icon is decorative and hidden from screen readers. */
  title?: string;
}>;

/** Inline SVG icon from the design. Color follows CSS `color` (currentColor), size — `--icon-size` in SCSS. */
const Icon: FC<Props> = ({ name, className, title }) => {
  if (!getIsIconName(name)) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`Icon "${name}" not found in src/components/ui/Icon/icons.tsx`);
    }
    return null;
  }

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
