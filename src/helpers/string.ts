import * as cheerio from "cheerio";
import type { Cheerio } from "cheerio";

import { makeArray } from "./array";

export function queryToArrayRequest(str: string): string[] {
  if (!str) return [];
  return str
    .split(",")
    .map((item) => item?.trim())
    .filter((item) => !!item);
}

/** @description - Transforma uma string em um slug utilizavel para urls */
export function slugify(str = ""): string {
  return str
    .normalize("NFD") // separa acentos de letras
    .replace(/[\u0300-\u036f]/g, "") // remove os acentos
    .replace(/[^a-zA-Z0-9]+/g, "-") // substitui qualquer grupo de não alfanuméricos por hífen
    .replace(/\s+/g, "-") // substitui espaços em branco por hífen
    .replace(/^-+|-+$/g, "") // remove hífens do início/fim
    .toLowerCase();
}

export function replaceAll(str = "", find = "", replace = ""): string {
  return str.split(find).join(replace);
}

export function onlyNumber(
  str: string | number = ""
): string | null | undefined {
  if (str) return String(str)?.replace?.(/\D/g, "");
  return null;
}

export function setUrlParams(
  oldUrl: string,
  params: Record<string, number | string> = {}
): string | null {
  if (!oldUrl) return null;
  const url = new URL(oldUrl);
  Object.entries(params).forEach(([prop, value]) =>
    url.searchParams.set(prop, `${value}`)
  );
  return url.toString();
}

export function isBase64Uri(data: string): boolean {
  const base64UriPattern = /^data:[^;]+;base64,/;
  return base64UriPattern.test(data);
}

export function removeEmoji(str = ""): string {
  const result = str.replace(/[^\p{L}\p{N}\p{P}\p{Z}^$\n]/gu, "");
  return result.replace(
    /([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g,
    ""
  );
}

export function justText(str = ""): string {
  return str.replace(
    // eslint-disable-next-line no-control-regex
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    ""
  );
}

export function normalizeSpecialCharacters(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/[^a-zA-Z0-9._\s-]/g, ""); // Mantém maiúsculas e espaços
}

export function camelize(str = "") {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

export function camelizeStr(str?: string): string {
  return `${str}`
    .toLowerCase()
    .replace(/_([a-z0-9])/gi, (_match, p1) => p1.toUpperCase());
}

export function trimObjectProperties<T extends Record<string, unknown>>(
  data: T
): T {
  return Object.entries(data).reduce(
    (acc, [key, value]) => {
      if (typeof value === "string") acc[key] = value.trim();
      else acc[key] = value;
      return acc;
    },
    {} as Record<string, unknown>
  ) as T;
}

export function removeAttributesAndKeepTags(html: string): string {
  const dom = cheerio.load(html);

  // Função recursiva para remover atributos de um elemento e seus filhos
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function removeAttributesRecursive(element: Cheerio<any>): void {
    element.each((_, el) => {
      const $el = dom(el);
      if (el?.attribs) {
        const attributes = Object.keys(el?.attribs);
        // Remover os atributos do elemento
        attributes.forEach((attribute) => {
          $el.removeAttr(attribute);
        });
      }

      // Chamar a função recursivamente para os filhos
      if ($el.children().length > 0) {
        removeAttributesRecursive($el.children());
      }
    });
  }

  // Chamar a função recursiva para o elemento raiz (geralmente <body>)
  const document = dom.root();
  removeAttributesRecursive(document);

  const body = document?.find?.("body")?.html?.() || "";

  // return dom.html();
  return body;
}

export function trimHtml(input = ""): string {
  return input.replace("&nbsp;", "").replace(/<[^>]*>/g, "");
}

export function removeHtmlTags(input = ""): string {
  return input.replace(/<\/?[^>]+(>|$)/g, "");
}

// remover pulos de linha e espaços em branco
export function removeLineBreaks(input = ""): string {
  return input.replace(/\n/g, "").replace(/\s+/g, " ");
}

export function extractMimeType(base64Image: string): string | null {
  const mimeType = base64Image.split(";")?.[0]?.split?.("/")?.[1];
  return mimeType || null;
}

export function capitalize(str: string) {
  const s = `${str}`.toLocaleLowerCase();
  return `${s?.[0]?.toLocaleUpperCase()}${s?.slice?.(1)}`;
}

export function replaceCurlyBraces(
  frase: string,
  require: string | string[],
  value = ""
): string {
  const requires = makeArray(require);
  // Cria a regex para encontrar a correspondência exata entre chaves
  requires.forEach((req) => {
    const regex = new RegExp(`\\{${req}\\}`, "g");
    // Substitui todas as ocorrências encontradas pelo valor fornecido

    frase = frase.replace(regex, value);
  });

  return frase;
}

export function propsReplacer(
  text: string,
  props: Record<string, unknown>,
  defaultValue = "--"
): string {
  const prepareValue = (value?: unknown) => {
    try {
      if (!value) return "";
      if (typeof value === "string") return value || defaultValue;
      else if (typeof value === "number")
        return value?.toString?.() || defaultValue;
      const result = JSON.stringify(value) || defaultValue;
      return result;
    } catch {
      return defaultValue;
    }
  };

  return Object.entries(props).reduce((acc, [key, value]) => {
    acc = replaceAll(acc || text || "", `{${key}}`, prepareValue(value));
    return acc;
  }, text);
}
