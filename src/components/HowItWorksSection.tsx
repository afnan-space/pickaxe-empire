import React from 'react';

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="sec chapters scene-sec dim" id="game">
      <div className="scene-bg" data-parallax="0.2">
        <img
          src="/assets/mines/tunnel.webp"
          alt=""
          width="800"
          height="480"
          loading="lazy"
        />
      </div>
      <div className="wrap">
        <header className="title reveal">
          <span className="tag">Chapter I</span>
          <h2>
            How the <em>empire</em> works
          </h2>
          <p>
            Your level is set by the PXE you hold. Climb higher and your crew digs faster, every hour of every day.
          </p>
        </header>
        <ol className="chapter-list">
          <li className="reveal">
            <span className="ch-no num">01</span>
            <span
              className="ch-ic ico"
              style={{ '--i': 'url(/assets/icons/tg.svg)' } as React.CSSProperties}
            />
            <h3>Forge your pass</h3>
            <p>
              Open the Mini App in Telegram, connect a TON wallet and mint your Ancient Pass, a soulbound seal that opens your mine.
            </p>
          </li>
          <li className="reveal">
            <span className="ch-no num">02</span>
            <span
              className="ch-ic ico"
              style={{ '--i': 'url(/assets/icons/pick.svg)' } as React.CSSProperties}
            />
            <h3>Mine PXE</h3>
            <p>
              Your crew fills your storage around the clock. Claim it to add it to your balance.
            </p>
          </li>
          <li className="reveal">
            <span className="ch-no num">03</span>
            <span
              className="ch-ic ico"
              style={{ '--i': 'url(/assets/icons/up.svg)' } as React.CSSProperties}
            />
            <h3>Rise in rank</h3>
            <p>
              Everything you hold, in the app and in your TON wallet, sets your level, crew and speed.
            </p>
          </li>
          <li className="reveal">
            <span className="ch-no num">04</span>
            <span
              className="ch-ic ico"
              style={{ '--i': 'url(/assets/icons/wallet.svg)' } as React.CSSProperties}
            />
            <h3>Claim your gold</h3>
            <p>
              Connect a TON wallet and withdraw PXE when you have enough. Or keep climbing.
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
};

