import { useState } from 'react';
import { GALLERY_IMAGES } from '../data/sitedata';

export default function Gallery() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="gallery" style={{ padding: '120px 40px', background: 'var(--color-bg)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ marginBottom: 72, textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.45em',
            textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: 16,
          }}>Our Work</p>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(38px, 5vw, 58px)',
            fontWeight: 300, color: 'var(--color-beige-lt)',
          }}>A Glimpse of the Magic</h2>
        </div>

        {/* Masonry-ish grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'auto',
          gap: 12,
        }}>
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={img.id}
              onClick={() => setSelected(img)}
              style={{
                borderRadius: 'var(--radius-sm)', overflow: 'hidden',
                cursor: 'pointer', position: 'relative',
                height: i === 0 || i === 4 ? 340 : 260,
                gridColumn: i === 0 ? 'span 2' : 'span 1',
              }}
            >
              <img
                src={img.src}
                alt={img.label}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  transition: 'transform 0.5s var(--ease-out)',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(14,12,10,0.6) 0%, transparent 60%)',
                display: 'flex', alignItems: 'flex-end', padding: 20,
              }}>
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em',
                  textTransform: 'uppercase', color: 'var(--color-beige)',
                }}>{img.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 2000,
            background: 'rgba(14,12,10,0.95)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'fadeIn 0.3s ease',
          }}
        >
          <img
            src={selected.src}
            alt={selected.label}
            style={{
              maxWidth: '88vw', maxHeight: '85vh',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.8)',
              border: '1px solid var(--color-border)',
            }}
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={() => setSelected(null)}
            style={{
              position: 'absolute', top: 24, right: 32,
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--color-muted)', fontSize: 28, lineHeight: 1,
            }}
          >✕</button>
          <div style={{
            position: 'absolute', bottom: 32,
            fontFamily: 'var(--font-body)', fontSize: 12,
            letterSpacing: '0.25em', textTransform: 'uppercase',
            color: 'var(--color-gold)',
          }}>{selected.label}</div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          #gallery .gallery-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 480px) {
          #gallery .gallery-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}