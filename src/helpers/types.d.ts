import { GraphQLFieldConfig } from "graphql";

export interface Configuration {
  database: DatabaseConfig;
  server: Server;
  graphql: GraphqlConfig;
}

interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}

interface Server {
  host: string;
  port: number;
}

interface GraphqlConfig {
  introspection: true;
  playground: true;
}
