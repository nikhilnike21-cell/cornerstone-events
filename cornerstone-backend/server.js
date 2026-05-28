require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const { connectDB } = require('./db');
const bookingRoutes = require('./routes/bookings');

const app = express();
const PORT = process.env.PORT || 3000;

// ── CORS Configuration ─────────────────────────────────────
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5003',
  ],
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-admin-secret'],
  credentials: true,
};

app.use(cors(corsOptions));

// ── Body parsing ──────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Static admin dashboard ────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));

// ── Health check (for Vercel) ─────────────────────────────
app.get('/health', (req, res) => {
  const { readyState } = require('mongoose').connection;
  const states = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  res.json({
    status: 'ok',
    database: states[readyState] || 'unknown',
    timestamp: new Date().toISOString(),
  });
});

// ── API routes ────────────────────────────────────────────
app.use('/api/bookings', bookingRoutes);

// ── Admin dashboard ───────────────────────────────────────
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// ── 404 ───────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// ── Global error handler ──────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error.' });
});

// ── Initialize server ─────────────────────────────────────
// Connect to MongoDB and start server
connectDB().then(() => {
  // For local development
  if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
      console.log(`\n🚀  Server running  → http://localhost:${PORT}`);
      console.log(`📋  Admin dashboard → http://localhost:${PORT}/admin`);
      console.log(`📡  API base        → http://localhost:${PORT}/api/bookings\n`);
    });
  }
}).catch((err) => {
  console.error('Failed to start server:', err.message);
  // Don't exit in production (Vercel serverless)
  if (process.env.NODE_ENV !== 'production') {
    process.exit(1);
  }
});

// ── Export for Vercel serverless ──────────────────────────
module.exports = app;