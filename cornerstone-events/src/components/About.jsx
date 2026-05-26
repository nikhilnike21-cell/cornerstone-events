import { useEffect, useRef, useState } from 'react';

export default function About() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const values = [
    'Regulatory Compliance Expertise',
    'Clinical Credibility & Standards',
    'Seamless Multi-City Coordination',
  ];

  return (
    <section id="about" style={{ padding: '120px 40px', background: 'var(--color-surface)', overflow: 'hidden' }}>
      <div
        ref={ref}
        style={{
          maxWidth: 1240, margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80,
          alignItems: 'center',
        }}
        className="grid-about"
      >

        {/* ── Image side ── */}
        <div style={{
          position: 'relative',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(-60px)',
          transition: 'opacity 1s var(--ease-out), transform 1s var(--ease-out)',
        }}>
          <div style={{
            borderRadius: 'var(--radius-lg)', overflow: 'hidden',
            height: 560, boxShadow: 'var(--shadow-card)',
            position: 'relative',
          }}>
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80"
              alt="Medical Events"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Overlay shimmer on image */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, rgba(201,169,110,0.06) 0%, transparent 60%)',
              pointerEvents: 'none',
            }} />
          </div>

          {/* Floating badge — pulses on entry */}
          <div
            className="float-badge"
            style={{
              position: 'absolute', bottom: -28, right: -28,
              background: 'var(--color-surface2)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '24px 28px', textAlign: 'center',
              boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
              animation: visible ? 'goldPulse 3s 1.2s ease-in-out infinite' : 'none',
              transition: 'opacity 0.8s 0.5s',
              opacity: visible ? 1 : 0,
            }}
          >
            <div style={{
              fontFamily: 'var(--font-display)', fontStyle: 'italic',
              fontSize: 52, color: 'var(--color-gold)', lineHeight: 1,
              filter: 'drop-shadow(0 0 12px rgba(201,169,110,0.3))',
            }}>5+</div>
            <div style={{
              fontFamily: 'var(--font-body)', fontSize: 10,
              letterSpacing: '0.3em', textTransform: 'uppercase',
              color: 'var(--color-muted)', marginTop: 4,
            }}>Years of Excellence</div>
          </div>

          {/* Decorative corner frame */}
          <div style={{
            position: 'absolute', top: -20, left: -20,
            width: 80, height: 80,
            border: '1px solid var(--color-gold)',
            borderRadius: 'var(--radius-sm)',
            opacity: visible ? 0.4 : 0,
            transition: 'opacity 1s 0.6s',
          }} />
          <div style={{
            position: 'absolute', top: -14, left: -14,
            width: 50, height: 50,
            border: '1px solid var(--color-gold)',
            borderRadius: 'var(--radius-sm)',
            opacity: visible ? 0.2 : 0,
            transition: 'opacity 1s 0.8s',
          }} />
        </div>

        {/* ── Text side ── */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(60px)',
          transition: 'opacity 1s 0.15s var(--ease-out), transform 1s 0.15s var(--ease-out)',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.45em',
            textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: 20,
          }}>Our Story</p>

          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 4.5vw, 52px)',
            fontWeight: 300, color: 'var(--color-beige-lt)', lineHeight: 1.15,
            marginBottom: 28,
          }}>
            Healthcare Events{' '}
            <em className="shimmer-text" style={{ fontStyle: 'italic' }}>Redefined</em>
          </h2>

          {/* Animated gold divider */}
          <div style={{
            width: visible ? 48 : 0, height: 1,
            background: 'var(--color-gold)', marginBottom: 32,
            transition: 'width 0.8s 0.4s var(--ease-out)',
          }} />

          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 300,
            color: 'var(--color-beige)', lineHeight: 1.85, marginBottom: 20,
          }}>
            Founded with a deep understanding of the healthcare and pharmaceutical industry, we specialize in creating impactful events that bring doctors, medical professionals, and industry leaders together.
          </p>

          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 300,
            color: 'var(--color-beige)', lineHeight: 1.85, marginBottom: 40,
          }}>
            Our team has executed 50+ corporate events, medical conferences, CME programs, pharma launches, and hospital engagement programs across 5+ cities — every event reflecting our commitment to regulatory excellence and seamless execution.
          </p>

          {/* Values — stagger in */}
          {values.map((v, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(20px)',
              transition: `opacity 0.6s ${0.6 + i * 0.12}s var(--ease-out), transform 0.6s ${0.6 + i * 0.12}s var(--ease-out)`,
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: '50%',
                background: 'var(--color-gold)', flexShrink: 0,
                boxShadow: '0 0 8px rgba(201,169,110,0.5)',
              }} />
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: 14,
                color: 'var(--color-beige)', letterSpacing: '0.02em',
              }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #about .grid-about { grid-template-columns: 1fr !important; }
          .float-badge { display: none; }
        }
      `}</style>
    </section>
  );
}