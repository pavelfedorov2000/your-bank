import type { ButtonHTMLAttributes, HTMLAttributes } from "react";

/** A11y props of one tab button: id, role, selected state, link to the panel, roving tabIndex. */
export type TTabProps = Required<
  Pick<ButtonHTMLAttributes<HTMLButtonElement>, "id" | "role" | "aria-selected" | "aria-controls" | "tabIndex">
>;

/** Props of the element with the active tab's content (useTabs → panelProps): role, id, link to the active tab, focusable. */
export type TTabPanelProps = Required<Pick<HTMLAttributes<HTMLElement>, "id" | "role" | "aria-labelledby" | "tabIndex">>;
