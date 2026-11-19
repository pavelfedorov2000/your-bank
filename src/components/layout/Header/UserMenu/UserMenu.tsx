import React, { type FC } from "react";

import { Button } from "@components/ui";

import { cn } from "@box/utils";
import { COMPONENT_MODS } from "@box/constants";
import type { TWithClassName } from "@box/types";
import { getUserInitials, type TAuthUser } from "@features/auth";

import "./UserMenu.scss";

const mainClass = "user-menu";

type Props = TWithClassName<{
  user: Pick<TAuthUser, "firstName" | "lastName">;
  logoutBtnText: string;
  onLogout: () => void;
}>;

/** Logged-in user in the header (not in the design): round avatar with initials + logout button. */
const UserMenu: FC<Props> = ({ className, user, logoutBtnText, onLogout }) => {
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <div className={cn(mainClass, className)}>
      <span className={`${mainClass}__avatar`} role="img" aria-label={fullName} title={fullName}>
        {getUserInitials(user)}
      </span>
      <Button className={`${mainClass}__logout`} mods={[COMPONENT_MODS.button.secondary, COMPONENT_MODS.button.small]} onClick={onLogout}>
        {logoutBtnText}
      </Button>
    </div>
  );
};

export default UserMenu;
