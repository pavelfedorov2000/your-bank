/**
 * Fake auth without a backend: users and the session live in localStorage.
 * Demo only — passwords are stored as plain text, never do this with real data.
 * Imported by gatsby-node.ts (AUTH_FIELDS → GraphQL enum): no path aliases here, they don't work there.
 */

/** Namespace of the site's keys in localStorage and of its window events: other scripts on the domain don't clash with them. */
const PREFIX = "yourbank:";

export const AUTH_STORAGE_KEYS = {
  users: `${PREFIX}users`,
  session: `${PREFIX}session`,
} as const;

/** Window event fired on login / logout in this tab (the "storage" event covers other tabs). */
export const AUTH_CHANGE_EVENT = `${PREFIX}auth-change`;

/** Which form AuthFormSection renders: <AuthFormSection mode={AUTH_MODES.signUp} /> */
export const AUTH_MODES = {
  login: "login",
  signUp: "signUp",
} as const;

/** Field names of the auth forms: `fields[].name` in content.json (GraphQL enum AuthFieldName). */
export const AUTH_FIELDS = {
  firstName: "firstName",
  lastName: "lastName",
  email: "email",
  password: "password",
} as const;

/** Minimal password length for a new account (login checks only that the password is filled in). */
export const AUTH_PASSWORD_MIN_LENGTH = 8;

export const AUTH_MESSAGES = {
  required: "This field is required.",
  invalidEmail: "Enter a valid email, e.g. name@example.com.",
  shortPassword: `The password must be at least ${AUTH_PASSWORD_MIN_LENGTH} characters long.`,
  userExists: "An account with this email already exists. Try to log in.",
  invalidCredentials: "Wrong email or password.",
  storageUnavailable: "Your browser blocks local storage, so the demo login can't work here.",
} as const;
