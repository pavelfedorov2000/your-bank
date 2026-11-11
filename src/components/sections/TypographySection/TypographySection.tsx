import React, { type CSSProperties, type FC } from "react";

import { Card, List, Title } from "@components/ui";
import { GuideBlock } from "@components/content";

import { CardMods, TitleVariants } from "@box/constants";

import "./TypographySection.scss";

const mainClass = "typography";

type Props = {
  data: Queries.TypographySectionFragment;
};

/** Design guide "🖍 Typography": font specimen, used weights and the character sets. */
const TypographySection: FC<Props> = ({ data: { intro, fontName, weightsTitle, weights, charsets } }) => (
  <GuideBlock className={mainClass} intro={intro}>
    <div className={`${mainClass}__top`}>
      <Card className={`${mainClass}__specimen-card`} mods={[CardMods.Inset]}>
        {/** Font name inside the type-design guide lines (baseline / cap height / side bearings) */}
        <p className={`${mainClass}__specimen`}>{fontName}</p>
      </Card>

      <Card className={`${mainClass}__weights-card`} mods={[CardMods.Inset]}>
        <Title as="h3" variant={TitleVariants.Card}>
          {weightsTitle}
        </Title>
        <List
          className={`${mainClass}__weights`}
          items={weights}
          getKey={(weight) => weight.value}
          renderItem={({ label, value }) => (
            <span className={`${mainClass}__weight`} style={{ "--typography-weight": value } as CSSProperties}>
              {label}
            </span>
          )}
        />
      </Card>
    </div>

    <Card className={`${mainClass}__charsets-card`} mods={[CardMods.Inset]}>
      <List
        className={`${mainClass}__charsets`}
        items={charsets}
        getKey={(charset) => charset.title}
        renderItem={({ title, characters }) => (
          <section className={`${mainClass}__charset`}>
            <Title as="h3" variant={TitleVariants.Card}>
              {title}
            </Title>
            <List
              className={`${mainClass}__chars`}
              items={[...characters]}
              renderItem={(character) => <span className={`${mainClass}__char`}>{character}</span>}
            />
          </section>
        )}
      />
    </Card>
  </GuideBlock>
);

export default TypographySection;
