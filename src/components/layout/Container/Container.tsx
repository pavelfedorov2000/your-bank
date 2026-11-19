import React, { type FC } from "react";

import { cn, getClassNameByMods } from "@box/utils";
import type { TWithChildren, TWithPropsMods } from "@box/types";

import "./Container.scss";

type Props = TWithChildren & TWithPropsMods;

const mainClass = "container";

const Container: FC<Props> = ({ mods, children }) => (
  <div className={cn(mainClass, getClassNameByMods(mainClass, mods))}>{children}</div>
);

export default Container;
