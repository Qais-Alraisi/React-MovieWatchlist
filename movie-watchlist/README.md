# Movie Watchlist

Simple React + Express app to keep track of movies per-user (register/login, add movies, mark watched, delete).

## Run the project

You'll need Node (14+) and pnpm/npm installed.

1. Install dependencies

```bash
# from project root
pnpm install
cd server && pnpm install
```

2. Start the backend

```bash
pnpm start:server
# or: (in another terminal)
cd server; node index.js
```

3. Start the frontend

```bash
pnpm dev
```

Frontend runs at http://localhost:5173 and backend at http://localhost:4000 by default.

Tip: Set `JWT_SECRET` env var in your environment before starting the server for production.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
