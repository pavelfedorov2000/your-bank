import React, { type FC } from "react";

import type { TWithChildren, TWithClassName } from "@box/types";
import { cn } from "@box/utils";

import "./Tag.scss";

const mainClass = "tag";

type Props = TWithClassName<TWithChildren>;

/** Small outlined pill with muted text: meta info like "Location: India", "Date: 06/11/2024". */
const Tag: FC<Props> = ({ className, children }) => <span className={cn(mainClass, className)}>{children}</span>;

export default Tag;
