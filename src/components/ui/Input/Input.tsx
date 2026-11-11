import React, { type FC, type InputHTMLAttributes } from "react";

import { Button } from "@components/ui";

import { ICON_NAMES, PASSWORD_TOGGLE_ARIA_LABELS } from "@box/constants";
import { useBooleanState } from "@box/hooks";
import type { TWithClassName } from "@box/types";
import { cn } from "@box/utils";

import "./Input.scss";

const mainClass = "input";

type Props = TWithClassName<Omit<InputHTMLAttributes<HTMLInputElement>, "className">>;

/** Pill text field (Figma "Input Field"). type="password" gets a show / hide toggle. Placement via className. */
const Input: FC<Props> = ({ className, type = "text", ...inputProps }) => {
  const [isPasswordVisible, { toggleState: togglePassword }] = useBooleanState();
  const isPasswordField = type === "password";

  return (
    <label className={cn(mainClass, className)}>
      <input className={`${mainClass}__control`} {...inputProps} type={isPasswordField && isPasswordVisible ? "text" : type} />
      {isPasswordField && (
        <Button
          className={`${mainClass}__toggle`}
          icon={ICON_NAMES.eye}
          aria-label={isPasswordVisible ? PASSWORD_TOGGLE_ARIA_LABELS.hide : PASSWORD_TOGGLE_ARIA_LABELS.show}
          aria-pressed={isPasswordVisible}
          onClick={togglePassword}
        />
      )}
    </label>
  );
};

export default Input;
