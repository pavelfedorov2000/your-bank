import React, { type FC } from "react";

import { Icon } from "@components/ui";

import type { TWithClassName } from "@box/types";
import { cn } from "@box/utils";

import "./Contacts.scss";

const mainClass = "contacts";

type Props = TWithClassName<{
  items: readonly Queries.ContactFragment[];
}>;

/** Company contacts (email, phone, address) with icons. A contact without href is plain text. Placement via className. */
const Contacts: FC<Props> = ({ items, className }) => (
  <address className={cn(mainClass, className)}>
    {items.map(({ icon, label, href, type }) => {
      const content = (
        <>
          <Icon className={`${mainClass}__icon`} name={icon} />
          {label}
        </>
      );

      return href ? (
        <a className={`${mainClass}__item`} key={type} href={href}>
          {content}
        </a>
      ) : (
        <span className={`${mainClass}__item`} key={type}>
          {content}
        </span>
      );
    })}
  </address>
);

export default Contacts;
