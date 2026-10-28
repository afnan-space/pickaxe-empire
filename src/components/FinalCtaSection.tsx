import React from 'react';
import { SITE } from '../data/config';
import { Embers } from './Embers';

export const FinalCtaSection: React.FC = () => {
  return (
    <section className="finale scene-sec" aria-label="Start playing">
      <div className="scene-bg" data-parallax="0.25">
        <img
          src="/assets/mines/canyon.webp"
          alt=""
          width="800"
          height="480"
          loading="lazy"
        />
      </div>
      <Embers />
      <div className="wrap finale-in reveal">
        <img
          className="finale-coin"
          src="/assets/img/pxe-token.webp"
          alt=""
          width="110"
          height="110"
          loading="lazy"
        />
        <h2>
          Your empire <em>awaits</em>
        </h2>
        <p>
          Open Pickaxe Empire in Telegram and start mining in seconds. No download, no sign-up.
        </p>
        <a
          className="btn btn-torch btn-lg"
          href={SITE.miniApp}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span
            className="ico"
            style={{ '--i': 'url(/assets/icons/send.svg)' } as React.CSSProperties}
          />
          Start mining
        </a>
        <div className="socials" id="socials">
          {SITE.channel && (
            <a
              className="social"
              href={SITE.channel}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21.9 4.6 18.7 19.7c-.2 1.1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9.1-8.2c.4-.4-.1-.6-.6-.2L6.2 13.4 1.4 11.9c-1-.3-1.1-1 .2-1.5L20.5 3.1c.9-.3 1.6.2 1.4 1.5z" />
              </svg>
              Channel
            </a>
          )}
          {SITE.chat && (
            <a
              className="social"
              href={SITE.chat}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
              </svg>
              Chat
            </a>
          )}
          {SITE.x && (
            <a
              className="social"
              href={SITE.x}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.8 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z" />
              </svg>
              X
            </a>
          )}
          {SITE.discord && (
            <a
              className="social"
              href={SITE.discord}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19.6 5.3A16.6 16.6 0 0 0 15.5 4l-.5 1a15.3 15.3 0 0 0-6 0l-.5-1a16.6 16.6 0 0 0-4.1 1.3C1.8 9.2 1.1 13 1.4 16.7A16.7 16.7 0 0 0 6.5 19.3l1.1-1.7a10.8 10.8 0 0 1-1.7-.8l.4-.3a11.9 11.9 0 0 0 11.4 0l.4.3c-.5.3-1.1.6-1.7.8l1.1 1.7a16.6 16.6 0 0 0 5.1-2.6c.4-4.3-.7-8.1-3-11.4zM8.7 14.5c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2zm6.6 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z" />
              </svg>
              Discord
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

