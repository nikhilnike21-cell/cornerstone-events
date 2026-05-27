import { useState, useEffect, useRef } from 'react';

// ── Point this at your running backend ──
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

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
    } catch (err) {
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
                textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: 18,
              }}>Follow Us</p>
              <div style={{ display: 'flex', gap: 16 }}>
                {[
                  {
                    href: 'https://www.instagram.com/cornerstoneevents.in?igsh=MTk3eWV6dGNleDJ0ZA==',
                    label: 'Instagram',
                    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>,
                  },
                  {
                    href: 'https://www.linkedin.com/company/122604229/admin/dashboard/',
                    label: 'LinkedIn',
                    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
                  },
                ].map(social => (
                  <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px 20px',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--color-surface)',
                      color: 'var(--color-beige)',
                      fontFamily: 'var(--font-body)', fontSize: 12,
                      letterSpacing: '0.12em', textTransform: 'uppercase',
                      transition: 'border-color 0.25s, color 0.25s, box-shadow 0.3s, transform 0.2s',
                      cursor: 'none',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor='var(--color-gold)'; e.currentTarget.style.color='var(--color-gold)'; e.currentTarget.style.transform='translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='var(--color-border)'; e.currentTarget.style.color='var(--color-beige)'; e.currentTarget.style.transform='translateY(0)'; }}
                  >
                    {social.icon}{social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div style={{
            background: 'var(--color-surface)', border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)', padding: '48px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(40px)',
            transition: 'opacity 0.8s 0.25s var(--ease-out), transform 0.8s 0.25s var(--ease-out)',
          }}>

            {status === 'success' ? (
              /* ── Success state ── */
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  border: '1px solid var(--color-gold)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 24px', color: 'var(--color-gold)', fontSize: 22,
                  animation: 'goldPulse 2s ease-in-out infinite',
                }}>✓</div>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 300,
                  color: 'var(--color-beige-lt)', marginBottom: 12,
                }}>Message Received</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--color-muted)', marginBottom: 28 }}>
                  We'll be in touch within 24 hours. Check your inbox for a confirmation email.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  style={{
                    background: 'none', border: '1px solid var(--color-border)',
                    color: 'var(--color-muted)', borderRadius: 'var(--radius-sm)',
                    padding: '10px 24px', fontFamily: 'var(--font-body)',
                    fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
                    cursor: 'none', transition: 'border-color 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='var(--color-gold)'; e.currentTarget.style.color='var(--color-gold)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--color-border)'; e.currentTarget.style.color='var(--color-muted)'; }}
                >Send Another</button>
              </div>
            ) : (
              /* ── Form ── */
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {[
                    { name:'name',  label:'Name',  type:'text',  placeholder:'Your name' },
                    { name:'email', label:'Email', type:'email', placeholder:'your@email.com' },
                  ].map(f => (
                    <div key={f.name}>
                      <label style={{
                        display:'block', fontFamily:'var(--font-body)', fontSize:10,
                        letterSpacing:'0.3em', textTransform:'uppercase',
                        color:'var(--color-gold)', marginBottom:8,
                      }}>{f.label}</label>
                      <input
                        type={f.type} name={f.name}
                        placeholder={f.placeholder}
                        value={formData[f.name]}
                        onChange={handleChange}
                        style={inputStyle} onFocus={onFocus} onBlur={onBlur}
                        disabled={status === 'loading'}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label style={{
                    display:'block', fontFamily:'var(--font-body)', fontSize:10,
                    letterSpacing:'0.3em', textTransform:'uppercase',
                    color:'var(--color-gold)', marginBottom:8,
                  }}>Phone (Optional)</label>
                  <input
                    type="tel" name="phone" placeholder="+91 XXXXX XXXXX"
                    value={formData.phone} onChange={handleChange}
                    style={inputStyle} onFocus={onFocus} onBlur={onBlur}
                    disabled={status === 'loading'}
                  />
                </div>

                <div>
                  <label style={{
                    display:'block', fontFamily:'var(--font-body)', fontSize:10,
                    letterSpacing:'0.3em', textTransform:'uppercase',
                    color:'var(--color-gold)', marginBottom:8,
                  }}>Message</label>
                  <textarea
                    name="message" placeholder="Tell us about your event..."
                    rows={5} value={formData.message} onChange={handleChange}
                    style={{ ...inputStyle, resize:'vertical', minHeight:120 }}
                    onFocus={onFocus} onBlur={onBlur}
                    disabled={status === 'loading'}
                  />
                </div>

                {/* Error */}
                {errMsg && (
                  <p style={{
                    fontFamily:'var(--font-body)', fontSize:13,
                    color:'#e05c5c', marginTop:-8,
                  }}>{errMsg}</p>
                )}

                {/* Magnetic submit */}
                <button
                  ref={submitRef}
                  onClick={handleSubmit}
                  onMouseMove={handleSubmitMove}
                  onMouseLeave={(e) => {
                    handleSubmitLeave();
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--color-gold)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--color-gold)';
                    e.currentTarget.style.color = 'var(--color-bg)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(201,169,110,0.35)';
                  }}
                  disabled={status === 'loading'}
                  style={{
                    marginTop: 8, padding: '16px 42px',
                    background: 'transparent', border: '1px solid var(--color-gold)',
                    borderRadius: 'var(--radius-sm)', color: 'var(--color-gold)',
                    fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.35em',
                    textTransform: 'uppercase', cursor: status === 'loading' ? 'wait' : 'none',
                    transition: 'transform 0.4s var(--ease-out), background 0.25s, color 0.25s, box-shadow 0.3s',
                    alignSelf: 'flex-start', willChange: 'transform',
                    opacity: status === 'loading' ? 0.6 : 1,
                  }}
                >
                  {status === 'loading' ? 'Sending…' : 'Send Message'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer strip */}
        <div style={{
          marginTop: 100, paddingTop: 40,
          borderTop: '1px solid var(--color-border)',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: 16,
          opacity: visible ? 1 : 0, transition: 'opacity 1s 0.5s',
        }}>
          <p style={{ fontFamily:'var(--font-display)', fontSize:18, color:'var(--color-gold)', letterSpacing:'0.08em' }}>
            Cornerstone Event Design
          </p>
          <p style={{ fontFamily:'var(--font-body)', fontSize:12, color:'var(--color-muted)', letterSpacing:'0.06em' }}>
            © {new Date().getFullYear()} · All rights reserved
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact > div > div:nth-child(2) { grid-template-columns: 1fr !important; gap: 40px !important; }
          #contact > div > div:nth-child(2) > div:last-child { padding: 32px 24px !important; }
          #contact > div > div:nth-child(2) > div:last-child > div > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
