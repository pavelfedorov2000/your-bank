/**
 * Maps the values of an object, keeping its keys and their types: mapValues({ a: "x" }, (value) => value.length) → { a: 1 }.
 * The only cast is here: Object.entries / Object.fromEntries lose the key types in TypeScript.
 */
export const mapValues = <T extends Record<string, unknown>, R>(object: T, mapper: (value: T[keyof T]) => R) =>
  Object.fromEntries(
    Object.entries(object).map(([key, value]) => [key, mapper(value as T[keyof T])]),
  ) as Record<keyof T, R>;
