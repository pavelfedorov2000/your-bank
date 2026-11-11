import React, { type FC } from "react";

import { Button, List } from "@components/ui";

import type { TButtonMods, TButtonProps, TWithClassName } from "@box/types";
import { cn } from "@box/utils";

import "./Ctas.scss";

const mainClass = "ctas";

/** One call-to-action: Button props + its text. */
export type TCta = Omit<TButtonProps, "children" | "className"> & {
  label: string;
};

type Props = TWithClassName<{
  items: readonly TCta[];
  /** Added to every button of the group (e.g. ButtonMods.Small). */
  mods?: TButtonMods;
}>;

/** Row of call-to-action buttons */
const Ctas: FC<Props> = ({ items, mods = [], className }) => (
  <List
    className={cn(mainClass, className)}
    itemClassName={`${mainClass}__item`}
    items={items}
    getKey={(cta) => cta.label}
    renderItem={({ label, mods: itemMods = [], ...button }) => (
      <Button {...button} mods={[...itemMods, ...mods]}>
        {label}
      </Button>
    )}
  />
);

export default Ctas;
