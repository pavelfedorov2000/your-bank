import React, { type FC } from "react";

import type { TWithChildren, TWithClassName, TWithPropsMods } from "@box/types";
import { cn, getClassNameByMods } from "@box/utils";

import "./Section.scss";

const mainClass = "section";

type Props = TWithClassName<TWithPropsMods<TWithChildren>>;

/**
 * Page section: intro (heading) + content stacked with --section-gap.
 * Gap size: mods (SectionMods) for the repeated scales, the section's own block (className) for a one-off value.
 */
const Section: FC<Props> = ({ mods, className, children }) => (
  <section className={cn(mainClass, getClassNameByMods(mainClass, mods), className)}>{children}</section>
);

export default Section;
