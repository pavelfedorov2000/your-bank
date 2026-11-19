import React, { type FC, useState } from "react";
import type { Swiper as TSwiperInstance } from "swiper";
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Section } from "@components/layout";
import { SliderControls, Tabs } from "@components/ui";
import { SectionIntro } from "@components/content";
import TestimonialCard from "./TestimonialCard";

import { useMediaQuery } from "@box/hooks";
import { ARIA_LABELS, MEDIA_QUERIES, SLIDER_BREAKPOINTS, SLIDER_SPEED } from "@box/constants";
import type { TNullable } from "@box/types";
import { useTabs } from "@box/tabs";

import "swiper/css";
import "./TestimonialsSection.scss";

const mainClass = "testimonials";

type Props = {
  data: Queries.TestimonialsSectionFragment;
};

/** "Our Testimonials" — Home, Login, Sign Up. */
const TestimonialsSection: FC<Props> = ({ data: { intro, tabs } }) => {
  const { activeIndex, activeItems: items, tabsProps, panelProps } = useTabs(tabs);
  /** Reduced motion: slides switch instantly */
  const isReducedMotion = useMediaQuery(MEDIA_QUERIES.reducedMotion);
  const [swiper, setSwiper] = useState<TNullable<TSwiperInstance>>(null);
  const [edges, setEdges] = useState({ isBeginning: true, isEnd: false });

  const updateEdges = (instance: TSwiperInstance) =>
    setEdges({ isBeginning: instance.isBeginning, isEnd: instance.isEnd });

  return (
    <Section className={mainClass}>
      <SectionIntro data={intro} actions={<Tabs {...tabsProps} />} />

      <div className={`${mainClass}__slider`}>
        <div className={`${mainClass}__viewport`} {...panelProps}>
          {/** key: new tab → new Swiper instance (starts from the first slide, fresh prev/next state) */}
          <Swiper
            key={activeIndex}
            modules={[A11y]}
            speed={isReducedMotion ? 0 : SLIDER_SPEED}
            breakpoints={SLIDER_BREAKPOINTS.testimonials}
            onSwiper={(instance) => {
              setSwiper(instance);
              updateEdges(instance);
            }}
            onSlideChange={updateEdges}
            onBreakpoint={updateEdges}
          >
            {items.map((item) => (
              <SwiperSlide key={item.author} className={`${mainClass}__slide`}>
                <TestimonialCard data={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <SliderControls
          ariaLabels={ARIA_LABELS.sliderControls.testimonials}
          isPrevDisabled={edges.isBeginning}
          isNextDisabled={edges.isEnd}
          onPrev={() => swiper?.slidePrev()}
          onNext={() => swiper?.slideNext()}
        />
      </div>
    </Section>
  );
};

export default TestimonialsSection;
