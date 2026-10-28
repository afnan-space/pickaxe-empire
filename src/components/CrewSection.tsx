import React from 'react';

const CREW_SPRITES = [
  { key: 'meadow', frames: 12, fw: 202, fh: 256, fps: 14, src: '/assets/miners/meadow-mine.webp' },
  { key: 'canyon', frames: 15, fw: 247, fh: 256, fps: 14, src: '/assets/miners/canyon-mine.webp' },
  { key: 'frost', frames: 19, fw: 249, fh: 256, fps: 13, src: '/assets/miners/frost-mine.webp' },
  { key: 'crystal', frames: 15, fw: 220, fh: 256, fps: 17, src: '/assets/miners/crystal-mine.webp' },
  { key: 'creek', frames: 15, fw: 279, fh: 256, fps: 14, src: '/assets/miners/creek-mine.webp' },
];

export const CrewSection: React.FC = () => {
  return (
    <section className="sec crew-sec scene-sec" id="crew">
      <div className="scene-bg" data-parallax="0.18">
        <img
          src="/assets/img/cave.webp"
          alt=""
          width="840"
          height="600"
          loading="lazy"
        />
      </div>
      <div className="wrap">
        <header className="title reveal">
          <span className="tag">Chapter III</span>
          <h2>
            A crew that <em>never</em> sleeps
          </h2>
          <p>
            Every mine brings new miners with their own tools and outfits. Your crew grows from one digger to fifty, and every miner adds speed.
          </p>
        </header>
      </div>

      <div className="crew-stage reveal" aria-label="Animated miners at work">
        <img
          className="loot l"
          src="/assets/img/gold-pile.webp"
          alt="Pile of gold"
          loading="lazy"
        />
        <div className="crew-row" id="crewRow">
          {CREW_SPRITES.map((sp) => (
            <span
              key={sp.key}
              className="sprite"
              role="img"
              aria-label="Miner at work"
              style={
                {
                  '--frames': sp.frames,
                  '--fw': sp.fw,
                  '--fh': sp.fh,
                  '--fps': sp.fps,
                  backgroundImage: `url(${sp.src})`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
        <img
          className="loot r"
          src="/assets/img/barrel-coins.webp"
          alt="Barrel of gold coins"
          loading="lazy"
        />
      </div>

      <div className="wrap">
        <div className="crew-hud reveal">
          <div>
            <b className="num">1 → 50</b>
            <span>miners as you climb</span>
          </div>
          <div>
            <b className="num">10</b>
            <span>ranks in every mine</span>
          </div>
          <div>
            <b className="num">★ 1–5</b>
            <span>stars per mine</span>
          </div>
          <div>
            <b className="num">TH/s</b>
            <span>every miner adds speed</span>
          </div>
        </div>
      </div>
    </section>
  );
};

