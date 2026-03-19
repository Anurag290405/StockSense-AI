const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://stock-sense-ai-alpha.vercel.app', // Placeholder Vercel link
    process.env.FRONTEND_URL
  ]
}));
app.use(express.json());

// Routes
const chatRoutes = require('./routes/chatRoutes');
app.use('/api', chatRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Root endpoint for simple verification
app.get('/', (req, res) => {
  res.send('StockSense AI Backend is running! Access the API via the /api route.');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
