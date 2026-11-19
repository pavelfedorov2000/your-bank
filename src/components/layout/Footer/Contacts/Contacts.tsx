import React, { type FC } from "react";

import { Icon, List } from "@components/ui";

import { cn, getContactHref, getIconName } from "@box/utils";
import type { TWithClassName } from "@box/types";

import "./Contacts.scss";

const mainClass = "contacts";

type Props = TWithClassName<{
  items: readonly Queries.ContactFragment[];
}>;

/**
 * Company contacts (email, phone, address) with icons. Placement via className.
 * Email / phone become mailto: / tel: links built from the label; a contact without a link is plain text.
 */
const Contacts: FC<Props> = ({ className, items }) => (
  <address className={cn(mainClass, className)}>
    <List
      className={`${mainClass}__list`}
      items={items}
      getKey={(item) => item.type}
      renderItem={({ type, label, icon }) => {
        const href = getContactHref(type, label);
        const content = (
          <>
            <Icon className={`${mainClass}__icon`} name={getIconName(icon)} />
            {label}
          </>
        );

        return href ? (
          <a className={`${mainClass}__item`} href={href}>
            {content}
          </a>
        ) : (
          <span className={`${mainClass}__item`}>{content}</span>
        );
      }}
    />
  </address>
);

export default Contacts;
