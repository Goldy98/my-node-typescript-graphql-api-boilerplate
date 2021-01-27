import {
  appendFileSync,
  createFileSync,
  existsSync,
  readFileSync
} from "fs-extra";
import { join } from "path";
import { Configuration } from "./types";

let conf: Configuration | undefined = undefined;

const chalk = require("chalk");

export function readConfigFileSync() {
  const paramIndex = process.argv.indexOf("--config");

  const hasParam = paramIndex !== -1 && paramIndex + 1 < process.argv.length;
  const confFile = hasParam ? process.argv[paramIndex + 1] : "config.json";

  try {
    const content = readFileSync(confFile);
    conf = JSON.parse(content.toString("utf8"));
  } catch (err) {
    throw new Error(`Cannot load configuration '${confFile}': ${err.message}`);
  }
}

export function getConfig(): Configuration {
  if (!conf) readConfigFileSync();
  return conf;
}

export function dateFormat(date: any, fstr: any, utc: any) {
  utc = utc ? "getUTC" : "get";
  return fstr.replace(/%[YmdHMS]/g, function (m) {
    switch (m) {
      case "%Y":
        return date[utc + "FullYear"](); // no leading zeros required
      case "%m":
        m = 1 + date[utc + "Month"]();
        break;
      case "%d":
        m = date[utc + "Date"]();
        break;
      case "%H":
        m = date[utc + "Hours"]();
        break;
      case "%M":
        m = date[utc + "Minutes"]();
        break;
      case "%S":
        m = date[utc + "Seconds"]();
        break;
      default:
        return m.slice(1); // unknown code, remove %
    }
    // add leading zero if required
    return ("0" + m).slice(-2);
  });
}

function formatError(
  errtype: "info" | "warning" | "error",
  message: string,
  destination: "console" | "logfile"
): string {
  const colors = {
    info: chalk.bold.blue,
    warning: chalk.bold.yellow,
    error: chalk.bold.red
  };
  if (destination === "console") {
    return `
  ${chalk.inverse.white(
    dateFormat(new Date(), "%Y-%m-%d %H:%M:%S", true)
  )} -> ${colors[errtype](errtype.toUpperCase())} ==> ${colors[errtype](
      message
    )}
  `;
  }
  return `
  ${dateFormat(
    new Date(),
    "%Y-%m-%d %H:%M:%S",
    true
  )} -> ${errtype.toUpperCase()} ==> ${message}
  `;
}

export function appLog(
  severity: "info" | "warning" | "error",
  message: string
) {
  if (!existsSync("./error_log.log")) {
    createFileSync("./error_log.log");
    appLog("warning", "Log file not found. It has been created");
  }
  console.log(formatError(severity, message, "console"));
  appendFileSync("./error_log.log", formatError(severity, message, "logfile"));
}

export function cleanUndef<T>(obj: T): T {
  const res = {} as any;
  for (const [key, val] of Object.entries(obj)) {
    if (val !== undefined) res[key] = val;
  }
  return res;
}
