import React, { type FC } from "react";
import { withPrefix } from "gatsby";

import logo from "@images/logo.svg";

import { Card, Image, List, Title } from "@components/ui";
import { GuideBlock } from "@components/content";

import { CardMods, TitleVariants } from "@box/constants";
import { useLayoutContent } from "@box/hooks";

import "./AssetsSection.scss";

const mainClass = "assets";

/** Logo's own proportions (logo.svg viewBox 156x41). */
const LOGO_RATIO = 41 / 156;

type Props = {
  data: Queries.AssetsSectionFragment;
};

/** Design guide "🪄 Assets": logo sizes per breakpoint and the abstract decor of the template. */
const AssetsSection: FC<Props> = ({ data: { intro, logoTitle, logoVariants, abstractTitle, abstractDesigns } }) => {
  const { brand } = useLayoutContent();

  return (
    <GuideBlock className={mainClass} intro={intro}>
      <Card className={`${mainClass}__group`} mods={[CardMods.Inset]} as="section">
        <Title as="h3" variant={TitleVariants.Card}>
          {logoTitle}
        </Title>
        <Card className={`${mainClass}__showcase`} mods={[CardMods.Inset]}>
          <List
            className={`${mainClass}__logos`}
            items={logoVariants}
            getKey={(variant) => variant.label}
            renderItem={({ label, width }) => (
              <figure className={`${mainClass}__logo`}>
                <Image src={logo} alt={`${brand} logo`} width={width} height={Math.round(width * LOGO_RATIO)} />
                {/** Measure line with end ticks around the caption */}
                <figcaption className={`${mainClass}__caption`}>{label}</figcaption>
              </figure>
            )}
          />
        </Card>
      </Card>

      <Card className={`${mainClass}__group`} mods={[CardMods.Inset]} as="section">
        <Title as="h3" variant={TitleVariants.Card}>
          {abstractTitle}
        </Title>
        <Card className={`${mainClass}__showcase`} mods={[CardMods.Inset]}>
          <List
            className={`${mainClass}__designs`}
            itemClassName={`${mainClass}__design`}
            items={abstractDesigns}
            getKey={(design) => design.image}
            renderItem={({ image, alt }) => <Image className={`${mainClass}__design-image`} src={withPrefix(image)} alt={alt} />}
          />
        </Card>
      </Card>
    </GuideBlock>
  );
};

export default AssetsSection;
