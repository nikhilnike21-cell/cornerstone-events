require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

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

// ── Admin dashboard (EXPLICIT ROUTE - runs BEFORE static) ─
app.get('/admin', (req, res) => {
  const adminPath = path.join(__dirname, 'public', 'admin.html');
  
  // Check if file exists
  if (!fs.existsSync(adminPath)) {
    console.error(`Admin file not found at: ${adminPath}`);
    return res.status(404).json({ 
      error: 'Admin dashboard not found',
      lookingAt: adminPath,
      __dirname: __dirname,
      cwd: process.cwd()
    });
  }
  
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.sendFile(adminPath);
});

// ── Static file serving (for other public assets) ────────
app.use(express.static(path.join(__dirname, 'public')));

// ── 404 handler ───────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// ── Global error handler ──────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error.' });
});

// ── Initialize server ─────────────────────────────────────
connectDB().then(() => {
  if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
      console.log(`\n🚀  Server running  → http://localhost:${PORT}`);
      console.log(`📋  Admin dashboard → http://localhost:${PORT}/admin`);
      console.log(`📡  API base        → http://localhost:${PORT}/api/bookings\n`);
    });
  }
}).catch((err) => {
  console.error('Failed to start server:', err.message);
  if (process.env.NODE_ENV !== 'production') {
    process.exit(1);
  }
});

module.exports = app;