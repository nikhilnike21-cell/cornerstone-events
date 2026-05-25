import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
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
    transition: 'border-color 0.2s',
  };

  return (
    <section id="contact" style={{ padding: '120px 40px', background: 'var(--color-bg)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 72, textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.45em',
            textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: 16,
          }}>Get In Touch</p>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(38px, 5vw, 58px)',
            fontWeight: 300, color: 'var(--color-beige-lt)',
          }}>Let's Create Something Extraordinary</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.4fr',
          gap: 64,
          alignItems: 'start',
        }}>

          {/* Left — Contact Info */}
          <div>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--color-muted)',
              lineHeight: 1.8, marginBottom: 48,
            }}>
              Ready to bring your vision to life? Reach out to us and our team will get back to you within 24 hours.
            </p>

            {/* Phone */}
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
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-gold)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--color-beige-lt)'}
              >
                +91 93107 09393
              </a>
            </div>

            {/* Divider */}
            <div style={{ width: 48, height: 1, background: 'var(--color-border)', marginBottom: 36 }} />

            {/* Social */}
            <div>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.35em',
                textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: 18,
              }}>Follow Us</p>
              <div style={{ display: 'flex', gap: 16 }}>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/cornerstoneevents.in?igsh=MTk3eWV6dGNleDJ0ZA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 20px',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--color-surface)',
                    color: 'var(--color-beige)',
                    fontFamily: 'var(--font-body)', fontSize: 12,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--color-gold)';
                    e.currentTarget.style.color = 'var(--color-gold)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                    e.currentTarget.style.color = 'var(--color-beige)';
                  }}
                >
                  {/* Instagram SVG */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                  </svg>
                  Instagram
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/122604229/admin/dashboard/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 20px',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--color-surface)',
                    color: 'var(--color-beige)',
                    fontFamily: 'var(--font-body)', fontSize: 12,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--color-gold)';
                    e.currentTarget.style.color = 'var(--color-gold)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                    e.currentTarget.style.color = 'var(--color-beige)';
                  }}
                >
                  {/* LinkedIn SVG */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                  LinkedIn
                </a>

              </div>
            </div>
          </div>

          {/* Right — Contact Form */}
          <div style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '48px',
          }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  border: '1px solid var(--color-gold)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 24px',
                  color: 'var(--color-gold)', fontSize: 22,
                }}>✓</div>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 300,
                  color: 'var(--color-beige-lt)', marginBottom: 12,
                }}>Message Received</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--color-muted)' }}>
                  We'll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{
                      display: 'block', fontFamily: 'var(--font-body)', fontSize: 10,
                      letterSpacing: '0.3em', textTransform: 'uppercase',
                      color: 'var(--color-gold)', marginBottom: 8,
                    }}>Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'var(--color-gold)'}
                      onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
                    />
                  </div>
                  <div>
                    <label style={{
                      display: 'block', fontFamily: 'var(--font-body)', fontSize: 10,
                      letterSpacing: '0.3em', textTransform: 'uppercase',
                      color: 'var(--color-gold)', marginBottom: 8,
                    }}>Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'var(--color-gold)'}
                      onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
                    />
                  </div>
                </div>

                <div>
                  <label style={{
                    display: 'block', fontFamily: 'var(--font-body)', fontSize: 10,
                    letterSpacing: '0.3em', textTransform: 'uppercase',
                    color: 'var(--color-gold)', marginBottom: 8,
                  }}>Phone (Optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--color-gold)'}
                    onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block', fontFamily: 'var(--font-body)', fontSize: 10,
                    letterSpacing: '0.3em', textTransform: 'uppercase',
                    color: 'var(--color-gold)', marginBottom: 8,
                  }}>Message</label>
                  <textarea
                    name="message"
                    placeholder="Tell us about your event..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                    onFocus={e => e.target.style.borderColor = 'var(--color-gold)'}
                    onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  style={{
                    marginTop: 8,
                    padding: '16px 40px',
                    background: 'transparent',
                    border: '1px solid var(--color-gold)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--color-gold)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 11, letterSpacing: '0.35em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'background 0.3s, color 0.3s',
                    alignSelf: 'flex-start',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--color-gold)';
                    e.currentTarget.style.color = 'var(--color-bg)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--color-gold)';
                  }}
                >
                  Send Message
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer strip */}
        <div style={{
          marginTop: 100,
          paddingTop: 40,
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <p style={{
            fontFamily: 'var(--font-display)', fontSize: 18,
            color: 'var(--color-gold)', letterSpacing: '0.08em',
          }}>Cornerstone Event Design</p>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 12,
            color: 'var(--color-muted)', letterSpacing: '0.06em',
          }}>© {new Date().getFullYear()} · All rights reserved</p>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact > div > div:nth-child(2) {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          #contact > div > div:nth-child(2) > div:last-child {
            padding: 32px 24px !important;
          }
          #contact > div > div:nth-child(2) > div:last-child > div > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
