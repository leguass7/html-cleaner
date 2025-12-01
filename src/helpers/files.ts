import crypto from "crypto";
import {
  createReadStream,
  existsSync,
  mkdirSync,
  readFile,
  readFileSync,
  renameSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { readFile as promiseReadFile } from "node:fs/promises";
import path from "path";

export function fileHash(
  filename: string,
  algorithm: "sha1" | "md5" | "sha256" | "sha512" = "md5"
) {
  return new Promise((resolve, reject) => {
    try {
      const shasum = crypto.createHash(algorithm);
      const s = createReadStream(filename);
      s.on("data", (data) => {
        shasum.update(data);
      });
      // making digest
      s.on("end", () => {
        const hash = shasum.digest("hex");
        resolve(hash);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function fileExists(filePath: string) {
  try {
    return !!existsSync(filePath);
  } catch (err) {
    return false;
  }
}

export function deleteFile(filePath: string) {
  try {
    if (fileExists(filePath)) {
      unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
}

export function renameFile(oldPath: string, newPath: string, force?: boolean) {
  try {
    if (force && fileExists(newPath)) {
      unlinkSync(newPath);
    }
    renameSync(oldPath, newPath);
    return true;
  } catch {
    return false;
  }
}

export function fileParse(filePath: string) {
  return path.parse(filePath);
}

export function loadFileJSON<R = any>(path: string): R | null {
  if (fileExists(path)) {
    try {
      const data = readFileSync(path, { encoding: "utf-8" }) as string;
      const obj = JSON.parse(data);
      return obj;
    } catch {
      return null;
    }
  }
  return null;
}

export function asyncLoadFileJSON<R = any>(
  path: string,
  encoding: BufferEncoding = "utf-8"
): Promise<R | null> {
  if (fileExists(path)) {
    return new Promise((resolve, reject) => {
      readFile(path, { encoding }, (err, data) => {
        if (err) {
          return reject(err);
        }
        const d = JSON.parse(data);
        return resolve(d);
      });
    });
  }

  return Promise.resolve<R | null>(null);
}

export function saveFileJSON(path: string, data: any): boolean {
  try {
    writeFileSync(path, JSON.stringify(data, null, 2), { encoding: "utf-8" });
    return true;
  } catch {
    return false;
  }
}

export function saveFile(
  filePath: string,
  data: string | Buffer,
  options?: { encoding?: BufferEncoding }
): boolean {
  try {
    const dir = path.dirname(filePath);

    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

    writeFileSync(filePath, data, options);
    return true;
  } catch (_error) {
    return false;
  }
}

export async function readAnyFile(
  path: string,
  encoding?: BufferEncoding
): Promise<string | null> {
  try {
    if (!path) return null;
    if (!existsSync(path)) return null;

    const data = await promiseReadFile(path, { encoding });
    return data as string;
  } catch (_error) {
    return null;
  }
}

export function extractFileExtension(filePath = ""): string {
  const ext = filePath ? path.extname(filePath) : "";
  return ext ? ext.slice(1) : "";
}
