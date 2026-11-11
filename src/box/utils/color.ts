/** Relative luminance threshold above which dark text is readable on the color (WCAG formula). */
const LIGHT_LUMINANCE = 0.4;

/** Whether a hex color (#fff, #caff33) is light: dark text should go on top of it. */
export const getIsLightColor = (hex: string): boolean => {
  const value = hex.replace("#", "");
  const full = value.length === 3 ? [...value].map((char) => char + char).join("") : value;
  const [r, g, b] = [0, 2, 4].map((start) => {
    const channel = parseInt(full.slice(start, start + 2), 16) / 255;

    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b > LIGHT_LUMINANCE;
};
