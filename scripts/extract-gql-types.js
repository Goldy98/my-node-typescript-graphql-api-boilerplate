
const fs = require("fs");
const { printSchema, parse } = require("graphql");
const { join, resolve } = require("path");
const { loadSchemaSync } = require('@graphql-tools/load');
const typescriptPlugin = require("@graphql-codegen/typescript");
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');
const { codegen } = require("@graphql-codegen/core");

const chalk = require("chalk");

const packageDir = resolve(__dirname, "..")
const schemasDir = join(packageDir, "src", "gql-schemas")
const destFile = resolve(packageDir, "src", "graphql", "types", "gql-schema.d.ts");

const schema = loadSchemaSync(`${schemasDir}/*.graphql`, { // load from multiple files using glob
  loaders: [
    new GraphQLFileLoader()
  ]
});

const typeGenerationConfig = {
  // used by a plugin internally, although the 'typescript' plugin currently
  // returns the string output, rather than writing to a file
  schema: parse(printSchema(schema)),
  plugins: [ // Each plugin should be an object
    {
      typescript: {
        enumsAsTypes: true,
        typesPrefix: "Gql",
        declarationKind: {
          type: "interface",
          input: "interface"
        }
      }, // Here you can pass configuration to the plugin
    },
  ],
  pluginMap: {
    typescript: typescriptPlugin,
  },
};

(async () => {
  console.info("--- Extracting GraphQL types ---");
  const output = await codegen(typeGenerationConfig);
  fs.writeFileSync(destFile, `/* eslint-disable */\n\n${output}`);
  console.log(chalk.bgGreenBright.black("--- GraphQL types extracted ---"));
})().catch(err => console.log('err:', err));