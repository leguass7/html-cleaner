export function makeArray<T = unknown>(value?: T | T[]): T[] {
  if (!value) return [] as T[];
  return !Array.isArray(value) ? [value] : value;
}

export function compareValues(key: string, order: "asc" | "desc" = "asc") {
  return function innerSort(a: any, b: any) {
    if (!(key in a) || !(key in b)) return 0;
    const varA =
      typeof a[key] === "string" ? a?.[key]?.toUpperCase() : a?.[key];
    const varB =
      typeof b[key] === "string" ? b?.[key]?.toUpperCase() : b?.[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
}

export function* range(begin: number, end: number, interval = 1) {
  for (let i = begin; i <= end; i += interval) {
    yield i;
  }
}

export function rangeArray(init: number, fim: number, interval = 1): number[] {
  return Array.from(range(init, fim, interval));
}

export function chunkArray(arr: any[], chunkSize = 10) {
  if (arr.length <= chunkSize) return [arr];

  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }

  return result;
}

// export function sumArray(arr: (number | string)[]): number {
//   return arr.map(f => Number(f) || 0).reduce((a, b) => a + b, 0 as number);
// }

/**
 * @function sumArray
 * @example
 * var arr = [4, 2, 8, 6];
 * sumArray(arr) // return 20
 * sumArray(['1','teste', 2], true) // return 3
 */
export function sumArray(
  arrOfNumber: (string | number)[],
  checkNumber = false
): number {
  const sum = (t: number, n: number | string): number => {
    if (n && typeof n === "number" && n !== 0) return t + n;
    if (n && typeof n === "string" && checkNumber)
      return t + (parseInt(n, 10) || 0);
    return t;
  };
  return makeArray(arrOfNumber).reduce(sum, 0) as number;
}

export function noDuplicateItems<T = Array<string | number>>(items: T): T {
  const r = Array.isArray(items)
    ? items?.reduce((acc: T[], f: T) => {
        if (!acc.includes(f)) acc.push(f);
        return acc;
      }, [] as T)
    : [];

  return (r || []) as T;
}

export function arrayToMessage(...args: string[]): string {
  const prepare = (str?: string) => {
    if (typeof str === "string") return str.trim();
    return JSON.stringify(str, null, 2);
  };
  const message =
    args?.length === 1
      ? args?.[0] || ""
      : args
          .filter((f) => !!f)
          .map((f) => prepare(f))
          .join("\n");
  return message;
}
