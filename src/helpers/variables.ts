import { isDefined } from "./validation";

export function toBool(str?: string | number | boolean): boolean {
  if (!str) return false;
  const cases = [true, "true", "verdadeiro", "verdade", "p", "1", 1];
  if (typeof str === "string") return !!cases.includes(str.toLowerCase());
  return !!cases.includes(str);
}

/**
 * @function binToDec
 */
export function binToDec(binary: string | number): number {
  const prepared = `${binary}`
    .split("")
    .filter((f) => ["0", "1"].includes(f))
    .join("");
  return parseInt(prepared, 2);
}

/**
 * Convert Int To String(Hex)
 */
export function intToHex(int: number, size?: number) {
  try {
    const hex = Number(int)?.toString(16)?.toLocaleUpperCase();
    const len = hex.length % 2 !== 0 ? hex.length + 1 : hex.length;
    return hex.padStart(size || len, "0");
  } catch {
    const rtn = `00`;
    return rtn.padStart(size || 2, "0");
  }
}

/** Convert Hex To Binary string */
export function hexTobin(hex: string | number, len = 8): string {
  const toConvert = typeof hex !== "number" ? parseInt(hex, 16) || 0 : hex || 0;
  const result = toConvert.toString(2);
  return len ? result.padStart(len, "0") : result;
}

export function toBooleanFilter(param?: string | boolean) {
  if (typeof param === "string" && param === "") return undefined;
  return isDefined(param) ? toBool(param) : undefined;
}
