import { useState } from 'react';
import { SERVICES } from '../data/sitedata';

export default function Services() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="services" style={{ padding: '120px 40px', background: 'var(--color-bg)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 72 }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.45em',
            textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: 16,
          }}>What We Do</p>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(38px, 5vw, 58px)',
            fontWeight: 300, color: 'var(--color-beige-lt)',
          }}>Services We Offer</h2>
          <div style={{
            width: 60, height: 1, background: 'var(--color-gold)',
            marginTop: 24, marginLeft: 0,
          }} />
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {SERVICES.map(service => (
            <div
              key={service.id}
              onMouseEnter={() => setHovered(service.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'relative', borderRadius: 'var(--radius-md)',
                overflow: 'hidden', cursor: 'pointer',
                border: '1px solid var(--color-border)',
                transition: 'border-color 0.3s, box-shadow 0.3s',
                borderColor: hovered === service.id ? 'var(--color-gold)' : 'var(--color-border)',
                boxShadow: hovered === service.id ? 'var(--shadow-glow)' : 'none',
                height: 420,
              }}
            >
              {/* Image */}
              <img
                src={service.image}
                alt={service.title}
                style={{
                  position: 'absolute', inset: 0, width: '100%', height: '100%',
                  objectFit: 'cover',
                  transform: hovered === service.id ? 'scale(1.07)' : 'scale(1)',
                  transition: 'transform 0.6s var(--ease-out)',
                }}
              />

              {/* Overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: hovered === service.id
                  ? 'linear-gradient(to top, rgba(14,12,10,0.97) 45%, rgba(14,12,10,0.5) 100%)'
                  : 'linear-gradient(to top, rgba(14,12,10,0.92) 35%, rgba(14,12,10,0.2) 100%)',
                transition: 'background 0.4s',
              }} />

              {/* Content */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '32px 28px',
              }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{service.icon}</div>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 400,
                  color: 'var(--color-beige-lt)', marginBottom: 10,
                }}>{service.title}</h3>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: 300,
                  color: 'var(--color-beige)', lineHeight: 1.65,
                  opacity: hovered === service.id ? 1 : 0,
                  transform: hovered === service.id ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'all 0.4s var(--ease-out)',
                  maxHeight: hovered === service.id ? 200 : 0,
                  overflow: 'hidden',
                }}>{service.description}</p>
                <div style={{
                  marginTop: 20, display: 'flex', alignItems: 'center', gap: 8,
                  opacity: hovered === service.id ? 1 : 0,
                  transition: 'opacity 0.4s 0.1s',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.25em',
                    textTransform: 'uppercase', color: 'var(--color-gold)',
                  }}>Learn More</span>
                  <span style={{ color: 'var(--color-gold)', fontSize: 16 }}>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}