import { useState, useEffect, useRef } from 'react';
import { SERVICES } from '../data/sitedata';

function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 10;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -10;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden',
        cursor: 'none',
        border: `1px solid ${hovered ? 'var(--color-gold)' : 'var(--color-border)'}`,
        transition: 'border-color 0.35s, box-shadow 0.4s, transform 0.18s ease-out, opacity 0.8s var(--ease-out)',
        transitionDelay: `${index * 0.09}s`,
        boxShadow: hovered ? '0 0 60px rgba(201,169,110,0.18), 0 24px 60px rgba(0,0,0,0.5)' : 'none',
        height: 420,
        transform: visible
          ? hovered
            ? `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(-8px) scale(1.02)`
            : 'perspective(900px) rotateX(0) rotateY(0) translateY(0) scale(1)'
          : 'translateY(40px)',
        opacity: visible ? 1 : 0,
        willChange: 'transform',
      }}
    >
      {/* Image */}
      <img
        src={service.image}
        alt={service.title}
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform 0.65s var(--ease-out)',
        }}
      />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: hovered
          ? 'linear-gradient(to top, rgba(14,12,10,0.97) 48%, rgba(14,12,10,0.44) 100%)'
          : 'linear-gradient(to top, rgba(14,12,10,0.92) 35%, rgba(14,12,10,0.18) 100%)',
        transition: 'background 0.4s',
      }} />

      {/* Gold shimmer edge on hover */}
      {hovered && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(201,169,110,0.07) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} />
      )}

      {/* Content */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '32px 28px',
      }}>
        <div style={{
          fontSize: 28, marginBottom: 10,
          display: 'inline-block',
          transform: hovered ? 'translateY(-4px) scale(1.15)' : 'translateY(0) scale(1)',
          transition: 'transform 0.4s var(--ease-spring)',
          filter: hovered ? 'drop-shadow(0 0 8px rgba(201,169,110,0.5))' : 'none',
        }}>{service.icon}</div>

        <h3 style={{
          fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 400,
          color: 'var(--color-beige-lt)', marginBottom: 10,
          transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
          transition: 'transform 0.4s var(--ease-out)',
        }}>{service.title}</h3>

        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: 300,
          color: 'var(--color-beige)', lineHeight: 1.65,
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(14px)',
          transition: 'opacity 0.4s var(--ease-out), transform 0.4s var(--ease-out)',
          maxHeight: hovered ? 200 : 0,
          overflow: 'hidden',
        }}>{service.description}</p>

        <div style={{
          marginTop: 18, display: 'flex', alignItems: 'center', gap: 8,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s 0.12s',
        }}>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.25em',
            textTransform: 'uppercase', color: 'var(--color-gold)',
          }}>Learn More</span>
          <span style={{
            color: 'var(--color-gold)', fontSize: 16,
            transform: hovered ? 'translateX(4px)' : 'translateX(0)',
            transition: 'transform 0.3s',
            display: 'inline-block',
          }}>→</span>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const titleRef = useRef(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTitleVisible(true); obs.unobserve(el); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="services" style={{ padding: '120px 40px', background: 'var(--color-bg)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>

        {/* Header */}
        <div
          ref={titleRef}
          style={{ marginBottom: 72 }}
        >
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.45em',
            textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: 16,
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out)',
          }}>What We Specialize In</p>

          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(38px, 5vw, 58px)',
            fontWeight: 300, color: 'var(--color-beige-lt)',
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s 0.1s var(--ease-out), transform 0.7s 0.1s var(--ease-out)',
          }}>Healthcare & Pharma Solutions</h2>

          <div style={{
            height: 1, background: 'var(--color-gold)',
            marginTop: 24,
            width: titleVisible ? 60 : 0,
            transition: 'width 0.8s 0.3s var(--ease-out)',
          }} />
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}