export default function About() {
  return (
    <section id="about" style={{
      padding: '120px 40px',
      background: 'var(--color-surface)',
    }}>
      <div style={{
        maxWidth: 1240, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80,
        alignItems: 'center',
      }}>
        {/* Image side */}
        <div style={{ position: 'relative' }}>
          <div style={{
            borderRadius: 'var(--radius-lg)', overflow: 'hidden',
            height: 560, boxShadow: 'var(--shadow-card)',
          }}>
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80"
              alt="Medical Events"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          {/* Floating badge */}
          <div style={{
            position: 'absolute', bottom: -28, right: -28,
            background: 'var(--color-surface2)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '24px 28px', textAlign: 'center',
            boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
          }}>
            <div style={{
              fontFamily: 'var(--font-display)', fontStyle: 'italic',
              fontSize: 52, color: 'var(--color-gold)', lineHeight: 1,
            }}>15</div>
            <div style={{
              fontFamily: 'var(--font-body)', fontSize: 10,
              letterSpacing: '0.3em', textTransform: 'uppercase',
              color: 'var(--color-muted)', marginTop: 4,
            }}>Years of Excellence</div>
          </div>
          {/* Decorative line */}
          <div style={{
            position: 'absolute', top: -20, left: -20,
            width: 80, height: 80,
            border: '1px solid var(--color-gold)',
            borderRadius: 'var(--radius-sm)', opacity: 0.4,
          }} />
        </div>

        {/* Text side */}
        <div>
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
            <em style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Redefined</em>
          </h2>

          <div style={{ width: 48, height: 1, background: 'var(--color-gold)', marginBottom: 32 }} />

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
            Our team has executed 400+ medical conferences, CME programs, pharma launches, and hospital engagement programs across 50+ cities. Every event reflects our commitment to regulatory excellence, clinical credibility, and seamless execution.
          </p>

          {/* Values */}
          {[
            'Regulatory Compliance Expertise',
            'Clinical Credibility & Standards',
            'Seamless Multi-City Coordination'
          ].map((v, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14,
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: '50%',
                background: 'var(--color-gold)', flexShrink: 0,
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
          #about .float-badge { display: none; }
        }
      `}</style>
    </section>
  );
}