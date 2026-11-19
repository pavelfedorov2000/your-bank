import "react";

/** CSS custom properties in inline styles without a cast: style={{ "--color-group-columns": columns }} */
declare module "react" {
  interface CSSProperties {
    [property: `--${string}`]: string | number | undefined;
  }
}
