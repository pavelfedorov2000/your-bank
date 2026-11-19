import type { HTMLAttributes } from "react";

/** Props of the element with the active tab's content (useTabs → panelProps): role, id, link to the active tab, focusable. */
export type TTabPanelProps = Required<Pick<HTMLAttributes<HTMLElement>, "id" | "role" | "aria-labelledby" | "tabIndex">>;
