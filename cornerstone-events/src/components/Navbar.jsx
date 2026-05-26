import { useState, useEffect, useRef } from 'react';
import { NAV_LINKS } from '../data/sitedata';

function MagneticCTA({ children, href }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const btn = ref.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top  - rect.height / 2;
    btn.style.transform = `translate(${x * 0.32}px, ${y * 0.32}px)`;
  };

  const handleLeave = (e) => {
    const btn = ref.current;
    if (btn) btn.style.transform = 'translate(0, 0)';
    e.currentTarget.style.background = 'transparent';
    e.currentTarget.style.color = 'var(--color-gold)';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'var(--color-gold)';
        e.currentTarget.style.color = 'var(--color-bg)';
        e.currentTarget.style.boxShadow = '0 6px 30px rgba(201,169,110,0.35)';
      }}
      style={{
        fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500,
        letterSpacing: '0.22em', textTransform: 'uppercase',
        padding: '10px 26px',
        border: '1px solid var(--color-gold)',
        color: 'var(--color-gold)',
        background: 'transparent',
        borderRadius: 'var(--radius-sm)',
        cursor: 'none',
        transition: 'transform 0.4s var(--ease-out), background 0.22s, color 0.22s, box-shadow 0.3s',
        display: 'inline-block',
      }}
    >{children}</a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [open, setOpen]           = useState(false);
  const [active, setActive]       = useState('');
  const [progress, setProgress]   = useState(0);
  const [visible, setVisible]     = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;

      setScrolled(y > 60);
      setProgress((y / max) * 100);

      // Hide navbar when scrolling down fast, show when scrolling up
      if (y > lastY.current + 8 && y > 400) setVisible(false);
      else if (y < lastY.current - 4) setVisible(true);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setActive(href);
    setOpen(false);
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? '13px 40px' : '24px 40px',
        background: scrolled
          ? 'rgba(14,12,10,0.82)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(46,39,32,0.7)' : '1px solid transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'padding 0.4s var(--ease-out), background 0.4s, transform 0.4s var(--ease-out)',
        transform: visible ? 'translateY(0)' : 'translateY(-110%)',
        willChange: 'transform',
      }}>

        {/* Scroll progress bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0,
          height: '1.5px',
          width: `${progress}%`,
          background: 'linear-gradient(to right, var(--color-gold), var(--color-gold-lt))',
          transition: 'width 0.1s linear',
          boxShadow: '0 0 8px rgba(201,169,110,0.6)',
        }} />

        {/* Logo */}
        <a href="#" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600,
            letterSpacing: '0.06em', color: 'var(--color-gold)',
            transition: 'text-shadow 0.3s',
          }}
            onMouseEnter={e => e.currentTarget.style.textShadow = '0 0 20px rgba(201,169,110,0.5)'}
            onMouseLeave={e => e.currentTarget.style.textShadow = 'none'}
          >CORNERSTONE</span>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: 9.5, fontWeight: 400,
            letterSpacing: '0.35em', textTransform: 'uppercase',
            color: 'var(--color-muted)', marginTop: -2,
          }}>EVENT DESIGN</span>
        </a>

        {/* Desktop Links */}
        <ul style={{ display: 'flex', gap: 36, listStyle: 'none' }} className="nav-desktop">
          {NAV_LINKS.map((link, i) => (
            <li key={link.href} style={{ animationDelay: `${i * 0.06}s` }}>
              <a
                href={link.href}
                onClick={() => handleNav(link.href)}
                style={{
                  fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 400,
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: active === link.href ? 'var(--color-gold)' : 'var(--color-muted)',
                  transition: 'color 0.2s',
                  paddingBottom: 3,
                  position: 'relative',
                  cursor: 'none',
                }}
                onMouseEnter={e => {
                  if (active !== link.href) e.target.style.color = 'var(--color-beige)';
                }}
                onMouseLeave={e => {
                  if (active !== link.href) e.target.style.color = 'var(--color-muted)';
                }}
              >
                {link.label}
                {/* Active underline */}
                <span style={{
                  position: 'absolute', bottom: 0, left: 0,
                  width: active === link.href ? '100%' : '0%',
                  height: '1px', background: 'var(--color-gold)',
                  transition: 'width 0.3s var(--ease-out)',
                }} />
              </a>
            </li>
          ))}
        </ul>

        {/* Magnetic CTA */}
        <div className="nav-cta">
          <MagneticCTA href="#contact">Book Now</MagneticCTA>
        </div>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setOpen(!open)}
          style={{
            display: 'none', flexDirection: 'column', gap: 5,
            background: 'none', border: 'none', cursor: 'pointer', padding: 4,
          }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: 22, height: 1.5,
              background: 'var(--color-gold)',
              transition: 'all 0.35s var(--ease-out)',
              transformOrigin: 'center',
              transform: open
                ? i === 0 ? 'rotate(45deg) translate(4.5px, 4.5px)'
                : i === 1 ? 'scaleX(0) opacity(0)'
                : 'rotate(-45deg) translate(4.5px, -4.5px)'
                : 'none',
              opacity: open && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile fullscreen menu */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: 'rgba(14,12,10,0.97)',
        backdropFilter: 'blur(20px)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 40,
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.5s var(--ease-out)',
      }} className="mobile-menu">

        {/* Decorative ring in bg */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 500, height: 500, borderRadius: '50%',
          border: '1px solid rgba(201,169,110,0.06)',
          pointerEvents: 'none',
        }} />

        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => handleNav(link.href)}
            style={{
              fontFamily: 'var(--font-display)', fontSize: 36,
              fontStyle: 'italic', color: 'var(--color-beige)',
              transition: 'color 0.2s, transform 0.2s',
              transitionDelay: open ? `${i * 0.06}s` : '0s',
              opacity: open ? 1 : 0,
              transform: open ? 'translateX(0)' : 'translateX(30px)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--color-gold)';
              e.currentTarget.style.transform = 'translateX(6px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--color-beige)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >{link.label}</a>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-cta     { display: none !important; }
          .hamburger   { display: flex !important; }
        }
      `}</style>
    </>
  );
}