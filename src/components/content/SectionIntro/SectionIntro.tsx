import React, { type FC, type ReactNode } from "react";

import { Title } from "@components/ui";
import { TextBlock } from "@components/content";

import { cn } from "@box/utils";
import { TitleVariants } from "@box/constants";
import type { TWithClassName } from "@box/types";

import "./SectionIntro.scss";

const mainClass = "section-intro";

type Props = TWithClassName<{
  data: Queries.SectionIntroFragment;
  headingLevel?: "h1" | "h2";
  actions?: ReactNode;
}>;

/** Section title + description block, repeated across almost every section of the design. */
const SectionIntro: FC<Props> = ({ data, headingLevel = "h2", actions, className }) => (
  <header className={cn(mainClass, className)}>
    <TextBlock
      className={`${mainClass}__text`}
      title={<Title as={headingLevel} variant={TitleVariants.Section} html={data.title} />}
      description={data.description}
    />
    {actions && <div className={`${mainClass}__actions`}>{actions}</div>}
  </header>
);

export default SectionIntro;
