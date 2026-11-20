import React, { type FC } from "react";

import { GuideHero } from "@components/sections";

import { usePreloader, useTemplateHero } from "@box/hooks";
import { cn, getClassNameByMods } from "@box/utils";
import { GENERAL_MODS } from "@box/constants";

import "./Preloader.scss";

const mainClass = "preloader";

/**
 * Full-screen template banner (GuideHero) over the page on a full page load (behavior: usePreloader).
 * Decor for sighted users: aria-hidden + inert, the page under it stays the accessible content.
 * Without JS it would never hide: gatsby-ssr.tsx hides it in <noscript>.
 */
const Preloader: FC = () => {
  const templateHero = useTemplateHero();
  const { isMounted, isVisible, onTransitionEnd } = usePreloader();

  if (!isMounted) return null;

  return (
    <div
      className={cn(mainClass, getClassNameByMods(mainClass, [isVisible && GENERAL_MODS.visible]))}
      aria-hidden="true"
      inert=""
      onTransitionEnd={onTransitionEnd}
    >
      <GuideHero className={`${mainClass}__hero`} data={templateHero} titleAs="h2" />
    </div>
  );
};

export default Preloader;
