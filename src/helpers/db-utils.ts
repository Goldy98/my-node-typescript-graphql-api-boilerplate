import { dirname } from "path";
import { appLog, getConfig, readConfigFileSync } from "./helper";
import mysqlAdapter from "@ladc/mysql-adapter";
import sqlBricksModifier, { SBMainConnection } from "@ladc/sql-bricks-modifier";
import ladc from "ladc";

export const packageDir = dirname(__dirname);
export const conf = getConfig();

export let dbConnection: SBMainConnection | undefined = undefined;

export async function connectToDatabase() {
  try {
    if (!dbConnection) {
      dbConnection = ladc({
        adapter: mysqlAdapter({
          mysqlConfig: conf.database
        }),
        modifier: sqlBricksModifier({
          toParamsOptions: { placeholder: "?" }
        }),
        logError: err => console.log(err)
      }) as SBMainConnection;

      const dbConnectionTestResult = await dbConnection.all("SHOW TABLES");

      if (dbConnectionTestResult) {
        appLog("info", "Database connection established");
        return;
      }
    }
  } catch (error) {
    appLog("error", "Failed to connect to database due to " + error);
    console.log(error);
  }
}
