/**
 * Regular expressions used across the project.
 * Patterns with the `g` flag are for replace / split only: `.test()` on a global RegExp keeps lastIndex between calls.
 */
export const REG_EXP_PATTERNS = {
  /** Absolute http(s) URL: "https://…", "http://…" */
  externalLink: /^https?:\/\//,
  /** Every non-digit character: "+91 91813 23 2309" → "9191813232309" */
  nonDigits: /\D/g,
  /** Word separators in file names: "-", "_", whitespace ("site-content" → ["site", "content"]) */
  wordSeparators: /[-_\s]+/,
} as const;
