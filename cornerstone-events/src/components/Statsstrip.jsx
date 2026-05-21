import { STATS } from '../data/sitedata';

export default function StatsStrip() {
  return (
    <section style={{
      background: 'var(--color-surface)',
      borderTop: '1px solid var(--color-border)',
      borderBottom: '1px solid var(--color-border)',
      padding: '48px 40px',
    }}>
      <div style={{
        maxWidth: 1240, margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 24,
      }}>
        {STATS.map((stat, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-display)', fontStyle: 'italic',
              fontSize: 'clamp(40px, 5vw, 60px)', fontWeight: 300,
              color: 'var(--color-gold)', lineHeight: 1,
            }}>{stat.value}</div>
            <div style={{
              fontFamily: 'var(--font-body)', fontSize: 11,
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color: 'var(--color-muted)', marginTop: 8,
            }}>{stat.label}</div>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 600px) {
          section > div { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </section>
  );
}