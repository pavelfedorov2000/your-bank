import { type FormEvent, useId, useState } from "react";

import { AUTH_MODES } from "../constants";
import type { TAuthError, TAuthFieldName, TAuthFormErrors, TAuthFormProps, TAuthMode } from "../types";
import { getAuthFieldProps, getAuthFormErrorId, getAuthFormErrors, getAuthFormValues, getAuthInputId } from "../utils";
import { useAuth } from "./useAuth";

import { focusById } from "@box/utils";
import { FOCUS_OPTIONS } from "@box/constants";
import type { TNullable } from "@box/types";

/**
 * Login / Sign Up form: validation on submit, then fake auth (login or register by `mode`).
 * - an invalid field gets a message under it, focus goes to the first of them;
 * - a field's error is reset on input, the form error (wrong credentials, user exists…) — on any input;
 * - errors are linked to the fields (aria-invalid + aria-describedby): a screen reader reads them with the field.
 * On success the session changes and the page redirects (useRedirectIfAuthenticated).
 * const { formProps, formError, getFieldProps } = useAuthForm({ fieldNames, mode });
 * → <form {...formProps}> <Input {...getFieldProps(name).inputProps} /> … <p id={formError.id}>{formError.message}</p>
 */
export const useAuthForm = ({ fieldNames, mode }: { fieldNames: readonly TAuthFieldName[]; mode: TAuthMode }) => {
  const { login, register } = useAuth();
  const [fieldErrors, setFieldErrors] = useState<TAuthFormErrors>({});
  const [error, setError] = useState<TNullable<string>>(null);
  const formId = useId();

  const formError: TNullable<TAuthError> = error ? { id: getAuthFormErrorId(formId), message: error } : null;

  const clearFieldError = (name: TAuthFieldName) => setFieldErrors((errors) => ({ ...errors, [name]: undefined }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = getAuthFormValues(event.currentTarget);
    const errors = getAuthFormErrors(user, fieldNames, mode);
    console.log("errors", errors);
    const firstInvalidFieldName = fieldNames.find((name) => errors[name]);
    console.log("firstInvalidFieldName", firstInvalidFieldName);
    setFieldErrors(errors);

    if (firstInvalidFieldName) {
      focusById(getAuthInputId(formId, firstInvalidFieldName), FOCUS_OPTIONS.scrollIntoView);
      return;
    }

    const result = mode === AUTH_MODES.signUp ? register(user) : login(user.email, user.password);

    if (!result.ok) setError(result.error);
  };

  const getFieldProps = (name: TAuthFieldName) =>
    getAuthFieldProps({ formId, name, message: fieldErrors[name], formError, onInput: () => clearFieldError(name) });

  const formProps: TAuthFormProps = {
    noValidate: true,
    onSubmit: handleSubmit,
    onInput: () => setError(null),
  };

  return { formProps, formError, getFieldProps };
};
