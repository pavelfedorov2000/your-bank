import React, { type FC } from "react";

import type { TWithChildren, TWithClassName } from "@box/types";
import { cn } from "@box/utils";

import "./Section.scss";

const mainClass = "section";

type Props = TWithClassName<TWithChildren>;

/**
 * Page section: intro (heading) + content stacked with --section-gap.
 * The section's own block (className) can override --section-gap when the design differs.
 */
const Section: FC<Props> = ({ className, children }) => (
  <section className={cn(mainClass, className)}>{children}</section>
);

export default Section;
