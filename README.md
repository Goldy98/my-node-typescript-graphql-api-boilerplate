# NodeJS GraphQL + TypeScript + ExpressJS API boilerplate

<div align="center">

[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)]()
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)]()
[![forthebadge](https://forthebadge.com/images/badges/for-you.svg)]()
<br />

</div>

> This project is a starting point to build a Graphql API with NodeJS and Typescript

> The source code is open so that you can fork it and tweak as you want.

> IMPORTANT: Any improvements are welcome

:star: Stars are appreciate !

## Features

## Folder Structure

    .
    ├── ddl                          # Your database creation scripts (sql)
    ├── src                          # Source
    ├────── gql-schemas              # Directory to place your graphql schemas
    ├────── graphql                  # Graphql server directory
    ├────────── types                # Typescript types definitions files generated from your graphql schema
    ├────── handlers                 # Handler for express routes
    ├────── helpers                  # Helpers functions
    ├────── routes                   # Routes
    ├── .gitignore
    ├── config.json                  # Configuration file for development environnement
    ├── config.production.json       # Configuration file for production environnement
    ├── tsconfig.json                # Typescript Configuration file
    └── README.md

## Developing

### Built With

- [Love 💕](#) - A lot of love (and coffee)
- [NodeJS](https://nodejs.org/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript at Any Scale
- [GraphQL](https://graphql.org/) - A query language for your API
- [Express JS](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js

### Clone Project

```shell
$ git clone https://github.com/Goldy98/my-node-typescript-graphql-api-boilerplate.git
```

## Project setup

> IMPORTANT: Change configuration file (`config.json` and `config.production.json`) to match your server configuration

### Install dependacies

```shell
$ cd my-node-typescript-graphql-api-boilerplate
$ npm install
```

`cd my-node-typescript-graphql-api-boilerplate` move to the api folder
`npm install` install all dependencies.

#### Compiles and hot-reloads for development

```
$ npm run serve
```

#### Build for production

```shell
$ npm run build
```

#### Launch in production

```shell
$ npm start
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
