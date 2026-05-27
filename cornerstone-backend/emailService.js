const nodemailer = require('nodemailer');
require('dotenv').config();

// ── Transporter ────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify connection on startup (non-fatal)
transporter.verify((err) => {
  if (err) console.warn('⚠️  Email transporter error:', err.message);
  else     console.log('✅  Email transporter ready');
});

// ── Colour tokens (match the website palette) ──────────
const GOLD   = '#c9a96e';
const BG     = '#0e0c0a';
const SURFACE = '#161310';
const BEIGE  = '#e8dcc8';
const MUTED  = '#8a7d6b';
const GREEN  = '#4caf7a';
const RED    = '#e05c5c';

// ── Shared email wrapper ───────────────────────────────
function wrapEmail(content) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Cornerstone Event Design</title>
</head>
<body style="margin:0;padding:0;background:${BG};font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${BG};padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:${SURFACE};padding:36px 48px;border-bottom:1px solid #2e2720;text-align:center;">
              <div style="font-size:22px;font-weight:600;letter-spacing:0.1em;color:${GOLD};margin-bottom:4px;">
                CORNERSTONE EVENTS
              </div>
              <div style="font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:${MUTED};">
                EVENT PLAN DESIGN EXECUTE
              </div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:${SURFACE};padding:40px 48px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0e0c0a;padding:28px 48px;border-top:1px solid #2e2720;text-align:center;">
              <p style="margin:0;font-size:12px;color:${MUTED};letter-spacing:0.04em;">
                © ${new Date().getFullYear()} Cornerstone Event Design · All rights reserved
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ── Button helper ──────────────────────────────────────
function btn(label, url, color = GOLD, textColor = BG) {
  return `
  <a href="${url}" style="
    display:inline-block;
    background:${color};
    color:${textColor};
    font-size:12px;
    font-weight:600;
    letter-spacing:0.22em;
    text-transform:uppercase;
    padding:14px 32px;
    border-radius:4px;
    text-decoration:none;
    margin:8px 6px;
  ">${label}</a>`;
}

// ── Booking row helper ─────────────────────────────────
function bookingRow(label, value) {
  if (!value) return '';
  return `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid #2e2720;width:36%;">
      <span style="font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:${MUTED};">${label}</span>
    </td>
    <td style="padding:10px 0;border-bottom:1px solid #2e2720;">
      <span style="font-size:14px;color:${BEIGE};">${value}</span>
    </td>
  </tr>`;
}

// ══════════════════════════════════════════════════════
// 1. ADMIN — new booking notification
// ══════════════════════════════════════════════════════
async function sendAdminNotification(booking, confirmUrl, cancelUrl) {
  const html = wrapEmail(`
    <p style="font-size:11px;letter-spacing:0.4em;text-transform:uppercase;color:${GOLD};margin:0 0 12px;">
      New Booking Request
    </p>
    <h2 style="margin:0 0 8px;font-size:28px;font-weight:300;color:${BEIGE};">
      ${booking.name}
    </h2>
    <p style="font-size:13px;color:${MUTED};margin:0 0 32px;">
      Submitted on ${new Date(booking.created_at).toLocaleString('en-IN', { dateStyle:'long', timeStyle:'short' })}
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:36px;">
      ${bookingRow('Name',    booking.name)}
      ${bookingRow('Email',   booking.email)}
      ${bookingRow('Phone',   booking.phone)}
      ${bookingRow('Message', booking.message)}
    </table>

    <p style="font-size:13px;color:${MUTED};margin:0 0 20px;">
      Take action on this booking:
    </p>
    <div style="text-align:center;padding:8px 0;">
      ${btn('✓  Confirm Booking', confirmUrl, GREEN, '#fff')}
      ${btn('✕  Cancel Booking',  cancelUrl,  RED,   '#fff')}
    </div>

    <p style="font-size:11px;color:${MUTED};margin:28px 0 0;text-align:center;">
      Or manage all bookings at your
      <a href="${process.env.BACKEND_URL}/admin" style="color:${GOLD};text-decoration:none;">Admin Dashboard</a>
    </p>
  `);

  await transporter.sendMail({
    from: `"Cornerstone Bookings" <${process.env.SMTP_USER}>`,
    to:   process.env.ADMIN_EMAIL,
    subject: `📋 New Booking — ${booking.name}`,
    html,
  });
}

