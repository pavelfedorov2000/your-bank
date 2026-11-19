import React, { type FC, type FormEvent, useId, useState } from "react";

import { Section } from "@components/layout";
import { Button, Card, Ctas, IconBadge, Input, List } from "@components/ui";
import { TextBlock } from "@components/content";

import { focusById, getAriaIdList, getIconName } from "@box/utils";
import { COMPONENT_MODS, SPECIAL_CHARS, TitleVariants } from "@box/constants";
import type { TNullable } from "@box/types";
import {
  AUTH_MODES,
  getAuthFormErrors,
  getAuthFormValues,
  type TAuthFieldName,
  type TAuthFormErrors,
  type TAuthMode,
  useAuth,
} from "@features/auth";

import "./AuthFormSection.scss";

const mainClass = "auth-form";

type Props = {
  data: Queries.AuthFormSectionFragment;
  mode: TAuthMode;
};

/**
 * Login / Sign Up: panel with the title, fields, actions and social logins.
 * Fake auth (localStorage, see @features/auth): shows the error on failure; on success the page redirects.
 * Validation on submit instead of the browser one (noValidate): a message under each invalid field, focus on the first of them.
 * Errors are linked to the fields (aria-invalid + aria-describedby): a screen reader reads them with the field.
 */
const AuthFormSection: FC<Props> = ({
  data: { title, description, fields, forgotPasswordLabel, submitLabel, secondaryButton, socialLabel, socialProviders },
  mode,
}) => {
  const { login, register } = useAuth();
  const [fieldErrors, setFieldErrors] = useState<TAuthFormErrors>({});
  /** Error of the whole form from auth: wrong credentials, user exists… */
  const [error, setError] = useState<TNullable<string>>(null);
  const formId = useId();
  const errorId = `${formId}-error`;
  const getInputId = (name: TAuthFieldName) => `${formId}-${name}`;
  const getFieldErrorId = (name: TAuthFieldName) => `${formId}-${name}-error`;

  const clearFieldError = (name: TAuthFieldName) => setFieldErrors((errors) => ({ ...errors, [name]: undefined }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = getAuthFormValues(event.currentTarget);
    const errors = getAuthFormErrors(user, fields.map(({ name }) => name), mode);
    const firstInvalidField = fields.find(({ name }) => errors[name]);

    setFieldErrors(errors);

    if (firstInvalidField) {
      focusById(getInputId(firstInvalidField.name), { preventScroll: false });
      return;
    }

    const result = mode === AUTH_MODES.signUp ? register(user) : login(user.email, user.password);

    /** Success: the session changes and the page redirects (useRedirectIfAuthenticated) */
    if (!result.ok) setError(result.error);
  };

  return (
    <Section className={mainClass}>
      <Card className={`${mainClass}__panel`}>
        <TextBlock
          className={`${mainClass}__head`}
          as="header"
          title={title}
          titleProps={{ as: "h1", variant: TitleVariants.Section, className: `${mainClass}__title` }}
          description={description}
        />

        <form className={`${mainClass}__form`} noValidate onSubmit={handleSubmit} onInput={() => setError(null)}>
          <div className={`${mainClass}__fields`}>
            {fields.map(({ name, type, placeholder, autoComplete }) => {
              const fieldError = fieldErrors[name];

              return (
                <div key={name} className={`${mainClass}__field`}>
                  <Input
                    id={getInputId(name)}
                    className={`${mainClass}__input`}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    aria-label={placeholder}
                    autoComplete={autoComplete}
                    required
                    aria-invalid={Boolean(fieldError || error)}
                    aria-describedby={getAriaIdList(fieldError && getFieldErrorId(name), error && errorId)}
                    onInput={() => clearFieldError(name)}
                  />
                  {fieldError && (
                    <p id={getFieldErrorId(name)} className={`${mainClass}__field-error`}>
                      {fieldError}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {error && (
            <p id={errorId} className={`${mainClass}__error`} role="alert">
              {error}
            </p>
          )}

          {forgotPasswordLabel && (
            <Button className={`${mainClass}__forgot`} to={SPECIAL_CHARS.hash}>
              {forgotPasswordLabel}
            </Button>
          )}

          <div className={`${mainClass}__actions`}>
            <Ctas
              className={`${mainClass}__ctas`}
              items={[
                { label: submitLabel, type: "submit", mods: [COMPONENT_MODS.button.primary] },
                { label: secondaryButton.label, to: secondaryButton.path, mods: [COMPONENT_MODS.button.secondary] },
              ]}
            />

            <p className={`${mainClass}__divider`}>{socialLabel}</p>

            <List
              className={`${mainClass}__socials`}
              items={socialProviders}
              getKey={(provider) => provider.name}
              renderItem={(provider) => (
                <Button className={`${mainClass}__social`} aria-label={provider.name}>
                  <IconBadge name={getIconName(provider.icon)} />
                </Button>
              )}
            />
          </div>
        </form>
      </Card>
    </Section>
  );
};

export default AuthFormSection;
