import React, { useState } from 'react';
import { SITE } from '../data/config';
import { WITHDRAW_RULES } from '../data/game';

export const CoinSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.jettonMaster);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // fallback
    }
  };

  return (
    <section className="sec pxe-sec scene-sec dim" id="pxe">
      <div className="scene-bg" data-parallax="0.15">
        <img
          src="/assets/mines/ancient.webp"
          alt=""
          width="800"
          height="480"
          loading="lazy"
        />
      </div>
      <div className="wrap">
        <header className="title center reveal">
          <span className="tag">Chapter VI</span>
          <h2>
            PXE, the <em>coin</em> of the empire
          </h2>
          <p>
            A jetton on The Open Network. What you mine in the app is yours to withdraw to your own wallet.
          </p>
        </header>

        <div className="coin-stage reveal">
          <div className="coin-orbit" aria-hidden="true">
            <i></i>
            <i></i>
          </div>
          <img
            className="coin-big"
            src="/assets/img/pxe-token.webp"
            alt="The PXE coin"
            width="320"
            height="320"
            loading="lazy"
          />
          <ul className="coin-facts">
            <li className="f1">
              <b>Your wallet counts</b>
              PXE in your connected TON wallet adds to your level.
            </li>
            <li className="f2">
              <b>Withdraw from 500 PXE</b>
              Sent to your wallet after a quick fair-play check.
            </li>
            <li className="f3">
              <b>Your keys stay yours</b>
              Wallets connect with TON Connect. We never ask for your seed phrase.
            </li>
          </ul>
        </div>

        <div className="contract reveal" id="contract">
          {!SITE.jettonMaster ? (
            <div className="soon" id="tokenSoon">
              <span className="pulse-dot"></span>
              PXE is launching soon. The official contract address will be posted here and in our channel.
            </div>
          ) : (
            <div id="tokenLive">
              <span className="lbl">Official contract</span>
              <div className="addr num" id="tokenAddr">
                {SITE.jettonMaster}
              </div>
              <div className="contract-actions">
                <button
                  className="btn btn-line btn-sm"
                  type="button"
                  id="copyAddr"
                  onClick={handleCopy}
                >
                  <span
                    className="ico"
                    style={{ '--i': 'url(/assets/icons/copy.svg)' } as React.CSSProperties}
                  />
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <a
                  className="btn btn-line btn-sm"
                  id="tokenView"
                  href={`https://tonviewer.com/${encodeURIComponent(SITE.jettonMaster)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tonviewer
                </a>
                <a
                  className="btn btn-torch btn-sm"
                  href={SITE.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buy PXE
                </a>
              </div>
            </div>
          )}

          <table className="fees num">
            <tbody>
              {WITHDRAW_RULES.FEES.map((fee) => (
                <tr key={fee.label}>
                  <td>{fee.label}</td>
                  <td>{fee.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

