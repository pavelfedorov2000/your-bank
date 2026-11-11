/**
 * Fake auth without a backend: users and the session live in localStorage.
 * Demo only — passwords are stored as plain text, never do this with real data.
 */
export const AUTH_STORAGE_KEYS = {
  users: "yourbank:users",
  session: "yourbank:session",
} as const;

/** Window event fired on login / logout in this tab (the "storage" event covers other tabs). */
export const AUTH_CHANGE_EVENT = "yourbank:auth-change";

/** Which form AuthFormSection renders: <AuthFormSection mode={AUTH_MODES.signUp} /> */
export const AUTH_MODES = {
  login: "login",
  signUp: "signUp",
} as const;

/** Where to go after a successful login / sign up. */
export const AUTH_REDIRECT_PATH = "/";

export const AUTH_MESSAGES = {
  userExists: "An account with this email already exists. Try to log in.",
  invalidCredentials: "Wrong email or password.",
  storageUnavailable: "Your browser blocks local storage, so the demo login can't work here.",
} as const;
