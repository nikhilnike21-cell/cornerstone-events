import { useEffect, useRef, useState } from 'react';

function MagneticButton({ href, children, filled = false, style: extraStyle = {} }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const btn = ref.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top  - rect.height / 2;
    btn.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
  };

  const handleLeave = () => {
    const btn = ref.current;
    if (!btn) return;
    btn.style.transform = 'translate(0, 0)';
  };

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      
      style={{
        display: 'inline-block',
        fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500,
        letterSpacing: '0.22em', textTransform: 'uppercase',
        padding: '15px 38px',
        background: filled ? 'var(--color-gold)' : 'transparent',
        color: filled ? 'var(--color-bg)' : 'var(--color-beige)',
        border: filled ? 'none' : '1px solid rgba(232,220,200,0.35)',
        borderRadius: 'var(--radius-sm)',
        transition: 'transform 0.4s var(--ease-out), background 0.25s, color 0.25s, border-color 0.25s, box-shadow 0.3s',
        cursor: 'none',
        ...extraStyle,
      }}
      onMouseEnter={e => {
        if (filled) {
          e.currentTarget.style.background = 'var(--color-gold-lt)';
          e.currentTarget.style.boxShadow = '0 8px 40px rgba(201,169,110,0.4)';
        } else {
          e.currentTarget.style.borderColor = 'var(--color-beige)';
          e.currentTarget.style.background = 'rgba(232,220,200,0.05)';
        }
      }}
      onMouseLeave={e => {
        if (filled) {
          e.currentTarget.style.background = 'var(--color-gold)';
          e.currentTarget.style.boxShadow = 'none';
        } else {
          e.currentTarget.style.borderColor = 'rgba(232,220,200,0.35)';
          e.currentTarget.style.background = 'transparent';
        }
        handleLeave();
      }}
    >
      {children}
    </a>
  );
}

export default function Hero() {
  const bgRef     = useRef(null);
  const contentRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  // Parallax on scroll
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Subtle mouse parallax on hero content
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const handleMove = (e) => {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      el.style.transform = `translate(${dx * -8}px, ${dy * -6}px)`;
    };
    const handleLeave = () => { el.style.transform = 'translate(0,0)'; };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <section id="hero" style={{
      position: 'relative', height: '100vh', minHeight: 700,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>

      {/* ── Parallax background ── */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute', inset: '-10%',
          backgroundImage: `url('/Homepage.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          transform: `scale(1.12) translateY(${scrollY * 0.22}px)`,
          transition: 'transform 0.05s linear',
          willChange: 'transform',
          animation: 'heroZoom 8s ease-in-out infinite alternate',
        }}
      />

      {/* ── Gradient overlay ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(14,12,10,0.60) 0%, rgba(14,12,10,0.38) 45%, rgba(14,12,10,0.90) 100%)',
      }} />

      {/* ── Noise grain ── */}
      <div className="noise-overlay" />

      {/* ── Ambient floating orbs ── */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[
          { w: 420, h: 420, top: '8%',  left: '12%',  dur: '18s', delay: '0s',   anim: 'floatA', opacity: 0.055 },
          { w: 320, h: 320, top: '55%', left: '72%',  dur: '22s', delay: '-6s',  anim: 'floatB', opacity: 0.045 },
          { w: 260, h: 260, top: '70%', left: '18%',  dur: '26s', delay: '-12s', anim: 'floatC', opacity: 0.035 },
          { w: 180, h: 180, top: '20%', left: '80%',  dur: '20s', delay: '-4s',  anim: 'floatA', opacity: 0.04  },
          { w: 140, h: 140, top: '40%', left: '45%',  dur: '16s', delay: '-9s',  anim: 'floatB', opacity: 0.03  },
        ].map((orb, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: orb.w, height: orb.h,
            top: orb.top, left: orb.left,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(201,169,110,${orb.opacity * 2.5}) 0%, rgba(201,169,110,${orb.opacity}) 40%, transparent 70%)`,
            animation: `${orb.anim} ${orb.dur} ease-in-out ${orb.delay} infinite`,
            filter: 'blur(1px)',
          }} />
        ))}

        {/* Decorative geometric ring */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, height: 600,
          border: '1px solid rgba(201,169,110,0.06)',
          borderRadius: '50%',
          animation: 'rotateSlow 60s linear infinite',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 820, height: 820,
          border: '1px solid rgba(201,169,110,0.03)',
          borderRadius: '50%',
          animation: 'rotateSlow 90s linear infinite reverse',
        }} />
      </div>

      {/* ── Main content ── */}
      <div
        ref={contentRef}
        style={{
          position: 'relative', textAlign: 'center',
          padding: '0 24px', maxWidth: 920,
          transition: 'transform 0.6s var(--ease-out)',
          willChange: 'transform',
        }}
      >
        {/* Eyebrow */}
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 11,
          letterSpacing: '0.45em', textTransform: 'uppercase',
          color: 'var(--color-gold)', marginBottom: 28,
          animation: 'fadeIn 1.4s ease forwards',
          opacity: 0,
        }}>
          ✦ &nbsp; Corporate . Healthcare . Pharma Events &nbsp; ✦
        </p>

        {/* Headline */}
        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 300,
          fontSize: 'clamp(52px, 8vw, 112px)',
          lineHeight: 1.02, letterSpacing: '-0.01em',
          color: 'var(--color-beige-lt)',
          animation: 'fadeUp 1s 0.25s ease forwards', opacity: 0,
        }}>
          Excellence<br />
          <em
            className="shimmer-text"
            style={{ fontStyle: 'italic' }}
          >
            Flawlessly Executed.
          </em>
        </h1>

        {/* Animated divider */}
        <div style={{
          width: 48, height: 1, margin: '30px auto',
          background: 'var(--color-gold)',
          animation: 'lineExpand 1.2s 0.9s var(--ease-out) forwards',
          transformOrigin: 'left center',
          opacity: 0,
          animationFillMode: 'forwards',
        }}>
          <style>{`
            @keyframes lineExpand { from { width: 0; opacity: 0; } to { width: 48px; opacity: 1; } }
          `}</style>
        </div>

        {/* Subtext */}
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 300,
          color: 'var(--color-beige)', maxWidth: 520, margin: '0 auto 44px',
          lineHeight: 1.85, letterSpacing: '0.02em',
          animation: 'fadeUp 1s 0.55s ease forwards', opacity: 0,
        }}>
          Specialized event management for corporates, doctors' conferences, CME programs, pharma product launches, and hospital engagements — precision you can trust.
        </p>

        {/* CTA buttons */}
        <div style={{
          display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap',
          animation: 'fadeUp 1s 0.85s ease forwards', opacity: 0,
        }}>
          <MagneticButton href="#contact" filled>Plan Your Event</MagneticButton>
          <MagneticButton href="#services">Explore Services</MagneticButton>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div style={{
        position: 'absolute', bottom: 36, left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        animation: 'fadeIn 2s 2s ease forwards', opacity: 0,
      }}>
        <span style={{
          fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase',
          color: 'var(--color-muted)',
        }}>Scroll</span>
        <div style={{
          width: 1, height: 52,
          background: 'linear-gradient(to bottom, var(--color-gold), transparent)',
          animation: 'scrollLine 2.2s ease-in-out infinite',
        }} />
      </div>
    </section>
  );
}