import React, { type FC } from "react";
import { Title } from "@components/ui";
import type { TTitleVariant, TWithClassName } from "@box/types";

type Props = TWithClassName<{
  data: Queries.HeadingFragment;
  as?: "h1" | "h2" | "h3";
  variant?: TTitleVariant;
}>;

/** Title from content.json: wraps the `highlight` part (accent in the design) into <mark>. */
const Heading: FC<Props> = ({ data: { text, highlight }, as = "h2", variant, className }) => {
  const index = highlight ? text.indexOf(highlight) : -1;

  return (
    <Title className={className} as={as} variant={variant}>
      {!highlight || index === -1 ? (
        text
      ) : (
        <>
          {text.slice(0, index)}
          <mark>{highlight}</mark>
          {text.slice(index + highlight.length)}
        </>
      )}
    </Title>
  );
};

export default Heading;
