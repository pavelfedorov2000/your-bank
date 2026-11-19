import React, { type FC } from "react";

import { Button } from "@components/ui";

import { useIsScrolledPast, useScrollToTop } from "@box/hooks";
import { cn, getClassNameByMods } from "@box/utils";
import { ARIA_LABELS, COMPONENT_MODS, GENERAL_MODS, ICON_NAMES } from "@box/constants";

import "./ScrollTopButton.scss";

const mainClass = "scroll-top";

/** Round primary "Back to top" button in the bottom-right corner: hidden at the top, appears after one screen of scroll. */
const ScrollTopButton: FC = () => {
  const isVisible = useIsScrolledPast();
  const scrollToTop = useScrollToTop();

  return (
    <div className={cn(mainClass, getClassNameByMods(mainClass, [isVisible && GENERAL_MODS.visible]))}>
      <Button
        mods={[COMPONENT_MODS.button.primary, COMPONENT_MODS.button.icon]}
        icon={ICON_NAMES.arrowUp}
        aria-label={ARIA_LABELS.scrollTop}
        aria-hidden={!isVisible}
        tabIndex={isVisible ? 0 : -1}
        onClick={scrollToTop}
      />
    </div>
  );
};

export default ScrollTopButton;
