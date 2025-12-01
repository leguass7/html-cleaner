/**
 * Simple object check.
 */
export function isObject(item?: unknown): boolean {
  if (!item) return false;
  return (
    item &&
    typeof item === "object" &&
    !Array.isArray(item) &&
    !(item instanceof Date)
  );
}

export function isObjectEmpty(obj: object = {}): boolean {
  if (!obj) return true;
  return !Object.keys(obj).length;
}

export function isObjectValues(obj: object = {}): boolean {
  return !!(isObject(obj) && !!Object.values(obj).filter((f) => !!f)?.length);
}

export function isObjectValuesEmpty(obj: object = {}): boolean {
  return !Object.values(obj)?.filter((f) => isDefined(f))?.length;
}

export function isDefined(v?: unknown): boolean {
  return !!(v !== null && typeof v !== "undefined");
}

export function isNullableDefined(v?: unknown): boolean {
  return !!(isDefined(v) || v === null);
}

export function isNull(v?: unknown): boolean {
  return !!(v === null);
}
