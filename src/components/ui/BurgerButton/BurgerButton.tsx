import React, { type FC } from "react";

import { Icon } from "@components/ui";

import type { TWithClassName } from "@box/types";
import { cn } from "@box/utils";

import "./BurgerButton.scss";

const mainClass = "burger-button";

/** aria-label depending on the menu state. */
const ARIA_LABELS = {
  open: "Open menu",
  close: "Close menu",
} as const;

type Props = TWithClassName<{
  isOpen: boolean;
  /** id of the menu it toggles (aria-controls), e.g. ELEMENT_IDS.menu. */
  controls: string;
  onClick: () => void;
}>;

/** Toggle button of a collapsible menu. Visibility by breakpoint comes from the parent's element class. */
const BurgerButton: FC<Props> = ({ className, isOpen, controls, onClick }) => (
  <button
    className={cn(mainClass, className)}
    type="button"
    aria-label={isOpen ? ARIA_LABELS.close : ARIA_LABELS.open}
    aria-expanded={isOpen}
    aria-controls={controls}
    onClick={onClick}
  >
    <Icon className={`${mainClass}__icon`} name="menu" />
  </button>
);

export default BurgerButton;
