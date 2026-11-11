import React, { type FC, type ReactNode } from "react";
import { cn } from "@box/utils";
import { Heading, TextBlock } from "@components/content";
import type { TWithClassName } from "@box/types";
import { TitleVariants } from "@box/constants";
import "./SectionIntro.scss";

const mainClass = "section-intro";

type Props = TWithClassName<{
  data: Queries.SectionIntroFragment;
  headingLevel?: "h1" | "h2";
  /** Right side on desktop / below text on mobile (e.g. Tabs). */
  actions?: ReactNode;
}>;

/** Section title + description block, repeated across almost every section of the design. */
const SectionIntro: FC<Props> = ({ data, headingLevel = "h2", actions, className }) => (
  <header className={cn(mainClass, className)}>
    <TextBlock
      className={`${mainClass}__text`}
      title={<Heading data={data.title} as={headingLevel} variant={TitleVariants.Section} />}
      description={data.description}
    />
    {actions && <div className={`${mainClass}__actions`}>{actions}</div>}
  </header>
);

export default SectionIntro;
