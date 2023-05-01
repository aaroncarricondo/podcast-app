# Podcast-app

In order to execute the application locally, serve (npm package) should be installed.

## Installation

First install dependency packages.

```bash
npm install
```

## Development mode
Either use:

1. Start the webpack development server:
```bash
npm run start
```

2. Build the application in dev mode and serve it locally:

```bash
npm run build-dev
npx serve dist
```

## Production mode

Build the application in production mode and serve it locally:

```bash
npm run build
npx serve dist
```