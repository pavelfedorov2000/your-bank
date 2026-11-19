import React, { type FC } from "react";

import { cn, getClassNameByMods } from "@box/utils";
import type { TWithChildren, TWithClassName, TWithPropsMods } from "@box/types";

import "./Section.scss";

const mainClass = "section";

type Props = TWithClassName<TWithPropsMods<TWithChildren>>;

/**
 * Page section: intro (heading) + content stacked with --section-gap.
 * Gap size: mods (COMPONENT_MODS.section) for the repeated scales, the section's own block (className) for a one-off value.
 */
const Section: FC<Props> = ({ mods, className, children }) => (
  <section className={cn(mainClass, getClassNameByMods(mainClass, mods), className)}>{children}</section>
);

export default Section;
