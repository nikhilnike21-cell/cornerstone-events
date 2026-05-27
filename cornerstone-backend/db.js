const mongoose = require('mongoose');

// ── Connection options ─────────────────────────────────────
const OPTIONS = {
  serverSelectionTimeoutMS: 5000,   // fail fast if unreachable
};

// ── Connect ────────────────────────────────────────────────
async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error('MONGO_URI is not defined in your .env file');
  }

  try {
    await mongoose.connect(uri, OPTIONS);
    console.log(`✅  MongoDB connected: ${mongoose.connection.host}`);
  } catch (err) {
    console.error('❌  MongoDB connection error:', err.message);
    process.exit(1);   // crash early — nothing works without a DB
  }
}

// ── Connection event listeners ─────────────────────────────
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️   MongoDB disconnected. Attempting reconnect…');
});

mongoose.connection.on('reconnected', () => {
  console.log('✅  MongoDB reconnected');
});

// ── Graceful shutdown ──────────────────────────────────────
async function closeDB() {
  await mongoose.connection.close();
  console.log('MongoDB connection closed.');
}

process.on('SIGINT',  async () => { await closeDB(); process.exit(0); });
process.on('SIGTERM', async () => { await closeDB(); process.exit(0); });

module.exports = { connectDB, closeDB };
