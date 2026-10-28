import React, { useState, useEffect } from 'react';
import { SITE } from '../data/config';

export const Header: React.FC = () => {
  const [isSolid, setIsSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSolid(window.scrollY > 10 || menuOpen);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('menu-open');
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`header ${isSolid || menuOpen ? 'solid' : ''}`} id="top">
        <div className="wrap">
          <a className="brand" href="#top" aria-label="Pickaxe Empire home" onClick={closeMenu}>
            <img src="/assets/img/pxe-token.webp" alt="" width="40" height="40" />
            <span>
              Pickaxe<b>Empire</b>
            </span>
          </a>
          <nav className="nav" aria-label="Main">
            <a href="#game">The game</a>
            <a href="#mines">Mines</a>
            <a href="#crew">Crew</a>
            <a href="#levels">Levels</a>
            <a href="#rewards">Rewards</a>
            <a href="#pxe">PXE</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="header-cta">
            <a
              className="btn btn-torch btn-sm"
              href={SITE.miniApp}
              onClick={closeMenu}
            >
              Play now
            </a>
            <button
              className="menu-btn"
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="drawer"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <nav className="drawer" id="drawer" aria-label="Menu">
        <a href="#game" onClick={closeMenu}>
          <i>01</i>The game
        </a>
        <a href="#mines" onClick={closeMenu}>
          <i>02</i>Mines
        </a>
        <a href="#crew" onClick={closeMenu}>
          <i>03</i>Crew
        </a>
        <a href="#levels" onClick={closeMenu}>
          <i>04</i>Levels
        </a>
        <a href="#rewards" onClick={closeMenu}>
          <i>05</i>Rewards
        </a>
        <a href="#pxe" onClick={closeMenu}>
          <i>06</i>PXE token
        </a>
        <a href="#faq" onClick={closeMenu}>
          <i>07</i>FAQ
        </a>
        <a
          className="btn btn-torch"
          href={SITE.miniApp}
          onClick={closeMenu}
        >
          <span
            className="ico"
            style={{ '--i': 'url(/assets/icons/send.svg)' } as React.CSSProperties}
          />
          Play in Telegram
        </a>
      </nav>
    </>
  );
};
