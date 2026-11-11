import React, { type FC } from "react";
import { AppLink, Icon } from "@components/ui";

import type { TButtonProps } from "@box/types";
import { cn, getClassNameByMods } from "@box/utils";

import "./Button.scss";

const mainClass = "button";

const Button: FC<TButtonProps> = ({ to, mods, icon, type = "button", className, children, ...buttonProps }) => {
  const classNames = cn(mainClass, getClassNameByMods(mainClass, mods), className);
  /** Wrapper keeps text + icon together (layout inside the button), text has its own element for styling */
  const content = (
    <span className={`${mainClass}__content`}>
      {children && <span className={`${mainClass}__text`}>{children}</span>}
      {icon && <Icon className={`${mainClass}__icon`} name={icon} />}
    </span>
  );

  if (to) {
    return (
      <AppLink className={classNames} to={to}>
        {content}
      </AppLink>
    );
  }

  return (
    <button className={classNames} {...buttonProps} type={type}>
      {content}
    </button>
  );
};

export default Button;
