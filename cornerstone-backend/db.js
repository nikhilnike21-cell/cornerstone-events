const mongoose = require('mongoose');

const OPTIONS = {
  serverSelectionTimeoutMS: 10000,
  bufferCommands: false,
};

// Cache connection across serverless invocations
let cached = global._mongooseCache;
if (!cached) {
  cached = global._mongooseCache = { conn: null, promise: null };
}

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI is not defined');

  // Return cached connection if already connected
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('MONGO_URI:', uri.replace(/\/\/.*:/, '//***:'));
    cached.promise = mongoose.connect(uri, OPTIONS).then((m) => {
      console.log(`✅ MongoDB connected: ${m.connection.host}`);
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    console.error('MongoDB connection error:', err.message);
    throw err;
  }

  return cached.conn;
}

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB disconnected');
  cached.conn = null;
  cached.promise = null;
});

async function closeDB() {
  await mongoose.connection.close();
}

process.on('SIGINT',  async () => { await closeDB(); process.exit(0); });
process.on('SIGTERM', async () => { await closeDB(); process.exit(0); });

module.exports = { connectDB, closeDB };
