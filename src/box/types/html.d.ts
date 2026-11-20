import "react";

/**
 * `inert` on any element (not focusable, not clickable, hidden from screen readers): <div inert="">.
 * React 18 types don't have it yet (added in React 19); an empty string is "on", React 18 renders it as is.
 */
declare module "react" {
  interface HTMLAttributes<T> {
    inert?: "";
  }
}
