# Podcast app
iTunes top podcast application, consuming the public API.

[![codecov](https://codecov.io/github/aaroncarricondo/podcast-app/branch/master/graph/badge.svg?token=IR3Y1MHY0W)](https://codecov.io/github/aaroncarricondo/podcast-app/branch/master)

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