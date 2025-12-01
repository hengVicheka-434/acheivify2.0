# Acheivify 2.0

Acheivify 2.0 is a lightweight React single-page application - built as an update from the traditional html and css project of one of this project's member's former project, Acheivify - that provides a small suite of productivity tools — primarily a To Do list. It focuses on a clean UI, local persistence (localStorage), and responsive navigation.

## Key Features

- Add, edit, delete tasks with timestamps.
- Mark tasks complete with persistence to `localStorage`.
- Per-task priority levels (High / Medium / Low).
- Responsive navigation with mobile side-drawer and backdrop.
- Simple, CSS-driven UI with components split into logical files.

## Tech stack

- React (functional components + hooks)
- React Router for page navigation
- Plain CSS (in `src/styles`) for styling
- LocalStorage for client-side persistence

## Quick start

Requirements:
- Node.js 14+ and npm (or yarn)

Install and run locally:

```bash
# from project root
npm install
npm start
```

This runs the app in development mode and opens it at `http://localhost:3000` by default.

## Available scripts (from `package.json`)

- `npm start` — start dev server
- `npm run build` — build production bundle

(If you need scripts added or changed, update `package.json`.)

## Project structure (important files)

- `src/`
  - `App.jsx` — app entry, routes and layout
  - `index.js` — React DOM bootstrap
  - `pages/`
    - `ToDo.jsx` — main To Do UI (add/edit/delete tasks, priority)
    - `Home.jsx`, `History.jsx`, `Archive.jsx`, `Contact.jsx` — other pages
  - `components/`
    - `PageContent.jsx` — shared layout wrapper for pages
    - `Navigations.jsx` — top navigation / mobile drawer
    - `Header.jsx` — logo and header
    - `LoadingComponent.jsx` — optional loading overlay
  - `styles/` — CSS files including `App.css`, page-specific styles
  - `assets/` — images and media

## Usage notes & troubleshooting

- Tasks are stored in your browser's `localStorage` under the key `taskListData`.
- If buttons or dropdowns appear unresponsive:
  - Check whether a mobile navigation backdrop (`.backdrop`) is present and covering the page. Close the mobile menu or resize the window.
  - Confirm `PageContent.jsx` uses a `div` wrapper so interactive elements render correctly.
  - Open DevTools to inspect the DOM to see whether buttons/selects exist but are hidden by CSS or overlays.

## Development tips

- To add global state or sync between tabs, consider replacing `localStorage` with `IndexedDB` or a small backend API.
- For persistent filters or remote sync, add an API layer and update `ToDo.jsx` to fetch/save tasks.
- Tests are not included; add Jest/React Testing Library for component/unit tests.
