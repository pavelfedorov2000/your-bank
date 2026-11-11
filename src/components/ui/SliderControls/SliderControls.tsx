import React, { type FC } from "react";

import { Button } from "@components/ui";

import { ButtonMods, GENERAL_MODS } from "@box/constants";
import type { TWithClassName } from "@box/types";
import { cn, getClassNameByMods } from "@box/utils";

import "./SliderControls.scss";

const mainClass = "slider-controls";

type Props = TWithClassName<{
  /** aria-labels of the arrows, e.g. SWIPER_CONTROLS_ARIA_LABELS.testimonials */
  ariaLabels: { prev: string; next: string };
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
      mods={[ButtonMods.Icon]}
      icon="arrow-left"
      aria-label={ariaLabels.prev}
      disabled={isPrevDisabled}
      onClick={onPrev}
    />

    <Button
      className={cn(`${mainClass}__button`, getClassNameByMods(`${mainClass}__button`, [GENERAL_MODS.next]))}
      mods={[ButtonMods.Icon]}
      icon="arrow-right"
      aria-label={ariaLabels.next}
      disabled={isNextDisabled}
      onClick={onNext}
    />
  </div>
);

export default SliderControls;
