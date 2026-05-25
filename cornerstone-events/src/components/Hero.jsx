export default function Hero() {
  return (
    <section id="hero" style={{
      position: 'relative', height: '100vh', minHeight: 700,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Background image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1800&q=85')`,
        backgroundSize: 'cover', backgroundPosition: 'center 30%',
        transform: 'scale(1.05)',
        animation: 'heroZoom 14s ease-in-out infinite alternate',
      }} />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(14,12,10,0.55) 0%, rgba(14,12,10,0.35) 50%, rgba(14,12,10,0.85) 100%)',
      }} />

      {/* Gold grain texture */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', textAlign: 'center',
        padding: '0 24px', maxWidth: 900,
      }}>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 11,
          letterSpacing: '0.45em', textTransform: 'uppercase',
          color: 'var(--color-gold)', marginBottom: 28,
          animation: 'fadeIn 1.2s ease forwards',
        }}>
          ✦ &nbsp; Healthcare & Pharma Events &nbsp; ✦
        </p>

        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 300,
          fontSize: 'clamp(52px, 8vw, 110px)',
          lineHeight: 1.02, letterSpacing: '-0.01em',
          color: 'var(--color-beige-lt)',
          animation: 'fadeUp 1s 0.2s ease forwards', opacity: 0,
        }}>
          Medical Excellence<br />
          <em style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Flawlessly Executed.</em>
        </h1>

        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 300,
          color: 'var(--color-beige)', maxWidth: 520, margin: '28px auto 44px',
          lineHeight: 1.8, letterSpacing: '0.02em',
          animation: 'fadeUp 1s 0.5s ease forwards', opacity: 0,
        }}>
          Specialized event management for doctors' conferences, CME programs, pharma product launches, and hospital engagements with precision and expertise.
        </p>

        <div style={{
          display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap',
          animation: 'fadeUp 1s 0.8s ease forwards', opacity: 0,
        }}>
          <a href="#contact" style={{
            fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            padding: '15px 36px',
            background: 'var(--color-gold)', color: 'var(--color-bg)',
            borderRadius: 'var(--radius-sm)', transition: 'all 0.25s',
          }}
            onMouseEnter={e => { e.target.style.background = 'var(--color-gold-lt)'; }}
            onMouseLeave={e => { e.target.style.background = 'var(--color-gold)'; }}
          >Plan Your Event</a>

          <a href="#services" style={{
            fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 400,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            padding: '15px 36px',
            border: '1px solid rgba(232,220,200,0.35)', color: 'var(--color-beige)',
            borderRadius: 'var(--radius-sm)', transition: 'all 0.25s',
          }}
            onMouseEnter={e => { e.target.style.borderColor = 'var(--color-beige)'; }}
            onMouseLeave={e => { e.target.style.borderColor = 'rgba(232,220,200,0.35)'; }}
          >Explore Services</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        animation: 'fadeIn 2s 1.5s ease forwards', opacity: 0,
      }}>
        <span style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--color-muted)' }}>Scroll</span>
        <div style={{
          width: 1, height: 48, background: 'linear-gradient(to bottom, var(--color-gold), transparent)',
          animation: 'scrollLine 2s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes heroZoom {
          from { transform: scale(1.05) translateY(0); }
          to   { transform: scale(1.12) translateY(-10px); }
        }
        @keyframes scrollLine {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 1; }
          50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(1); transform-origin: top; opacity: 0; }
        }
      `}</style>
    </section>
  );
}