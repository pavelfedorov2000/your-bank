/** BEM modifiers of the Button block: <Button mods={[ButtonMods.Primary, ButtonMods.Small]} /> */

/** What the button looks like structurally: text — no background and paddings (Sign Up in the header). */
const ButtonTypes = {
  Text: "text",
} as const;

/** Content layout: icon — icon-only button. */
const ButtonVariants = {
  Icon: "icon",
} as const;

/** primary — lime pill (Open Account), secondary — dark pill with border (Learn More). */
const ButtonColors = {
  Primary: "primary",
  Secondary: "secondary",
} as const;

/** sm — compact paddings (header Login). Default size has no modifier. */
const ButtonSizes = {
  Small: "sm",
} as const;

/** Interaction effects (hover / press animations). None in the design yet. */
const ButtonEffects = {} as const;

export const ButtonMods = {
  ...ButtonTypes,
  ...ButtonVariants,
  ...ButtonColors,
  ...ButtonSizes,
  ...ButtonEffects,
} as const;
