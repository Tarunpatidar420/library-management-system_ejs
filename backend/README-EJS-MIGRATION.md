# React to EJS migration

The frontend has been migrated from React/Vite to EJS + vanilla JavaScript while keeping the existing Express API, MongoDB models, controllers and API routes.

## Run

```bash
cd backend
npm install
npm start
```

Open `http://localhost:5000`.

### What changed

- Removed the React/Vite frontend.
- Added Express EJS views under `src/views`.
- Added browser-side JavaScript under `public/js/app.js` for API calls and interactions.
- Added responsive CSS under `public/css/app.css`.
- Kept the existing `/api/*` endpoints unchanged.
- Reset-password links now use the same Express/EJS server (`CLIENT_URL=http://localhost:5000`).
