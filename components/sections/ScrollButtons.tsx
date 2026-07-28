'use client';

import { useEffect, useState } from 'react';

export default function ScrollButtons() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollToBottom = () =>
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });

  const buttonStyle: React.CSSProperties = {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    border: '1px solid var(--border)',
    background: 'var(--bg-2)',
    color: 'var(--accent)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '1.1rem',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)',
    transition: 'transform 0.2s, border-color 0.2s',
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 90,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      {visible && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="scroll-btn"
          style={buttonStyle}
        >
          ↑
        </button>
      )}
      <button
        onClick={scrollToBottom}
        aria-label="Scroll to bottom"
        className="scroll-btn"
        style={buttonStyle}
      >
        ↓
      </button>

      <style>{`
        .scroll-btn:hover {
          transform: translateY(-2px);
          border-color: var(--accent) !important;
        }
      `}</style>
    </div>
  );
}
