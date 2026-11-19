/**
 * BEM modifiers of the components, one object per block, collected in COMPONENT_MODS:
 * <Button mods={[COMPONENT_MODS.button.primary, COMPONENT_MODS.button.small]} /> → .button--primary.button--sm
 * Default look of a block has no modifier. Shared state / direction modifiers live in GENERAL_MODS.
 */

export const BUTTON_MODS = {
  /** Type: text — no background and paddings (Sign Up in the header). */
  text: "text",
  /** Content layout: icon — icon-only button. */
  icon: "icon",
  /** Color: lime pill (Open Account). */
  primary: "primary",
  /** Color: dark pill with border (Learn More). */
  secondary: "secondary",
  /** Size: compact paddings (header Login). */
  small: "sm",
} as const;

export const CARD_MODS = {
  /** Filled with --color-surface (job, feature, press release cards). Default — transparent (FAQ). */
  surface: "surface",
  /** Darker than the page (--color-bg-fade): panels nested in a surface card (design guide). */
  inset: "inset",
  /** "Noise" surface: grain + dark fade + lime glow (benefit cards). */
  noise: "noise",
} as const;

export const ICON_BADGE_MODS = {
  /** Products, benefits (98px on desktop). Without a mod a parent sets --icon-badge-* vars. */
  large: "lg",
  /** Use Cases cards (78px on desktop). */
  medium: "md",
} as const;

export const ICON_TEXT_BLOCK_MODS = {
  /** Icon beside the title, text below on the full width (benefit cards). Default — centered column. */
  row: "row",
} as const;

export const LIST_MODS = {
  /** Grid: one column, two equal columns from laptop (Values, Benefits, Jobs, Press Releases, FAQ, Features). */
  twoColumns: "two-columns",
} as const;

export const NAV_MENU_MODS = {
  /** Plain text links in a centered wrapping row, no pills (footer). Default look — pills (header). */
  text: "text",
} as const;

export const SECTION_MODS = {
  /** Intro → content gap 60 / 60 / 80px (default 50 / 60 / 80): Use Cases, Our Benefits, Job Openings, Mission & Vision. */
  large: "lg",
} as const;

export const TABS_MODS = {
  /** Panel menu: outlined items, horizontal scroll on mobile, column from sm (Home "Our Features"). Default — pill switcher. */
  vertical: "vertical",
} as const;

export const COMPONENT_MODS = {
  button: { ...BUTTON_MODS },
  card: { ...CARD_MODS },
  iconBadge: { ...ICON_BADGE_MODS },
  iconTextBlock: { ...ICON_TEXT_BLOCK_MODS },
  list: { ...LIST_MODS },
  navMenu: { ...NAV_MENU_MODS },
  section: { ...SECTION_MODS },
  tabs: { ...TABS_MODS },
} as const;
