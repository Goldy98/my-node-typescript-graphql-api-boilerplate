import { dirname } from "path";
import { appLog, getConfig, readConfigFileSync } from "./helper";
import mysqlAdapter from "@ladc/mysql-adapter";
import sqlBricksModifier, { SBMainConnection } from "@ladc/sql-bricks-modifier";
import ladc from "ladc";

export const packageDir = dirname(__dirname);
export const conf = getConfig();

export let cn: SBMainConnection | undefined = undefined;

export function connectToDatabase() {
  try {
    if (!cn)
      cn = ladc({
        adapter: mysqlAdapter({
          mysqlConfig: conf.database
        }),
        modifier: sqlBricksModifier({
          toParamsOptions: { placeholder: "?" }
        }),
        logError: err => console.log(err)
      }) as SBMainConnection;
  } catch (error) {
    console.log(error);
  }
}
