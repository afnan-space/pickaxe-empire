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
                <a href="#game">Play now</a>
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
                <a href="#top">Telegram bot</a>
              </li>
              <li>
                <a href="#top">Telegram channel</a>
              </li>
              <li>
                <a href="#top">Community chat</a>
              </li>
              <li>
                <a href="#top">X</a>
              </li>
              <li>
                <a href="#top">Discord</a>
              </li>
              <li>
                <a href="#top">Support</a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`}>Email</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li>
                <a href="/terms.html">Terms</a>
              </li>
              <li>
                <a href="/privacy.html">Privacy</a>
              </li>
              <li>
                <a href="/credits.html">Credits</a>
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
