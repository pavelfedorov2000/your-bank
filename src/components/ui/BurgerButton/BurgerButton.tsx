import React, { type FC } from "react";

import { Icon } from "@components/ui";

import { cn } from "@box/utils";
import { ARIA_LABELS, ELEMENT_IDS, ICON_NAMES } from "@box/constants";
import type { TWithClassName } from "@box/types";

import "./BurgerButton.scss";

const mainClass = "burger-button";

type Props = TWithClassName<{
  isOpen: boolean;
  onClick: () => void;
}>;

/** Toggle button of a collapsible menu. Visibility by breakpoint comes from the parent's element class. */
const BurgerButton: FC<Props> = ({ className, isOpen, onClick }) => (
  <button
    className={cn(mainClass, className)}
    aria-label={isOpen ? ARIA_LABELS.burgerBtn.close : ARIA_LABELS.burgerBtn.open}
    aria-expanded={isOpen}
    aria-controls={ELEMENT_IDS.menu}
    onClick={onClick}
  >
    <Icon className={`${mainClass}__icon`} name={ICON_NAMES.menu} />
  </button>
);

export default BurgerButton;
