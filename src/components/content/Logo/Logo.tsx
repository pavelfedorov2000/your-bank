import React, { type FC } from "react";

import logo from "@images/logo.svg";

import { AppLink, Image } from "@components/ui";

import { useLayoutContent } from "@box/hooks";
import type { TWithClassName } from "@box/types";
import { cn } from "@box/utils";

import "./Logo.scss";

const mainClass = "logo";

type Props = TWithClassName<{
  /** "eager" in the first screen (header), "lazy" elsewhere (footer). */
  loading?: "lazy" | "eager";
}>;

/** Brand logo linking to the home page. Size and placement come from the parent's element class (e.g. "header__logo"). */
const Logo: FC<Props> = ({ loading = "lazy", className }) => {
  const { brand } = useLayoutContent();

  return (
    <AppLink className={cn(mainClass, className)} to="/">
      <Image className={`${mainClass}__image`} src={logo} alt={brand} width={156} height={41} loading={loading} />
    </AppLink>
  );
};

export default Logo;
