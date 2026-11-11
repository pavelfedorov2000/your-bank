/** CSS Modules: `import * as styles from "./X.module.scss"` (Gatsby 5 uses named exports). */
declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export = classes;
}
