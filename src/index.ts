import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

import { pathVolume } from "./config";
import { readAnyFile } from "./helpers/files";
import { removeAttributesAndKeepTags } from "./helpers/string";

const pathIn = resolve(pathVolume, "tmp", "in.txt");
const pathOut = resolve(pathVolume, "tmp", "out.html");

readAnyFile(pathIn).then((html) => {
  if (html) {
    const text = removeAttributesAndKeepTags(html);
    writeFile(pathOut, text);
  }
});

// yarn ts-node-dev -r tsconfig-paths/register --transpile-only --ignore-watch node_modules --no-notify scripts/text.ts
