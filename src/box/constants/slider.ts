import type { SwiperOptions } from "swiper/types";

/**
 * Swiper `breakpoints` per slider (key = slider name, min-width in px → options).
 * New slider: add a key and use it as <Swiper breakpoints={SLIDER_BREAKPOINTS.name} />.
 */
export const SLIDER_BREAKPOINTS = {
  testimonials: {
    0: { slidesPerView: 1, spaceBetween: 16 },
    1024: { slidesPerView: 3, spaceBetween: 50 },
    1920: { slidesPerView: 3, spaceBetween: 80 },
  },
} as const;

/**
 * aria-label of the prev / next arrows per slider (same keys as SLIDER_BREAKPOINTS).
 * <button aria-label={SWIPER_CONTROLS_ARIA_LABELS.testimonials.prev} />
 */
export const SWIPER_CONTROLS_ARIA_LABELS = {
  testimonials: {
    prev: "Previous testimonial",
    next: "Next testimonial",
  },
} as const;
