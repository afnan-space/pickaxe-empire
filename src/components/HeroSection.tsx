import React from 'react';
import { SITE } from '../data/config';
import { Embers } from './Embers';

interface HeroSectionProps {
  onHeroActionsRef?: (node: HTMLElement | null) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onHeroActionsRef }) => {
  return (
    <section className="hero scene-sec" aria-label="Pickaxe Empire">
      <div className="scene-bg" data-parallax="0.35">
        <img
          src="/assets/mines/forge.webp"
          alt=""
          width="800"
          height="480"
          fetchPriority="high"
        />
      </div>
      <Embers />
      <div className="hero-emperor" data-parallax="0.12">
        <img
          src="/assets/img/emperor.webp"
          alt="The emperor of Pickaxe Empire"
          width="561"
          height="640"
        />
      </div>
      <div className="wrap hero-in">
        <p className="overline">
          <span></span>A Telegram mining game on TON
        </p>
        <h1>
          Pickaxe<br />
          <em>Empire</em>
        </h1>
        <p className="lead">
          Hire a crew. Dig through ten of the oldest mines on Earth. Mine PXE, right inside Telegram.
        </p>
        <div className="hero-actions" ref={onHeroActionsRef}>
          <a
            className="btn btn-torch btn-lg"
            href={SITE.miniApp}
          >
            <span
              className="ico"
              style={{ '--i': 'url(/assets/icons/send.svg)' } as React.CSSProperties}
            />
            Play now · free
          </a>
          <a className="btn btn-line btn-lg" href="#game">
            How it works
          </a>
        </div>
      </div>
      <div className="hud" aria-label="Game at a glance">
        <div>
          <b className="num">1,000</b>
          <span>Levels</span>
        </div>
        <div>
          <b className="num">10</b>
          <span>Ancient mines</span>
        </div>
        <div>
          <b className="num">50</b>
          <span>Miners per crew</span>
        </div>
        <div>
          <b className="num">24/7</b>
          <span>Mining</span>
        </div>
      </div>
      <a className="scroll-cue" href="#game" aria-label="Scroll down">
        <span></span>
      </a>
    </section>
  );
};
