/** BEM modifiers of the Card block: <Card mods={[CardMods.Surface]} /> */

export const CardMods = {
  /** Filled with --color-surface (job, feature, press release cards). Default — transparent (FAQ). */
  Surface: "surface",
  /** Darker than the page (--color-bg-fade): panels nested in a surface card (design guide). */
  Inset: "inset",
  /** "Noise" surface: grain + dark fade + lime glow (benefit cards). */
  Noise: "noise",
} as const;
