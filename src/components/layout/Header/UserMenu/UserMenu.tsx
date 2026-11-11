import React, { type FC } from "react";

import { Button } from "@components/ui";

import { ButtonMods } from "@box/constants";
import type { TWithClassName } from "@box/types";
import { cn } from "@box/utils";

import { getUserInitials, type TAuthUser } from "@features/auth";

import "./UserMenu.scss";

const mainClass = "user-menu";

type Props = TWithClassName<{
  user: Pick<TAuthUser, "firstName" | "lastName">;
  logoutLabel: string;
  onLogout: () => void;
}>;

/** Logged-in user in the header (not in the design): round avatar with initials + logout button. */
const UserMenu: FC<Props> = ({ className, user, logoutLabel, onLogout }) => {
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <div className={cn(mainClass, className)}>
      <span className={`${mainClass}__avatar`} role="img" aria-label={fullName} title={fullName}>
        {getUserInitials(user)}
      </span>
      <Button className={`${mainClass}__logout`} mods={[ButtonMods.Secondary, ButtonMods.Small]} onClick={onLogout}>
        {logoutLabel}
      </Button>
    </div>
  );
};

export default UserMenu;
