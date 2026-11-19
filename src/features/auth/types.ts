import type { AUTH_FIELDS, AUTH_MODES } from "./constants";

export type TAuthMode = (typeof AUTH_MODES)[keyof typeof AUTH_MODES];

export type TAuthFieldName = (typeof AUTH_FIELDS)[keyof typeof AUTH_FIELDS];

/** A demo user as kept in localStorage: a value for every auth form field. */
export type TAuthUser = Record<TAuthFieldName, string>;

export type TAuthResult = { ok: true; user: TAuthUser } | { ok: false; error: string };
