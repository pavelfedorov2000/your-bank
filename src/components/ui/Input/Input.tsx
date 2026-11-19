import React, { type FC, type InputHTMLAttributes } from "react";

import { Button } from "@components/ui";

import { useBooleanState } from "@box/hooks";
import { cn } from "@box/utils";
import { ARIA_LABELS, ICON_NAMES } from "@box/constants";

import "./Input.scss";

const mainClass = "input";

type Props = InputHTMLAttributes<HTMLInputElement>;

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
          aria-label={isPasswordVisible ? ARIA_LABELS.passwordToggle.hide : ARIA_LABELS.passwordToggle.show}
          aria-pressed={isPasswordVisible}
          onClick={togglePassword}
        />
      )}
    </label>
  );
};

export default Input;
