import type { AUTH_MODES } from "./constants";

export type TAuthMode = (typeof AUTH_MODES)[keyof typeof AUTH_MODES];

/** A demo user as kept in localStorage. */
export type TAuthUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type TAuthResult = { ok: true; user: TAuthUser } | { ok: false; error: string };