// ══════════════════════════════════════════════════════
// 2. USER — booking received acknowledgement
// ══════════════════════════════════════════════════════
async function sendUserAcknowledgement(booking) {
  const html = wrapEmail(`
    <p style="font-size:11px;letter-spacing:0.4em;text-transform:uppercase;color:${GOLD};margin:0 0 12px;">
      We've received your inquiry
    </p>
    <h2 style="margin:0 0 8px;font-size:28px;font-weight:300;color:${BEIGE};">
      Thank you, ${booking.name.split(' ')[0]}
    </h2>

    <div style="width:40px;height:1px;background:${GOLD};margin:24px 0;"></div>

    <p style="font-size:15px;color:${BEIGE};line-height:1.8;margin:0 0 24px;">
      Your booking request has been received. Our team will review your inquiry
      and get back to you within <strong style="color:${GOLD};">24 hours</strong>.
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:36px;">
      <tr>
        <td style="padding:16px 20px;background:#1e1a15;border:1px solid #2e2720;border-radius:6px;">
          <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:${MUTED};">Your message</p>
          <p style="margin:0;font-size:14px;color:${BEIGE};line-height:1.7;">${booking.message}</p>
        </td>
      </tr>
    </table>

    <p style="font-size:13px;color:${MUTED};line-height:1.7;margin:0;">
      If you need immediate assistance, call us at
      <a href="tel:+919310709393" style="color:${GOLD};text-decoration:none;">+91 93107 09393</a>
    </p>
  `);

  await transporter.sendMail({
    from: `"Cornerstone Event Design" <${process.env.SMTP_USER}>`,
    to:   booking.email,
    subject: `Your inquiry has been received — Cornerstone Event Design`,
    html,
  });
}

// ══════════════════════════════════════════════════════
// 3. USER — booking confirmed
// ══════════════════════════════════════════════════════
async function sendUserConfirmation(booking) {
  const html = wrapEmail(`
    <div style="text-align:center;margin-bottom:32px;">
      <div style="
        display:inline-flex;
        width:64px;height:64px;
        border:1px solid ${GOLD};
        border-radius:50%;
        align-items:center;justify-content:center;
        font-size:26px;
        color:${GOLD};
        margin-bottom:20px;
      ">✓</div>
    </div>

    <p style="font-size:11px;letter-spacing:0.4em;text-transform:uppercase;color:${GOLD};margin:0 0 12px;text-align:center;">
      Booking Confirmed
    </p>
    <h2 style="margin:0 0 8px;font-size:28px;font-weight:300;color:${BEIGE};text-align:center;">
      We're on it, ${booking.name.split(' ')[0]}!
    </h2>

    <div style="width:40px;height:1px;background:${GOLD};margin:24px auto;"></div>

    <p style="font-size:15px;color:${BEIGE};line-height:1.8;margin:0 0 24px;">
      Great news — your booking has been <strong style="color:${GREEN};">confirmed</strong>.
      Our event specialist will reach out shortly to discuss your requirements in detail.
    </p>

    <p style="font-size:13px;color:${MUTED};line-height:1.7;">
      In the meantime, feel free to call us at
      <a href="tel:+919310709393" style="color:${GOLD};text-decoration:none;">+91 93107 09393</a>
      or follow us on
      <a href="https://www.instagram.com/cornerstoneevents.in" style="color:${GOLD};text-decoration:none;">Instagram</a>.
    </p>
  `);

  await transporter.sendMail({
    from: `"Cornerstone Event Design" <${process.env.SMTP_USER}>`,
    to:   booking.email,
    subject: `✅ Booking Confirmed — Cornerstone Event Design`,
    html,
  });
}

// ══════════════════════════════════════════════════════
// 4. USER — booking cancelled
// ══════════════════════════════════════════════════════
async function sendUserCancellation(booking) {
  const html = wrapEmail(`
    <p style="font-size:11px;letter-spacing:0.4em;text-transform:uppercase;color:${MUTED};margin:0 0 12px;">
      Booking Update
    </p>
    <h2 style="margin:0 0 8px;font-size:28px;font-weight:300;color:${BEIGE};">
      We're sorry, ${booking.name.split(' ')[0]}
    </h2>

    <div style="width:40px;height:1px;background:${GOLD};margin:24px 0;"></div>

    <p style="font-size:15px;color:${BEIGE};line-height:1.8;margin:0 0 24px;">
      Unfortunately, we are unable to accommodate your booking at this time.
      We apologise for any inconvenience caused.
    </p>

    <p style="font-size:14px;color:${MUTED};line-height:1.7;margin:0 0 32px;">
      If you believe this is an error or would like to discuss alternatives,
      please don't hesitate to reach out.
    </p>

    <div style="text-align:center;">
      ${btn('Contact Us Again', `${process.env.FRONTEND_URL}/#contact`)}
    </div>
  `);

  await transporter.sendMail({
    from: `"Cornerstone Event Design" <${process.env.SMTP_USER}>`,
    to:   booking.email,
    subject: `Booking Update — Cornerstone Event Design`,
    html,
  });
}

module.exports = {
  sendAdminNotification,
  sendUserAcknowledgement,
  sendUserConfirmation,
  sendUserCancellation,
};
