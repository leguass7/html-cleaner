import "dotenv/config";
import { resolve, join } from "path";

export type NodeEnv = "development" | "production" | "testing";

export const nodeEnv = (process.env.NODE_ENV || "production") as NodeEnv;
export const isDevMode = !!(nodeEnv !== "production");
export const rootDir = resolve(__dirname, "../..");

export const pathVolume = join(rootDir, "volumes");
