import React, { type FC } from "react";

import logo from "@images/logo.svg";

import { AppLink, Image } from "@components/ui";

import { useLayoutContent } from "@box/hooks";
import { cn } from "@box/utils";
import { LOGO_SIZE, ROUTES } from "@box/constants";
import type { TWithClassName } from "@box/types";

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
    <AppLink className={cn(mainClass, className)} to={ROUTES.home}>
      <Image className={`${mainClass}__image`} src={logo} alt={brand} width={LOGO_SIZE.width} height={LOGO_SIZE.height} loading={loading} />
    </AppLink>
  );
};

export default Logo;
