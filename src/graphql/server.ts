import { ApolloServer } from "apollo-server-express";
import { Express } from "express";
import { Server } from "http";
import * as resolvers from "./all-resolvers";
import { appLog } from "../helpers/helper";
import { Configuration } from "../helpers/types";
import { loadSchema } from "@graphql-tools/load";
import { packageDir } from "../helpers/db-utils";
import { join } from "path";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";

export interface DataApiOptions {
  app: Express;
  path: string;
  httpServer?: Server;
  config: Configuration;
}

export async function setupGraphqlServer({
  app,
  path,
  config
}: DataApiOptions) {
  const schema = await loadSchema(
    `${join(packageDir, "gql-schemas")}/*.graphql`,
    {
      // load from multiple files using glob
      loaders: [new GraphQLFileLoader()]
    }
  );

  const schemaWithResolvers = addResolversToSchema({
    schema,
    resolvers
  });

  const server = new ApolloServer({
    schema: schemaWithResolvers,
    formatError: err => {
      appLog("error", JSON.stringify(err));
      console.log("err:", err);
      return err;
    },
    ...config.graphql
  });

  server.applyMiddleware({ app, path });

  appLog(
    "info",
    `🚀 GraphQL server started and listening on http://${config.server.host}:${config.server.port}/graphql`
  );
}
