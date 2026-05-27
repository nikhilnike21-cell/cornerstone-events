const mongoose = require('mongoose');

// ── Schema ─────────────────────────────────────────────────
const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address'],
    },
    phone: {
      type: String,
      trim: true,
      default: null,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
    confirmToken: {
      type: String,
      unique: true,
      sparse: true,   // allows null without unique collision
    },
    cancelToken: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: true,   // adds createdAt + updatedAt automatically
    toJSON:  { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ── Indexes ────────────────────────────────────────────────
// Note: confirmToken and cancelToken already have indexes via unique: true
// Just add indexes for query performance
bookingSchema.index({ status: 1 });
bookingSchema.index({ createdAt: -1 });

// ── Model ──────────────────────────────────────────────────
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;