import React, { useState, useEffect } from 'react';
import { SITE } from '../data/config';

interface MobilePlayBarProps {
  heroActionsNode: HTMLElement | null;
}

export const MobilePlayBar: React.FC<MobilePlayBarProps> = ({ heroActionsNode }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!heroActionsNode || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShow(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );

    observer.observe(heroActionsNode);
    return () => observer.disconnect();
  }, [heroActionsNode]);

  return (
    <div
      className={`mbar ${show ? 'show' : ''}`}
      id="mbar"
      aria-hidden={!show}
    >
      <img
        src="/assets/img/pxe-token.webp"
        alt=""
        width="38"
        height="38"
      />
      <span>
        <b>Pickaxe Empire</b>
        <small>Free to play in Telegram</small>
      </span>
      <a
        className="btn btn-torch"
        href={SITE.miniApp}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={show ? 0 : -1}
      >
        Play
      </a>
    </div>
  );
};

