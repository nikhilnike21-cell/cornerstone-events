import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — attaches IntersectionObserver and adds 'revealed' class.
 * @param {object} options
 * @param {number}  options.threshold  — 0–1, default 0.15
 * @param {string}  options.direction  — 'up' | 'left' | 'right' | 'scale'
 * @param {boolean} options.once       — default true (unobserve after reveal)
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Apply direction class
    const dir = options.direction || 'up';
    if (dir === 'left')  el.classList.add('reveal', 'reveal-left');
    else if (dir === 'right') el.classList.add('reveal', 'reveal-right');
    else if (dir === 'scale') el.classList.add('reveal', 'reveal-scale');
    else el.classList.add('reveal');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          if (options.once !== false) observer.unobserve(el);
        }
      },
      { threshold: options.threshold ?? 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/**
 * useStaggerReveal — returns a ref for a parent container.
 * All direct children gain staggered .reveal classes automatically.
 */
export function useStaggerReveal({ threshold = 0.1, baseDelay = 0 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const children = Array.from(container.children);
    children.forEach((child, i) => {
      child.classList.add('reveal');
      child.setAttribute('data-delay', String(Math.min(i + 1 + baseDelay, 8)));
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    children.forEach(child => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  return ref;
}