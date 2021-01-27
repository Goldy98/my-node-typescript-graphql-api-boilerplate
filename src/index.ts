import { appLog, getConfig } from "./helpers/helper";
import { Configuration } from "./helpers/types";
import express, { Express } from "express";
import cors = require("cors");
import multer = require("multer");
import bodyParser = require("body-parser");
import http from "http";
import testRouter from "./routes/test.routes";
import { setupGraphqlServer } from "./graphql/server";

async function setup() {
  // Retrieve the sconfiguration
  const config: Configuration = getConfig();

  // Set CORS option
  var corsOptions = {
    origin: `*`
  };

  const app = express();

  app.use(
    cors(corsOptions),
    bodyParser.json({
      limit: "50mb"
    })
  );

  // app.options("*", cors());

  // parse requests of content-type - application/json
  app.use(bodyParser.json());

  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // FIXME
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 1024 * 1024 * 50 // 50 MB
    }
  });

  await setupGraphqlServer({ app, path: "/graphql", config });

  app.use("/", testRouter);

  // connectToDatabase();

  const httpServer = http.createServer(app);

  try {
    httpServer.listen(config.server.port, config.server.host, undefined, () => {
      appLog(
        "info",
        `🚀 API started and listening on http://${config.server.host}:${config.server.port}`
      );
    });
  } catch (error) {
    appLog(
      "error",
      `Unable to launch API on http://${config.server.host}:${config.server.port}, due to Error: ${error}`
    );
  }
}

setup().catch(err => {
  appLog("error", err);
});
