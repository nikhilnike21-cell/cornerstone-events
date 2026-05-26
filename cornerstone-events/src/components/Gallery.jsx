import { useState, useEffect, useRef } from 'react';
import { GALLERY_IMAGES } from '../data/sitedata';

export default function Gallery() {
  const [selected, setSelected] = useState(null);
  const [lightboxReady, setLightboxReady] = useState(false);
  const headerRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const gridRef = useRef(null);
  const [gridVisible, setGridVisible] = useState(false);

  useEffect(() => {
    const obs = (el, setter) => {
      if (!el) return;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { setter(true); o.unobserve(el); } },
        { threshold: 0.15 }
      );
      o.observe(el);
      return o;
    };
    const o1 = obs(headerRef.current, setHeaderVisible);
    const o2 = obs(gridRef.current,   setGridVisible);
    return () => { o1?.disconnect(); o2?.disconnect(); };
  }, []);

  // Lightbox open animation
  const openLightbox = (img) => {
    setSelected(img);
    setLightboxReady(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setLightboxReady(true)));
  };

  const closeLightbox = () => {
    setLightboxReady(false);
    setTimeout(() => setSelected(null), 300);
  };

  return (
    <section id="gallery" style={{ padding: '120px 40px', background: 'var(--color-bg)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>

        {/* Header */}
        <div
          ref={headerRef}
          style={{ marginBottom: 72, textAlign: 'center' }}
        >
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.45em',
            textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: 16,
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out)',
          }}>Our Portfolio</p>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(38px, 5vw, 58px)',
            fontWeight: 300, color: 'var(--color-beige-lt)',
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s 0.1s var(--ease-out), transform 0.7s 0.1s var(--ease-out)',
          }}>Events We've Orchestrated</h2>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'auto',
            gap: 12,
          }}
        >
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={img.id}
              onClick={() => openLightbox(img)}
              style={{
                borderRadius: 'var(--radius-sm)', overflow: 'hidden',
                cursor: 'none', position: 'relative',
                height: i === 0 || i === 4 ? 340 : 260,
                gridColumn: i === 0 ? 'span 2' : 'span 1',
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.96)',
                transition: `opacity 0.7s ${i * 0.08}s var(--ease-out), transform 0.7s ${i * 0.08}s var(--ease-out)`,
              }}
            >
              <img
                src={img.src}
                alt={img.label}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  transition: 'transform 0.6s var(--ease-out)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.07)';
                  // show glow on parent
                  e.currentTarget.parentElement.style.boxShadow = '0 0 40px rgba(201,169,110,0.15)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.parentElement.style.boxShadow = 'none';
                }}
              />
              {/* Gradient + label */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(14,12,10,0.65) 0%, transparent 55%)',
                display: 'flex', alignItems: 'flex-end', padding: 20,
                pointerEvents: 'none',
              }}>
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em',
                  textTransform: 'uppercase', color: 'var(--color-beige)',
                }}>{img.label}</span>
              </div>

              {/* Hover border glow */}
              <div style={{
                position: 'absolute', inset: 0,
                border: '1px solid rgba(201,169,110,0)',
                borderRadius: 'var(--radius-sm)',
                transition: 'border-color 0.3s',
                pointerEvents: 'none',
              }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {selected && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed', inset: 0, zIndex: 2000,
            background: `rgba(14,12,10,${lightboxReady ? 0.96 : 0})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.3s ease',
            backdropFilter: lightboxReady ? 'blur(8px)' : 'blur(0px)',
            WebkitBackdropFilter: lightboxReady ? 'blur(8px)' : 'blur(0px)',
          }}
        >
          <img
            src={selected.src}
            alt={selected.label}
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '88vw', maxHeight: '82vh',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.8)',
              border: '1px solid var(--color-border)',
              opacity: lightboxReady ? 1 : 0,
              transform: lightboxReady ? 'scale(1) translateY(0)' : 'scale(0.94) translateY(20px)',
              transition: 'opacity 0.35s var(--ease-out), transform 0.35s var(--ease-out)',
            }}
          />
          <button
            onClick={closeLightbox}
            style={{
              position: 'absolute', top: 28, right: 36,
              background: 'rgba(255,255,255,0.06)', border: '1px solid var(--color-border)',
              borderRadius: '50%', width: 44, height: 44,
              cursor: 'none', color: 'var(--color-muted)',
              fontSize: 18, lineHeight: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s, color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--color-gold)';
              e.currentTarget.style.color = 'var(--color-bg)';
              e.currentTarget.style.borderColor = 'var(--color-gold)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
              e.currentTarget.style.color = 'var(--color-muted)';
              e.currentTarget.style.borderColor = 'var(--color-border)';
            }}
          >✕</button>

          <div style={{
            position: 'absolute', bottom: 36,
            fontFamily: 'var(--font-body)', fontSize: 12,
            letterSpacing: '0.25em', textTransform: 'uppercase',
            color: 'var(--color-gold)',
            opacity: lightboxReady ? 1 : 0,
            transition: 'opacity 0.4s 0.2s',
          }}>{selected.label}</div>
        </div>
      )}
    </section>
  );
}