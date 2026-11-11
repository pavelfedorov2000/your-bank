import React, { useState, type FC, type FormEvent } from "react";

import { Section } from "@components/layout";
import { Button, Card, Ctas, IconBadge, Input, List } from "@components/ui";
import { Heading, TextBlock } from "@components/content";

import { ButtonMods, TitleVariants } from "@box/constants";
import type { TNullable } from "@box/types";

import { AUTH_MODES, getFormValues, useAuth, type TAuthMode } from "@features/auth";

import "./AuthFormSection.scss";

const mainClass = "auth-form";

type Props = {
  data: Queries.AuthFormSectionFragment;
  mode: TAuthMode;
};

/**
 * Login / Sign Up: panel with the title, fields, actions and social logins.
 * Fake auth (localStorage, see @features/auth): shows the error on failure; on success the page redirects.
 */
const AuthFormSection: FC<Props> = ({
  data: { title, description, fields, forgotPasswordLabel, submitLabel, secondaryButton, socialLabel, socialProviders },
  mode,
}) => {
  const { login, register } = useAuth();
  const [error, setError] = useState<TNullable<string>>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const { firstName = "", lastName = "", email = "", password = "" } = getFormValues(event.currentTarget);
    const result =
      mode === AUTH_MODES.signUp ? register({ firstName, lastName, email, password }) : login(email, password);

    /** Success: the session changes and the page redirects (useRedirectIfAuthenticated) */
    if (!result.ok) setError(result.error);
  };

  return (
    <Section className={mainClass}>
      <Card className={`${mainClass}__panel`}>
        <TextBlock
          className={`${mainClass}__head`}
          as="header"
          title={<Heading className={`${mainClass}__title`} data={title} as="h1" variant={TitleVariants.Section} />}
          description={description}
        />

        <form className={`${mainClass}__form`} onSubmit={handleSubmit} onInput={() => setError(null)}>
          <div className={`${mainClass}__fields`}>
            {fields.map(({ name, type, placeholder, autoComplete }) => (
              <Input
                className={`${mainClass}__field`}
                key={name}
                name={name}
                type={type}
                placeholder={placeholder}
                aria-label={placeholder}
                autoComplete={autoComplete}
                required
              />
            ))}
          </div>

          {error && (
            <p className={`${mainClass}__error`} role="alert">
              {error}
            </p>
          )}

          {forgotPasswordLabel && (
            <Button className={`${mainClass}__forgot`} to="#">
              {forgotPasswordLabel}
            </Button>
          )}

          <div className={`${mainClass}__actions`}>
            <Ctas
              className={`${mainClass}__ctas`}
              items={[
                { label: submitLabel, type: "submit", mods: [ButtonMods.Primary] },
                { label: secondaryButton.label, to: secondaryButton.path, mods: [ButtonMods.Secondary] },
              ]}
            />

            <p className={`${mainClass}__divider`}>{socialLabel}</p>

            <List
              className={`${mainClass}__socials`}
              items={socialProviders}
              getKey={(provider) => provider.name}
              renderItem={(provider) => (
                <Button className={`${mainClass}__social`} aria-label={provider.name}>
                  <IconBadge name={provider.icon} />
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
