const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Booking = require('../models/Booking');
const {
  sendAdminNotification,
  sendUserAcknowledgement,
  sendUserConfirmation,
  sendUserCancellation,
} = require('../emailService');

const router = express.Router();

// ── Middleware: admin-only routes ──────────────────────────
function adminOnly(req, res, next) {
  const secret = req.headers['x-admin-secret'] || req.query.secret;
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// ══════════════════════════════════════════════════════════
// POST /api/bookings — submit booking (public)
// ══════════════════════════════════════════════════════════
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({
        error: 'Name, email, and message are required.',
      });
    }

    const booking = await Booking.create({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || null,
      message: message.trim(),
      confirmToken: uuidv4(),
      cancelToken: uuidv4(),
    });

    const base = process.env.BACKEND_URL;
    const confirmUrl = `${base}/api/bookings/action/confirm/${booking.confirmToken}`;
    const cancelUrl = `${base}/api/bookings/action/cancel/${booking.cancelToken}`;

    // ✅ AWAIT the emails before sending response
    try {
      await Promise.all([
        sendAdminNotification(booking, confirmUrl, cancelUrl),
        sendUserAcknowledgement(booking),
      ]);
    } catch (err) {
      console.error('Email error:', err.message);
    }

    return res.status(201).json({
      success: true,
      message: 'Booking received! We will get back to you within 24 hours.',
      bookingId: booking._id,
    });

  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: messages.join(', ') });
    }
    console.error('POST /api/bookings:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// ══════════════════════════════════════════════════════════
// GET /api/bookings — list all bookings (admin)
// ══════════════════════════════════════════════════════════
router.get('/', adminOnly, async (req, res) => {
  try {
    const { status } = req.query;

    // Build filter
    const filter = status && status !== 'all' ? { status } : {};

    const [bookings, total, pending, confirmed, cancelled] = await Promise.all([
      Booking.find(filter).sort({ createdAt: -1 }).lean(),
      Booking.countDocuments(),
      Booking.countDocuments({ status: 'pending' }),
      Booking.countDocuments({ status: 'confirmed' }),
      Booking.countDocuments({ status: 'cancelled' }),
    ]);

    return res.json({
      stats: { total, pending, confirmed, cancelled },
      bookings,
    });

  } catch (err) {
    console.error('GET /api/bookings:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// ══════════════════════════════════════════════════════════
// GET /api/bookings/:id — single booking (admin)
// ══════════════════════════════════════════════════════════
router.get('/:id', adminOnly, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).lean();
    if (!booking) return res.status(404).json({ error: 'Booking not found.' });
    return res.json(booking);
  } catch (err) {
    if (err.name === 'CastError') return res.status(400).json({ error: 'Invalid booking ID.' });
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// ══════════════════════════════════════════════════════════
// PATCH /api/bookings/:id/confirm — confirm (admin)
// ══════════════════════════════════════════════════════════
router.patch('/:id/confirm', adminOnly, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found.' });
    if (booking.status !== 'pending') {
      return res.status(409).json({ error: `Booking is already ${booking.status}.` });
    }

    booking.status = 'confirmed';
    await booking.save();

    await sendUserConfirmation(booking);

    return res.json({ success: true, booking });

  } catch (err) {
    if (err.name === 'CastError') return res.status(400).json({ error: 'Invalid booking ID.' });
    console.error('PATCH confirm:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// ══════════════════════════════════════════════════════════
// PATCH /api/bookings/:id/cancel — cancel (admin)
// ══════════════════════════════════════════════════════════
router.patch('/:id/cancel', adminOnly, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found.' });
    if (booking.status !== 'pending') {
      return res.status(409).json({ error: `Booking is already ${booking.status}.` });
    }

    booking.status = 'cancelled';
    await booking.save();

    await sendUserCancellation(booking);

    return res.json({ success: true, booking });

  } catch (err) {
    if (err.name === 'CastError') return res.status(400).json({ error: 'Invalid booking ID.' });
    console.error('PATCH cancel:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// ══════════════════════════════════════════════════════════
// DELETE /api/bookings/:id — delete (admin)
// ══════════════════════════════════════════════════════════
router.delete('/:id', adminOnly, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found.' });
    return res.json({ success: true });
  } catch (err) {
    if (err.name === 'CastError') return res.status(400).json({ error: 'Invalid booking ID.' });
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// ══════════════════════════════════════════════════════════
// ONE-CLICK EMAIL ACTION LINKS (token = auth)
// ══════════════════════════════════════════════════════════

// GET /api/bookings/action/confirm/:token
router.get('/action/confirm/:token', async (req, res) => {
  try {
    const booking = await Booking.findOne({ confirmToken: req.params.token });

    if (!booking) {
      return res.status(400).send(actionPage(
        'Invalid Link',
        'This confirmation link is invalid or has already been used.',
        '#e05c5c'
      ));
    }
    if (booking.status !== 'pending') {
      return res.send(actionPage(
        'Already Processed',
        `This booking is already <strong>${booking.status}</strong>.`,
        '#c9a96e'
      ));
    }

    booking.status = 'confirmed';
    await booking.save();
    await sendUserConfirmation(booking);

    return res.send(actionPage(
      '✓ Booking Confirmed',
      `<strong>${booking.name}'s</strong> booking has been confirmed. They have been notified by email.`,
      '#4caf7a'
    ));

  } catch (err) {
    console.error('Action confirm:', err);
    return res.status(500).send(actionPage('Error', 'Something went wrong. Please try again.', '#e05c5c'));
  }
});

// GET /api/bookings/action/cancel/:token
router.get('/action/cancel/:token', async (req, res) => {
  try {
    const booking = await Booking.findOne({ cancelToken: req.params.token });

    if (!booking) {
      return res.status(400).send(actionPage(
        'Invalid Link',
        'This cancellation link is invalid or has already been used.',
        '#e05c5c'
      ));
    }
    if (booking.status !== 'pending') {
      return res.send(actionPage(
        'Already Processed',
        `This booking is already <strong>${booking.status}</strong>.`,
        '#c9a96e'
      ));
    }

    booking.status = 'cancelled';
    await booking.save();
    await sendUserCancellation(booking);

    return res.send(actionPage(
      '✕ Booking Cancelled',
      `<strong>${booking.name}'s</strong> booking has been cancelled. They have been notified by email.`,
      '#e05c5c'
    ));

  } catch (err) {
    console.error('Action cancel:', err);
    return res.status(500).send(actionPage('Error', 'Something went wrong. Please try again.', '#e05c5c'));
  }
});

// ── Action result page ─────────────────────────────────────
function actionPage(title, body, color) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>${title} — Cornerstone</title>
  <style>
    * { box-sizing:border-box; margin:0; padding:0; }
    body {
      background:#0e0c0a; font-family:'Helvetica Neue',sans-serif;
      display:flex; align-items:center; justify-content:center;
      min-height:100vh; color:#e8dcc8;
    }
    .card {
      background:#161310; border:1px solid #2e2720; border-radius:10px;
      padding:52px 60px; max-width:480px; text-align:center;
    }
    h1 { font-size:26px; font-weight:300; color:${color}; margin-bottom:16px; }
    p  { font-size:15px; color:#8a7d6b; line-height:1.7; margin-bottom:32px; }
    a  {
      display:inline-block; padding:12px 28px;
      border:1px solid #c9a96e; color:#c9a96e; border-radius:4px;
      font-size:11px; letter-spacing:0.2em; text-transform:uppercase;
      text-decoration:none; transition:all 0.2s;
    }
    a:hover { background:#c9a96e; color:#0e0c0a; }
  </style>
</head>
<body>
  <div class="card">
    <h1>${title}</h1>
    <p>${body}</p>
    <a href="/admin">Go to Dashboard</a>
  </div>
</body>
</html>`;
}

module.exports = router;
