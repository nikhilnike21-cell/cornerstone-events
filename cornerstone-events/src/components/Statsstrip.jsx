import { useEffect, useRef, useState } from 'react';
import { STATS } from '../data/sitedata';

function parseValue(raw) {
  const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
  const suffix = raw.replace(/[0-9.]/g, '');
  return { num, suffix };
}

function AnimatedCounter({ value, isVisible }) {
  const { num, suffix } = parseValue(value);
  const [display, setDisplay] = useState(0);
  const [popped, setPopped] = useState(false);
  const raf = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (!isVisible || started.current) return;
    started.current = true;

    const duration = 1800;
    const start = performance.now();

    const ease = (t) => 1 - Math.pow(1 - t, 3); // ease-out cubic

    const tick = (now) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const current = ease(t) * num;

      setDisplay(
        Number.isInteger(num) ? Math.round(current) : parseFloat(current.toFixed(1))
      );

      if (t < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setDisplay(num);
        // pop animation at end
        setPopped(true);
        setTimeout(() => setPopped(false), 300);
      }
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [isVisible, num]);

  return (
    <span style={{
      display: 'inline-block',
      transition: 'transform 0.3s var(--ease-spring)',
      transform: popped ? 'scale(1.14)' : 'scale(1)',
    }}>
      {display}{suffix}
    </span>
  );
}

export default function StatsStrip() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{
      background: 'var(--color-surface)',
      borderTop: '1px solid var(--color-border)',
      borderBottom: '1px solid var(--color-border)',
      padding: '56px 40px',
      position: 'relative', overflow: 'hidden',
    }}>

      {/* Subtle ambient glow behind stats */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 600, height: 200,
        background: 'radial-gradient(ellipse, rgba(201,169,110,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div
        ref={ref}
        style={{
          maxWidth: 1240, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 24, position: 'relative',
        }}
      >
        {STATS.map((stat, i) => (
          <div
            key={i}
            style={{
              textAlign: 'center',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transition: `opacity 0.7s ${0.1 * i}s var(--ease-out), transform 0.7s ${0.1 * i}s var(--ease-out)`,
            }}
          >
            {/* Gold line accent above each stat */}
            <div style={{
              width: visible ? 28 : 0,
              height: 1,
              background: 'var(--color-gold)',
              margin: '0 auto 16px',
              transition: `width 0.6s ${0.15 + 0.1 * i}s var(--ease-out)`,
              opacity: 0.7,
            }} />

            <div style={{
              fontFamily: 'var(--font-display)', fontStyle: 'italic',
              fontSize: 'clamp(42px, 5vw, 62px)', fontWeight: 300,
              color: 'var(--color-gold)', lineHeight: 1,
              filter: visible ? 'drop-shadow(0 0 18px rgba(201,169,110,0.28))' : 'none',
              transition: 'filter 0.8s',
            }}>
              <AnimatedCounter value={stat.value} isVisible={visible} />
            </div>

            <div style={{
              fontFamily: 'var(--font-body)', fontSize: 11,
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color: 'var(--color-muted)', marginTop: 10,
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