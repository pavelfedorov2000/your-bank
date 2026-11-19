import React, { type FC } from "react";

import { Section } from "@components/layout";
import { Card } from "@components/ui";
import { SectionIntro } from "@components/content";

import { cn } from "@box/utils";
import { COMPONENT_MODS } from "@box/constants";
import type { TWithChildren, TWithClassName } from "@box/types";

import "./GuideBlock.scss";

const mainClass = "guide-block";

type Props = TWithClassName<TWithChildren<{
  intro: Queries.SectionIntroFragment;
  panelClassName?: string;
}>>;

/** Design guide section (Figma "🎨 Color Styles", "🖍 Typography", "🪄 Assets"): intro + big surface panel with the content. */
const GuideBlock: FC<Props> = ({ className, panelClassName, intro, children }) => (
  <Section className={cn(mainClass, className)}>
    <SectionIntro data={intro} />
    <Card className={cn(`${mainClass}__panel`, panelClassName)} mods={[COMPONENT_MODS.card.surface]}>
      {children}
    </Card>
  </Section>
);

export default GuideBlock;
