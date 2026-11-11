/** BEM modifiers shared between blocks: use with getClassNameByMods, never as `--x` strings in classNames. */
export const GENERAL_MODS = {
  open: "open",
  /** direction (slider arrows etc.) */
  prev: "prev",
  next: "next",
  /** layout: mirrored order of parts (media on the other side) */
  reversed: "reversed",
  /** look: light background — dark content on top (color swatches) */
  light: "light",
} as const;
