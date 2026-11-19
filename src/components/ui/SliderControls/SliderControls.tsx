import React, { type FC } from "react";

import { Button } from "@components/ui";

import { cn, getClassNameByMods } from "@box/utils";
import { COMPONENT_MODS, GENERAL_MODS, ICON_NAMES } from "@box/constants";
import type { TSliderControlsAriaLabels, TWithClassName } from "@box/types";

import "./SliderControls.scss";

const mainClass = "slider-controls";

type Props = TWithClassName<{
  ariaLabels: TSliderControlsAriaLabels;
  isPrevDisabled?: boolean;
  isNextDisabled?: boolean;
  onPrev: () => void;
  onNext: () => void;
}>;

/**
 * Prev / next arrows of a slider. Mobile: centered below the slider.
 * From sm: absolutely over the slider (its nearest positioned parent), pushed to the sides.
 */
const SliderControls: FC<Props> = ({ className, ariaLabels, isPrevDisabled, isNextDisabled, onPrev, onNext }) => (
  <div className={cn(mainClass, className)}>
    <Button
      className={cn(`${mainClass}__button`, getClassNameByMods(`${mainClass}__button`, [GENERAL_MODS.prev]))}
      mods={[COMPONENT_MODS.button.icon]}
      icon={ICON_NAMES.arrowLeft}
      aria-label={ariaLabels.prev}
      disabled={isPrevDisabled}
      onClick={onPrev}
    />

    <Button
      className={cn(`${mainClass}__button`, getClassNameByMods(`${mainClass}__button`, [GENERAL_MODS.next]))}
      mods={[COMPONENT_MODS.button.icon]}
      icon={ICON_NAMES.arrowRight}
      aria-label={ariaLabels.next}
      disabled={isNextDisabled}
      onClick={onNext}
    />
  </div>
);

export default SliderControls;
