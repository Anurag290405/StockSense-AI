# StockSense AI

A data-driven stock & analytics assistant built with React, Vite, TailwindCSS, Framer Motion, and an Express/OpenAI backend.

## Project Structure

- `/client` - React frontend application (Vite setup)
- `/server` - Node.js Express backend for handling  completions and CSV parsing

## Getting Started Locally

### 1. Setup Backend
```bash
cd server
npm install
npm run dev
```
The backend runs on `http://localhost:3001` by default. Note: You should specify your `OPENROUTER_API_KEY` in `server/.env`. If the key is left as default, mock responses will be used.

### 2. Setup Frontend
```bash
cd client
npm install
npm run dev
```
The frontend runs on `http://localhost:5173`.
