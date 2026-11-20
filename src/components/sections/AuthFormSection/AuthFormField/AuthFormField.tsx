import React, { type FC } from "react";

import { Input } from "@components/ui";

import { cn } from "@box/utils";
import type { TWithClassName } from "@box/types";
import type { TAuthFieldProps } from "@features/auth";

import "./AuthFormField.scss";

const mainClass = "auth-form-field";

type Props = TWithClassName<
  {
    data: Queries.AuthFormSectionFragment["fields"][number];
  } & TAuthFieldProps
>;

/** Field of the auth form: pill input (name / type / placeholder from content.json) + validation message under it. */
const AuthFormField: FC<Props> = ({ className, data: { name, type, placeholder, autoComplete }, inputProps, error }) => (
  <div className={cn(mainClass, className)}>
    <Input
      className={`${mainClass}__input`}
      name={name}
      type={type}
      placeholder={placeholder}
      aria-label={placeholder}
      autoComplete={autoComplete}
      required
      {...inputProps}
    />
    {error && (
      <p id={error.id} className={`${mainClass}__error`}>
        {error.message}
      </p>
    )}
  </div>
);

export default AuthFormField;
