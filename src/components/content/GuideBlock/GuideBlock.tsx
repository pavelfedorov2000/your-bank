import React, { type FC } from "react";

import { Section } from "@components/layout";
import { Card } from "@components/ui";
import { SectionIntro } from "@components/content";

import { CardMods } from "@box/constants";
import type { TWithChildren, TWithClassName } from "@box/types";
import { cn } from "@box/utils";

import "./GuideBlock.scss";

const mainClass = "guide-block";

type Props = TWithClassName<TWithChildren<{
  intro: Queries.SectionIntroFragment;
  /** Element class of the section for the panel (paddings / gap through --card-* vars). */
  panelClassName?: string;
}>>;

/** Design guide section (Figma "🎨 Color Styles", "🖍 Typography", "🪄 Assets"): intro + big surface panel with the content. */
const GuideBlock: FC<Props> = ({ className, panelClassName, intro, children }) => (
  <Section className={cn(mainClass, className)}>
    <SectionIntro data={intro} />
    <Card className={cn(`${mainClass}__panel`, panelClassName)} mods={[CardMods.Surface]}>
      {children}
    </Card>
  </Section>
);

export default GuideBlock;
