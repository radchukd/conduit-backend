# Graphql typescript starter

## Getting started

### Manual

```bash
# Clone the repository
git clone --depth=1 https://github.com/radchukd/stackx <project_name>

# Install dependencies
cd <project_name> && npm install

# Configure .env
cp .env.example .env

# Build and run the project
npm run build && npm run start
```

### Docker

```bash
  # Build image
  docker build -t <image_name> .

  # Run image
  docker run -p 5001:5001 <image_id>

```

## Available scripts

In the project directory, you can run:

### `npm run build`

Compiles the app into esnext.

### `npm run debug`

Runs compiled app in debug mode

### `npm run dev`

Runs uncompiled app in development mode.

### `npm run generate`

Generates graphql types into src/types/generated.ts

### `npm run lint`

Lints src and test folders

### `npm run test`

Runs tests

### `npm run start`

Runs compiled app in production mode

## What’s Included?

- Eslint
- Express
- GraphQL(+ Code Generator)
- Jest
- MongoDB
- Node.js(+ Nodemon)
- Typescript

## Project structure

```
├── dist/
├── src
│   ├── config
│   │   ├── db.ts
│   │   ├── graphqlServer.ts
│   │   ├── index.ts
│   │   └── secrets.ts
│   ├── graphql
│   │   ├── index.ts
│   │   ├── rootValue.ts
│   │   └── schema.ts
│   ├── types
│   │   └── index.ts
│   ├── util
│   │   └── index.ts
│   └── index.ts
├── test/
├── codegen.json
├── Dockerfile
├── .dockerignore
├── .env.example
├── .eslintrc
├── .gitignore
├── jest.config.js
├── package.json
├── package-lock.json
├── readme.md
└── tsconfig.json
```
