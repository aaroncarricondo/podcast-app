# Podcast app
iTunes top podcast application, consuming the public API.

[![codecov](https://codecov.io/github/aaroncarricondo/podcast-app/branch/master/graph/badge.svg?token=IR3Y1MHY0W)](https://codecov.io/github/aaroncarricondo/podcast-app/branch/master)

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

Shared components used in multiple pages or components that are not entry points of pages.

### /contexts

All React Context API related features implemented.

### /hooks

Shared component functionalities used across the application.

### /models

Interfaces defined for remote data.

### /navigation

All the navigation and routes defined for the application. "index.tsx" is the main entry point, but it could be separated into different files if the navigation grows.

### /pages

React components that are navigation entry points, normally without properties.

### /styles

All the styling files, in this case css.

### /utils

Pure javascript functions that are used across the aplication.

## Container-View pattern

The components inside pages will be developed following de Container-View pattern.

- **Container components**: Entry point of the page/feature.
  - Data fetching.
  - Computations.
  - Pass the data to the View.
  - No styling (css, less, scss, etc.)
- **View components**:
  - All the user interface is defined here.
  - All the data/callbacks must be received from props provided by its container or parent.
  - Can be broken down in diferent components if it grows, following the view-container pattern or if its just user interface, defined as a normal component.


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
5. Jest:
  - Testing JS/TS code.
  - Code coverage.