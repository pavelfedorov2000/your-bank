import React, { type FC } from "react";

import { Icon } from "@components/ui";

import "./TestimonialCard.scss";

const mainClass = "testimonial-card";

type Props = {
  data: Queries.TestimonialCardFragment;
};

/** Customer quote: quote mark between two lines, text, author. Fills the height of its slide. */
const TestimonialCard: FC<Props> = ({ data: { quote, author } }) => (
  <figure className={mainClass}>
    <div className={`${mainClass}__header`}>
      <Icon className={`${mainClass}__quote-icon`} name="quote" />
    </div>
    <blockquote className={`${mainClass}__quote`}>{quote}</blockquote>
    <figcaption className={`${mainClass}__author`}>{author}</figcaption>
  </figure>
);

export default TestimonialCard;
