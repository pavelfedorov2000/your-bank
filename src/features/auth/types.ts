import type { FormHTMLAttributes, InputHTMLAttributes } from "react";

import type { AUTH_FIELDS, AUTH_MODES } from "./constants";

import type { TNullable } from "@box/types";

export type TAuthMode = (typeof AUTH_MODES)[keyof typeof AUTH_MODES];

export type TAuthFieldName = (typeof AUTH_FIELDS)[keyof typeof AUTH_FIELDS];

/** A demo user as kept in localStorage: a value for every auth form field. */
export type TAuthUser = Record<TAuthFieldName, string>;

/** Validation errors of the auth form fields: a message per invalid field. */
export type TAuthFormErrors = Partial<Record<TAuthFieldName, string>>;

/** Message with the id of its element: rendered as <p id> and referenced by the fields' aria-describedby. */
export type TAuthError = {
  id: string;
  message: string;
};

type TInputAttributes = InputHTMLAttributes<HTMLInputElement>;

/** One field of the auth form from useAuthForm: a11y props and handler for the input + its error (null when valid). */
export type TAuthFieldProps = {
  inputProps: Required<Pick<TInputAttributes, "id" | "aria-invalid" | "onInput">> & Pick<TInputAttributes, "aria-describedby">;
  error: TNullable<TAuthError>;
};

/** Props of the <form> from useAuthForm: own validation instead of the browser one, submit, error reset on input. */
export type TAuthFormProps = Required<Pick<FormHTMLAttributes<HTMLFormElement>, "noValidate" | "onSubmit" | "onInput">>;

export type TAuthResult = { ok: true; user: TAuthUser } | { ok: false; error: string };
