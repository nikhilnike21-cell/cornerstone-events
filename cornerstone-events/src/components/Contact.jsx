import { useState, useEffect, useRef } from 'react';

// ── API URL from environment or fallback ──
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5003';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus]     = useState('idle'); // idle | loading | success | error
  const [errMsg, setErrMsg]     = useState('');
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const submitRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    // Client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrMsg('Please fill in Name, Email, and Message.');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrMsg('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setErrMsg('');

    try {
      const res = await fetch(`${API_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrMsg(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      // Reset success message after 6 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 6000);
    } catch (err) {
      console.error('Booking error:', err);
      setErrMsg('Network error — please check your connection and try again.');
      setStatus('error');
    }
  };

  // Magnetic submit button
  const handleSubmitMove = (e) => {
    const btn = submitRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width  / 2;
    const y = e.clientY - rect.top  - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  };
  const handleSubmitLeave = () => {
    if (submitRef.current) submitRef.current.style.transform = 'translate(0,0)';
  };

  const inputStyle = {
    width: '100%',
    background: 'var(--color-surface2)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    padding: '14px 18px',
    color: 'var(--color-beige)',
    fontFamily: 'var(--font-body)',
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.25s, box-shadow 0.25s',
  };
  const onFocus = (e) => {
    e.target.style.borderColor = 'var(--color-gold)';
    e.target.style.boxShadow   = '0 0 0 3px rgba(201,169,110,0.1)';
  };
  const onBlur  = (e) => {
    e.target.style.borderColor = 'var(--color-border)';
    e.target.style.boxShadow   = 'none';
  };

  return (
    <section id="contact" style={{ padding: '120px 40px', background: 'var(--color-bg)', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }} ref={ref}>

        {/* Header */}
        <div style={{
          marginBottom: 72, textAlign: 'center',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out)',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.45em',
            textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: 16,
          }}>Get In Touch</p>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(38px, 5vw, 58px)',
            fontWeight: 300, color: 'var(--color-beige-lt)',
          }}>Let's Create Something Extraordinary</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64, alignItems: 'start' }}>

          {/* Left — contact info */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-40px)',
            transition: 'opacity 0.8s 0.15s var(--ease-out), transform 0.8s 0.15s var(--ease-out)',
          }}>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--color-muted)',
              lineHeight: 1.8, marginBottom: 48,
            }}>
              Ready to bring your vision to life? Reach out and our team will respond within 24 hours.
            </p>

            <div style={{ marginBottom: 36 }}>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.35em',
                textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: 10,
              }}>Phone</p>
              <a
                href="tel:+919310709393"
                style={{
                  fontFamily: 'var(--font-display)', fontSize: 22,
                  color: 'var(--color-beige-lt)', letterSpacing: '0.04em',
                  transition: 'color 0.2s, text-shadow 0.3s', cursor: 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-gold)'; e.currentTarget.style.textShadow = '0 0 20px rgba(201,169,110,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-beige-lt)'; e.currentTarget.style.textShadow = 'none'; }}
              >+91 93107 09393</a>
            </div>

            <div style={{ width: 48, height: 1, background: 'var(--color-border)', marginBottom: 36 }} />

            <div>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.35em',
                textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: 10,
              }}>Email</p>
              <a
                href="mailto:cornerstoneevents0@gmail.com"
                style={{
                  fontFamily: 'var(--font-display)', fontSize: 16,
                  color: 'var(--color-beige-lt)', letterSpacing: '0.02em',
                  transition: 'color 0.2s', cursor: 'none',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-gold)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--color-beige-lt)'}
              >cornerstoneevents0@gmail.com</a>
            </div>
          </div>

          {/* Right — form */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(40px)',
            transition: 'opacity 0.8s 0.25s var(--ease-out), transform 0.8s 0.25s var(--ease-out)',
          }}>
            
            {/* Success message */}
            {status === 'success' && (
              <div style={{
                marginBottom: 24, padding: 20,
                background: 'rgba(76,175,122,0.12)',
                border: '1px solid var(--color-success)',
                borderRadius: 'var(--radius-sm)',
                color: '#4caf7a',
                fontFamily: 'var(--font-body)', fontSize: 14,
                animation: 'slideDown 0.4s var(--ease-out)',
              }}>
                ✓ Thank you! We'll get back to you within 24 hours.
              </div>
            )}

            {/* Error message */}
            {status === 'error' && (
              <div style={{
                marginBottom: 24, padding: 20,
                background: 'rgba(224,92,92,0.12)',
                border: '1px solid var(--color-error)',
                borderRadius: 'var(--radius-sm)',
                color: '#e05c5c',
                fontFamily: 'var(--font-body)', fontSize: 14,
                animation: 'slideDown 0.4s var(--ease-out)',
              }}>
                ✕ {errMsg}
              </div>
            )}

            {/* Form fields */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
                disabled={status === 'loading'}
                style={{ ...inputStyle, opacity: status === 'loading' ? 0.6 : 1 }}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
                disabled={status === 'loading'}
                style={{ ...inputStyle, opacity: status === 'loading' ? 0.6 : 1 }}
              />
            </div>

            <input
              type="tel"
              name="phone"
              placeholder="Phone (optional)"
              value={formData.phone}
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
              disabled={status === 'loading'}
              style={{ ...inputStyle, marginBottom: 20, opacity: status === 'loading' ? 0.6 : 1 }}
            />

            <textarea
              name="message"
              placeholder="Tell us about your event..."
              value={formData.message}
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
              disabled={status === 'loading'}
              style={{
                ...inputStyle,
                minHeight: 140,
                resize: 'vertical',
                marginBottom: 28,
                opacity: status === 'loading' ? 0.6 : 1,
              }}
            />

            {/* Submit button */}
            <button
              ref={submitRef}
              onClick={handleSubmit}
              disabled={status === 'loading'}
              onMouseMove={handleSubmitMove}
              onMouseEnter={e => {
                if (status !== 'loading') {
                  e.currentTarget.style.background = 'var(--color-gold-lt)';
                  e.currentTarget.style.boxShadow = '0 8px 40px rgba(201,169,110,0.4)';
                }
              }}
              onMouseLeave={e => {
                handleSubmitLeave();
                e.currentTarget.style.background = 'var(--color-gold)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              style={{
                width: '100%',
                fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                padding: '16px 0',
                background: status === 'loading' ? 'var(--color-muted)' : 'var(--color-gold)',
                color: 'var(--color-bg)',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                cursor: status === 'loading' ? 'not-allowed' : 'none',
                transition: 'transform 0.4s var(--ease-out), background 0.25s, opacity 0.25s',
                opacity: status === 'loading' ? 0.7 : 1,
              }}
            >
              {status === 'loading' ? 'Submitting...' : 'Send Inquiry'}
            </button>

            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 11,
              color: 'var(--color-muted)', marginTop: 16, textAlign: 'center',
            }}>We respect your privacy. Your details are secure.</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 900px) {
          #contact > div {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}