import React, { type FC } from "react";

import { Card, List } from "@components/ui";
import { TextBlock } from "@components/content";

import { cn, getClassNameByMods, getIsLightColor } from "@box/utils";
import { COMPONENT_MODS, GENERAL_MODS, TitleVariants } from "@box/constants";

import "./ColorGroup.scss";

const mainClass = "color-group";

type Props = {
  data: Queries.ColorGroupFragment;
};

/** Palette group: title + description on the left, swatches (tone + hex) in a panel on the right. */
const ColorGroup: FC<Props> = ({ data: { title, description, columns, swatches } }) => (
  <section className={mainClass} style={{ "--color-group-columns": columns }}>
    <TextBlock
      className={`${mainClass}__text`}
      title={title}
      titleProps={{ as: "h3", variant: TitleVariants.Subtitle }}
      description={description}
    />

    <Card className={`${mainClass}__panel`} mods={[COMPONENT_MODS.card.inset]}>
      <List
        className={`${mainClass}__swatches`}
        itemClassName={`${mainClass}__item`}
        items={swatches}
        getKey={(swatch) => swatch.hex}
        renderItem={({ name, hex }) => (
          <div
            className={cn(`${mainClass}__swatch`, getClassNameByMods(`${mainClass}__swatch`, [getIsLightColor(hex) && GENERAL_MODS.light]))}
            style={{ "--color-group-swatch": hex }}
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
