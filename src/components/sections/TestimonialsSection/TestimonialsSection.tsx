import React, { useState, type FC } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import type { Swiper as TSwiperInstance } from "swiper";
import "swiper/css";

import { Section } from "@components/layout";
import { SliderControls, Tabs } from "@components/ui";
import { SectionIntro } from "@components/content";
import TestimonialCard from "./TestimonialCard";

import { SLIDER_BREAKPOINTS, SWIPER_CONTROLS_ARIA_LABELS } from "@box/constants";
import type { TNullable } from "@box/types";
import { useTabs } from "@box/hooks";

import "./TestimonialsSection.scss";

const mainClass = "testimonials";

type Props = {
  data: Queries.TestimonialsSectionFragment;
};

/** "Our Testimonials" — Home, Login, Sign Up. */
const TestimonialsSection: FC<Props> = ({ data: { intro, tabs } }) => {
  const { activeIndex, activeTab: { items }, tabsProps } = useTabs(tabs);
  const [swiper, setSwiper] = useState<TNullable<TSwiperInstance>>(null);
  const [edges, setEdges] = useState({ isBeginning: true, isEnd: false });

  const updateEdges = (instance: TSwiperInstance) =>
    setEdges({ isBeginning: instance.isBeginning, isEnd: instance.isEnd });

  return (
    <Section className={mainClass}>
      <SectionIntro data={intro} actions={<Tabs {...tabsProps} />} />

      <div className={`${mainClass}__slider`}>
        <div className={`${mainClass}__viewport`} role="tabpanel">
          {/** key: new tab → new Swiper instance (starts from the first slide, fresh prev/next state) */}
          <Swiper
            key={activeIndex}
            modules={[A11y]}
            breakpoints={SLIDER_BREAKPOINTS.testimonials}
            onSwiper={(instance) => {
              setSwiper(instance);
              updateEdges(instance);
            }}
            onSlideChange={updateEdges}
            onBreakpoint={updateEdges}
          >
            {items.map((item) => (
              <SwiperSlide className={`${mainClass}__slide`} key={item.author}>
                <TestimonialCard data={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <SliderControls
          ariaLabels={SWIPER_CONTROLS_ARIA_LABELS.testimonials}
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
