import type { ARIA_LABELS } from "@box/constants";

/** aria-labels of a slider's prev / next arrows: one entry of ARIA_LABELS.sliderControls. */
export type TSliderControlsAriaLabels = (typeof ARIA_LABELS.sliderControls)[keyof typeof ARIA_LABELS.sliderControls];
