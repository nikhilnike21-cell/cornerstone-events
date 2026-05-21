import { PACKAGES } from '../data/sitedata';

export default function Packages() {
  return (
    <section id="packages" style={{
      padding: '120px 40px',
      background: 'var(--color-surface)',
    }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ marginBottom: 72, textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.45em',
            textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: 16,
          }}>Pricing</p>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(38px, 5vw, 58px)',
            fontWeight: 300, color: 'var(--color-beige-lt)',
          }}>Choose Your Experience</h2>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
        }}>
          {PACKAGES.map(pkg => (
            <div
              key={pkg.id}
              style={{
                background: pkg.highlight ? 'var(--color-surface2)' : 'var(--color-bg)',
                border: `1px solid ${pkg.highlight ? 'var(--color-gold)' : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-md)', padding: '40px 36px',
                position: 'relative', overflow: 'hidden',
                boxShadow: pkg.highlight ? 'var(--shadow-glow)' : 'none',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                if (!pkg.highlight) e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                if (!pkg.highlight) e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {pkg.highlight && (
                <div style={{
                  position: 'absolute', top: 16, right: 16,
                  fontFamily: 'var(--font-body)', fontSize: 9,
                  letterSpacing: '0.28em', textTransform: 'uppercase',
                  background: 'var(--color-gold)', color: 'var(--color-bg)',
                  padding: '4px 12px', borderRadius: 20,
                }}>Most Popular</div>
              )}

              {/* Decorative circle */}
              {pkg.highlight && (
                <div style={{
                  position: 'absolute', top: -60, right: -60,
                  width: 200, height: 200, borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)',
                }} />
              )}

              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.35em',
                textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: 8,
              }}>{pkg.tagline}</p>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 400,
                color: pkg.highlight ? 'var(--color-gold)' : 'var(--color-beige-lt)',
                marginBottom: 4,
              }}>{pkg.name}</h3>

              <div style={{
                width: 40, height: 1,
                background: pkg.highlight ? 'var(--color-gold)' : 'var(--color-border)',
                margin: '20px 0',
              }} />

              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 42,
                fontStyle: 'italic', color: 'var(--color-gold)',
                marginBottom: 28,
              }}>{pkg.price}</div>

              <ul style={{ listStyle: 'none', marginBottom: 36, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {pkg.features.map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <span style={{
                      color: 'var(--color-gold)', fontSize: 14, flexShrink: 0, marginTop: 1,
                    }}>✓</span>
                    <span style={{
                      fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: 300,
                      color: 'var(--color-beige)', lineHeight: 1.5,
                    }}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                style={{
                  display: 'block', width: '100%', textAlign: 'center',
                  fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500,
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                  padding: '14px 0',
                  background: pkg.highlight ? 'var(--color-gold)' : 'transparent',
                  color: pkg.highlight ? 'var(--color-bg)' : 'var(--color-gold)',
                  border: `1px solid var(--color-gold)`,
                  borderRadius: 'var(--radius-sm)',
                  transition: 'all 0.25s',
                  boxSizing: 'border-box',
                }}
                onMouseEnter={e => {
                  e.target.style.background = 'var(--color-gold-lt)';
                  e.target.style.color = 'var(--color-bg)';
                }}
                onMouseLeave={e => {
                  e.target.style.background = pkg.highlight ? 'var(--color-gold)' : 'transparent';
                  e.target.style.color = pkg.highlight ? 'var(--color-bg)' : 'var(--color-gold)';
                }}
              >Get Started</a>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #packages > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}