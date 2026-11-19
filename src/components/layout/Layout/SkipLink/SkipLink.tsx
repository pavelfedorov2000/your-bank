import React, { type FC } from "react";

import { Button } from "@components/ui";

import { useLayoutContent } from "@box/hooks";
import { COMPONENT_MODS, ELEMENT_IDS, SPECIAL_CHARS } from "@box/constants";

import "./SkipLink.scss";

const mainClass = "skip-link";

/** "Skip to content": first in the Tab order, hidden until focused, jumps over the header to <main>. */
const SkipLink: FC = () => {
  const { skipLinkText } = useLayoutContent();

  return (
    <Button
      className={mainClass}
      to={`${SPECIAL_CHARS.hash}${ELEMENT_IDS.main}`}
      mods={[COMPONENT_MODS.button.primary, COMPONENT_MODS.button.small]}
    >
      {skipLinkText}
    </Button>
  );
};

export default SkipLink;
