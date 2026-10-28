import React from 'react';
import { SITE } from '../data/config';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-brand">
          <a className="brand" href="#top">
            <img
              src="/assets/img/pxe-token.webp"
              alt=""
              width="40"
              height="40"
              loading="lazy"
            />
            <span>
              Pickaxe<b>Empire</b>
            </span>
          </a>
          <p>
            A mining game for Telegram on The Open Network. Build your crew, climb the levels, mine PXE.
          </p>
        </div>
        <div className="footer-cols">
          <div>
            <h4>Game</h4>
            <ul>
              <li>
                <a
                  href={SITE.miniApp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Play now
                </a>
              </li>
              <li>
                <a href="#game">How it works</a>
              </li>
              <li>
                <a href="#mines">The mines</a>
              </li>
              <li>
                <a href="#levels">Level calculator</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Community</h4>
            <ul>
              <li>
                <a
                  href={SITE.bot}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Telegram bot
                </a>
              </li>
              {SITE.channel && (
                <li>
                  <a
                    href={SITE.channel}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Telegram channel
                  </a>
                </li>
              )}
              {SITE.chat && (
                <li>
                  <a
                    href={SITE.chat}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Community chat
                  </a>
                </li>
              )}
              {SITE.x && (
                <li>
                  <a
                    href={SITE.x}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    X
                  </a>
                </li>
              )}
              {SITE.discord && (
                <li>
                  <a
                    href={SITE.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Discord
                  </a>
                </li>
              )}
              {SITE.support && (
                <li>
                  <a
                    href={SITE.support}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Support
                  </a>
                </li>
              )}
              {SITE.email && (
                <li>
                  <a href={`mailto:${SITE.email}`}>Email</a>
                </li>
              )}
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li>
                <a href="/terms.html" target="_blank" rel="noopener noreferrer">
                  Terms
                </a>
              </li>
              <li>
                <a href="/privacy.html" target="_blank" rel="noopener noreferrer">
                  Privacy
                </a>
              </li>
              <li>
                <a href="/credits.html" target="_blank" rel="noopener noreferrer">
                  Credits
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© <span id="year">{year}</span> Pickaxe Empire. All rights reserved.</span>
          <span>Not financial advice. PXE is a game token.</span>
        </div>
      </div>
    </footer>
  );
};

