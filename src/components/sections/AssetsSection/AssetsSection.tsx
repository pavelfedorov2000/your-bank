import React, { type FC } from "react";
import { GatsbyImage } from "gatsby-plugin-image";

import logo from "@images/logo.svg";

import { Card, Image, List, Title } from "@components/ui";
import { GuideBlock } from "@components/content";

import { useLayoutContent } from "@box/hooks";
import { COMPONENT_MODS, LOGO_SIZE, TitleVariants } from "@box/constants";

import "./AssetsSection.scss";

const mainClass = "assets";

type Props = {
  data: Queries.AssetsSectionFragment;
};

/** Design guide "🪄 Assets": logo sizes per breakpoint and the abstract decor of the template. */
const AssetsSection: FC<Props> = ({ data: { intro, logoTitle, logoVariants, abstractTitle, abstractDesigns } }) => {
  const { brand } = useLayoutContent();

  return (
    <GuideBlock className={mainClass} intro={intro}>
      <Card className={`${mainClass}__group`} mods={[COMPONENT_MODS.card.inset]} as="section">
        <Title as="h3" variant={TitleVariants.Card}>
          {logoTitle}
        </Title>
        <Card className={`${mainClass}__showcase`} mods={[COMPONENT_MODS.card.inset]}>
          <List
            className={`${mainClass}__logos`}
            items={logoVariants}
            getKey={(variant) => variant.label}
            renderItem={({ label, width }) => (
              <figure className={`${mainClass}__logo`}>
                <Image src={logo} alt={`${brand} logo`} width={width} height={Math.round((width * LOGO_SIZE.height) / LOGO_SIZE.width)} />
                {/** Measure line with end ticks around the caption */}
                <figcaption className={`${mainClass}__caption`}>{label}</figcaption>
              </figure>
            )}
          />
        </Card>
      </Card>

      <Card className={`${mainClass}__group`} mods={[COMPONENT_MODS.card.inset]} as="section">
        <Title as="h3" variant={TitleVariants.Card}>
          {abstractTitle}
        </Title>
        <Card className={`${mainClass}__showcase`} mods={[COMPONENT_MODS.card.inset]}>
          <List
            className={`${mainClass}__designs`}
            itemClassName={`${mainClass}__design`}
            items={abstractDesigns}
            getKey={(design) => design.alt}
            renderItem={({ image, alt }) => {
              const imageData = image.childImageSharp?.gatsbyImageData;

              return imageData && (
                <GatsbyImage className={`${mainClass}__design-image`} image={imageData} alt={alt} objectFit="contain" />
              );
            }}
          />
        </Card>
      </Card>
    </GuideBlock>
  );
};

export default AssetsSection;
