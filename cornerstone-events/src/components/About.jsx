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
              src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=900&q=80"
              alt="About Cornerstone"
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
            }}>12</div>
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
            Where Vision Meets{' '}
            <em style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Flawless Execution</em>
          </h2>

          <div style={{ width: 48, height: 1, background: 'var(--color-gold)', marginBottom: 32 }} />

          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 300,
            color: 'var(--color-beige)', lineHeight: 1.85, marginBottom: 20,
          }}>
            Founded in 2013, Cornerstone Event was born from a single belief — that extraordinary events don't happen by chance, they are crafted with intention, passion, and an obsessive eye for detail.
          </p>

          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 300,
            color: 'var(--color-beige)', lineHeight: 1.85, marginBottom: 40,
          }}>
            Our team of seasoned designers, coordinators, and experience architects have delivered over 500 events across India and beyond — each one a unique story, each one a masterpiece.
          </p>

          {/* Values */}
          {['Artistry in every detail', 'Transparent partnership', 'Seamless from concept to close'].map((v, i) => (
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