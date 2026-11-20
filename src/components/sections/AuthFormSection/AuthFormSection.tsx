import React, { type FC } from "react";

import { Section } from "@components/layout";
import { Button, Card, Ctas, IconBadge, List } from "@components/ui";
import { TextBlock } from "@components/content";
import AuthFormField from "./AuthFormField";

import { getIconName } from "@box/utils";
import { COMPONENT_MODS, SPECIAL_CHARS, TitleVariants } from "@box/constants";
import { type TAuthMode, useAuthForm } from "@features/auth";

import "./AuthFormSection.scss";

const mainClass = "auth-form";

type Props = {
  data: Queries.AuthFormSectionFragment;
  mode: TAuthMode;
};

/**
 * Login / Sign Up: panel with the title, fields, actions and social logins.
 * Fake auth (localStorage, see @features/auth); form behavior — validation, errors, submit — in useAuthForm.
 */
const AuthFormSection: FC<Props> = ({
  data: { title, description, fields, forgotPasswordLabel, submitLabel, secondaryButton, socialLabel, socialProviders },
  mode,
}) => {
  const { formProps, formError, getFieldProps } = useAuthForm({ fieldNames: fields.map(({ name }) => name), mode });

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

        <form className={`${mainClass}__form`} {...formProps}>
          <div className={`${mainClass}__fields`}>
            {fields.map((field) => (
              <AuthFormField key={field.name} data={field} {...getFieldProps(field.name)} />
            ))}
          </div>

          {formError && (
            <p id={formError.id} className={`${mainClass}__error`} role="alert">
              {formError.message}
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
                /** Placeholder: no real OAuth in the demo */
                <Button className={`${mainClass}__social`} to={SPECIAL_CHARS.hash} aria-label={provider.name}>
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
