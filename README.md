# StockSense AI

A data-driven stock & analytics assistant built with React, Vite, TailwindCSS, Framer Motion, and an Express/OpenAI backend.

## Project Structure

- `/client` - React frontend application (Vite setup)
- `/server` - Node.js Express backend for handling OpenAI completions and CSV parsing

## Getting Started Locally

### 1. Setup Backend
```bash
cd server
npm install
npm run dev
```
The backend runs on `http://localhost:3001` by default. Note: You should specify your `OPENAI_API_KEY` in `server/.env`. If the key is left as default, mock responses will be used.

### 2. Setup Frontend
```bash
cd client
npm install
npm run dev
```
The frontend runs on `http://localhost:5173`.

## Deployment Guide

### Live Application Links
- **Frontend (Vercel)**: [https://stocksense-ai.vercel.app](https://stocksense-ai.vercel.app) *(Update to your actual Vercel link)*
- **Backend (Render)**: [https://stocksense-server.onrender.com](https://stocksense-server.onrender.com) *(Update to your actual Render link)*

### Deploying Frontend (Vercel)
1. Push this repository to GitHub.
2. Go to Vercel and create a new project, selecting the `/client` directory.
3. Add `VITE_API_URL` to the Environment Variables (pointing to your hosted backend, e.g. `https://your-stocksense-backend.onrender.com/api`).
4. Click Deploy. Vercel automatically detects Vite and builds the app.

### Deploying Backend (Render or Vercel)
**Option A: Render (Recommended for Express servers)**
1. Create a "Web Service" in Render.
2. Select your repository and specify the Root Directory as `server`.
3. Build command: `npm install`
4. Start command: `node index.js`
5. Add `OPENAI_API_KEY` and `PORT` environment variables.

**Option B: Vercel (Using serverless)**
1. To deploy on Vercel as serverless functions, you would need to export the express app directly and configure a `vercel.json` file in the `/server` folder routing to `api/index.js`. Alternatively, deploy as a monolith by dropping the `server` index.js into Next.js.
