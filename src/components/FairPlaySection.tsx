import React from 'react';

export const FairPlaySection: React.FC = () => {
  return (
    <section className="sec fair-sec" id="fair">
      <div className="wrap fair-grid">
        <header className="title reveal">
          <span className="tag">The code</span>
          <h2>
            Fair play, <em>by law</em>
          </h2>
          <p>
            Rules every miner lives by. Read exactly what we keep in our{' '}
            <a href="/privacy.html" target="_blank" rel="noopener noreferrer">
              privacy policy
            </a>
            .
          </p>
        </header>
        <div className="fair-list">
          <div className="reveal">
            <span
              className="ico"
              style={{ '--i': 'url(/assets/icons/tg.svg)' } as React.CSSProperties}
            />
            <div>
              <h3>Telegram sign-in</h3>
              <p>Every request is signed by Telegram. No passwords, no emails, no forms.</p>
            </div>
          </div>
          <div className="reveal">
            <span
              className="ico"
              style={{ '--i': 'url(/assets/icons/wallet.svg)' } as React.CSSProperties}
            />
            <div>
              <h3>Proven wallets</h3>
              <p>A wallet links only after it signs a TON Connect proof. One wallet, one account.</p>
            </div>
          </div>
          <div className="reveal">
            <span
              className="ico"
              style={{ '--i': 'url(/assets/icons/user.svg)' } as React.CSSProperties}
            />
            <div>
              <h3>One player, one account</h3>
              <p>Bots, farms and multiple accounts are detected and removed, so rewards go to real players.</p>
            </div>
          </div>
          <div className="reveal">
            <span
              className="ico"
              style={{ '--i': 'url(/assets/icons/lock.svg)' } as React.CSSProperties}
            />
            <div>
              <h3>Privacy first</h3>
              <p>We keep only what the game needs, and never ask for your seed phrase.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

