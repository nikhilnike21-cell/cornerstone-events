import { useState, useEffect } from 'react';
import { NAV_LINKS } from '../data/sitedata';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
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
        padding: scrolled ? '14px 40px' : '24px 40px',
        background: scrolled ? 'rgba(14,12,10,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'all 0.4s var(--ease-out)',
      }}>
        {/* Logo */}
        <a href="#" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600,
            letterSpacing: '0.06em', color: 'var(--color-gold)',
          }}>CORNERSTONE</span>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: 9.5, fontWeight: 400,
            letterSpacing: '0.35em', textTransform: 'uppercase',
            color: 'var(--color-muted)', marginTop: -2,
          }}>EVENT DESIGN</span>
        </a>

        {/* Desktop Links */}
        <ul style={{
          display: 'flex', gap: 36, listStyle: 'none',
          '@media (max-width: 768px)': { display: 'none' },
        }} className="nav-desktop">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => handleNav(link.href)}
                style={{
                  fontFamily: 'var(--font-body)', fontSize: 12,
                  fontWeight: 400, letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: active === link.href ? 'var(--color-gold)' : 'var(--color-muted)',
                  transition: 'color 0.2s',
                  paddingBottom: 2,
                  borderBottom: active === link.href ? '1px solid var(--color-gold)' : '1px solid transparent',
                }}
                onMouseEnter={e => { if (active !== link.href) e.target.style.color = 'var(--color-beige)'; }}
                onMouseLeave={e => { if (active !== link.href) e.target.style.color = 'var(--color-muted)'; }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a href="#contact" className="nav-cta" style={{
          fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          padding: '10px 24px', border: '1px solid var(--color-gold)',
          color: 'var(--color-gold)', background: 'transparent',
          borderRadius: 'var(--radius-sm)', cursor: 'pointer',
          transition: 'all 0.2s',
        }}
          onMouseEnter={e => {
            e.target.style.background = 'var(--color-gold)';
            e.target.style.color = 'var(--color-bg)';
          }}
          onMouseLeave={e => {
            e.target.style.background = 'transparent';
            e.target.style.color = 'var(--color-gold)';
          }}
        >
          Book Now
        </a>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setOpen(!open)}
          style={{
            display: 'none', flexDirection: 'column', gap: 5,
            background: 'none', border: 'none', cursor: 'pointer', padding: 4,
          }}
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: 'block', width: 22, height: 1.5,
              background: 'var(--color-gold)',
              transformOrigin: 'center',
              transition: 'all 0.3s',
              transform: open
                ? i === 0 ? 'rotate(45deg) translate(4px,4px)'
                : i === 1 ? 'scaleX(0)'
                : 'rotate(-45deg) translate(4px,-4px)'
                : 'none',
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: 'var(--color-surface)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 36,
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s var(--ease-out)',
      }} className="mobile-menu">
        {NAV_LINKS.map(link => (
          <a
            key={link.href}
            href="#contact"
            id="contact"
            onClick={() => handleNav(link.href)}
            style={{
              fontFamily: 'var(--font-display)', fontSize: 32,
              fontStyle: 'italic', color: 'var(--color-beige)',
            }}
          >{link.label}</a>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-cta { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}