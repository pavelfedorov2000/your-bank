/**
 * Public API: import { Container, Footer } from "@components/layout";
 * Siblings inside @components/layout use this barrel too: they reference each other only at render time, so the cycle is safe.
 */
export { default as Container } from "./Container";
export { default as Footer } from "./Footer";
export { default as Header } from "./Header";
export { default as Layout } from "./Layout";
export { default as Section } from "./Section";
