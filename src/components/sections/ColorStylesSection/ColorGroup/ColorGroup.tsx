import React, { type CSSProperties, type FC } from "react";

import { Card, List, Title } from "@components/ui";
import { TextBlock } from "@components/content";

import { CardMods, GENERAL_MODS, TitleVariants } from "@box/constants";
import { cn, getClassNameByMods, getIsLightColor } from "@box/utils";

import "./ColorGroup.scss";

const mainClass = "color-group";

type Props = {
  data: Queries.ColorGroupFragment;
};

/** Palette group: title + description on the left, swatches (tone + hex) in a panel on the right. */
const ColorGroup: FC<Props> = ({ data: { title, description, columns, swatches } }) => (
  <section className={mainClass} style={{ "--color-group-columns": columns } as CSSProperties}>
    <TextBlock
      className={`${mainClass}__text`}
      title={<Title as="h3" variant={TitleVariants.Subtitle}>{title}</Title>}
      description={description}
    />

    <Card className={`${mainClass}__panel`} mods={[CardMods.Inset]}>
      <List
        className={`${mainClass}__swatches`}
        itemClassName={`${mainClass}__item`}
        items={swatches}
        getKey={(swatch) => swatch.hex}
        renderItem={({ name, hex }) => (
          <div
            className={cn(`${mainClass}__swatch`, getClassNameByMods(`${mainClass}__swatch`, [getIsLightColor(hex) && GENERAL_MODS.light]))}
            style={{ "--color-group-swatch": hex } as CSSProperties}
          >
            <span className={`${mainClass}__name`}>{name}</span>
            <code className={`${mainClass}__hex`}>{hex}</code>
          </div>
        )}
      />
    </Card>
  </section>
);

export default ColorGroup;
