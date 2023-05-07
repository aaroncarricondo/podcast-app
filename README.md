# Podcast app

In order to execute the application locally, ***serve*** (npm package) should be installed.

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

## Folder structure

### /components

Shared components used in the application that are not entrypoints of pages.

### /contexts

All React Context API related features implemented.

### /hooks

Shared component functionalities used across the application.

### /models

Interfaces defined for remote data.

### /navigation

All the navigation and routes defined for the application. "index.tsx" is the main entrypoint, but it could be separated into different files if the navigation grows.

### /pages

React components that are navigation entrypoints, normally without properties.

### /styles

All the styling files, in this case css.

### /utils

Pure javascript functions that are used across the aplication.


## Main packages

1.  Webpack:
    - Application bundling.
    - Development server with hot reload.
2.  Typescript:
    - Typed React components.
    - Typed Javascript code.
3.  React router:
    - Navigation.
4.  Ant Design:
    - Lots of already developed components.
    - Typed components.