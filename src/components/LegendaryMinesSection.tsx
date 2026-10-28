import React, { useRef, useState, useEffect, useCallback } from 'react';
import { MINE_CARDS_DATA, CLASSES } from '../data/levels';

export const LegendaryMinesSection: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeMine, setActiveMine] = useState(0);

  const pad = (v: number) => String(v).padStart(2, '0');

  const scrollToMine = useCallback((index: number) => {
    const list = trackRef.current;
    if (!list) return;
    const cards = list.querySelectorAll<HTMLElement>('.mine-slide');
    const targetCard = cards[index];
    if (!targetCard) return;

    // Center on mobile, start-aligned on desktop
    const style = window.getComputedStyle(targetCard);
    const isStart = style.scrollSnapAlign.includes('start');
    const scrollPos = isStart
      ? targetCard.offsetLeft - (cards[0]?.offsetLeft || 0)
      : targetCard.offsetLeft - (list.clientWidth - targetCard.clientWidth) / 2;

    list.scrollTo({ left: scrollPos, behavior: 'smooth' });
    setActiveMine(index);
  }, []);

  const handleScrollStep = (direction: number) => {
    const list = trackRef.current;
    if (!list) return;
    const cards = list.querySelectorAll<HTMLElement>('.mine-slide');
    const step = cards[1] ? cards[1].offsetLeft - cards[0].offsetLeft : list.clientWidth * 0.8;
    list.scrollBy({ left: step * direction, behavior: 'smooth' });
  };

  useEffect(() => {
    const list = trackRef.current;
    if (!list) return;

    let animFrame = 0;
    const onScroll = () => {
      cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(() => {
        const cards = Array.from(list.querySelectorAll<HTMLElement>('.mine-slide'));
        if (!cards.length) return;

        let bestIndex = 0;
        let minDiff = Infinity;
        cards.forEach((c, i) => {
          const style = window.getComputedStyle(c);
          const isStart = style.scrollSnapAlign.includes('start');
          const rest = isStart
            ? c.offsetLeft - cards[0].offsetLeft
            : c.offsetLeft - (list.clientWidth - c.clientWidth) / 2;
          const diff = Math.abs(rest - list.scrollLeft);
          if (diff < minDiff) {
            minDiff = diff;
            bestIndex = i;
          }
        });

        if (list.scrollLeft + list.clientWidth >= list.scrollWidth - 8) {
          bestIndex = cards.length - 1;
        }

        setActiveMine(bestIndex);
      });
    };

    list.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      list.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <section className="sec mines-sec" id="mines">
      <div className="wrap">
        <header className="title reveal">
          <span className="tag">Chapter II</span>
          <h2>
            Ten <em>legendary</em> mines
          </h2>
          <p>
            Every 100 levels your crew travels to a new real-world mine, from the red ochre of Ngwenya to the lost gold of Ophir.
          </p>
        </header>

        {/* World Map with interactive route & pins */}
        <div className="map reveal" aria-hidden="false">
          <img
            src="/assets/img/earth.webp"
            alt="World map showing ancient mines"
            width="1600"
            height="686"
            loading="lazy"
          />
          <svg className="route" viewBox="0 0 350 150" preserveAspectRatio="none" aria-hidden="true">
            <polyline points="201.10,110.20 170.70,31.50 163.40,46.30 81.10,36.00 203.40,55.00 257.00,34.00 194.05,46.30 248.30,71.05 284.90,53.90 210.86,60.50" />
          </svg>
          {CLASSES.map((cls, index) => (
            <button
              key={cls.name}
              className={`pin ${activeMine === index ? 'on' : ''}`}
              type="button"
              style={{ left: cls.pinLeft, top: cls.pinTop }}
              onClick={() => scrollToMine(index)}
              aria-label={cls.zone}
            >
              <span>{index + 1}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Mine Track */}
      <div className="mine-track" id="mineList" ref={trackRef} tabIndex={0} aria-label="The ten mines">
        {MINE_CARDS_DATA.map((card, index) => (
          <article
            key={card.no}
            className={`mine-slide ${activeMine === index ? 'on' : ''}`}
            data-mine={index}
          >
            <img
              className="ms-bg"
              src={card.bg}
              alt={card.name}
              width="800"
              height="480"
              loading="lazy"
            />
            <img
              className="ms-miner"
              src={card.miner}
              alt=""
              loading="lazy"
            />
            <div className="ms-in">
              <span className="ms-no num">Mine {card.no}</span>
              <h3>{card.name}</h3>
              <p className="ms-meta">{card.meta}</p>
              <p className="ms-blurb">{card.blurb}</p>
              <dl className="ms-stats num">
                <div>
                  <dt>Levels</dt>
                  <dd>{card.levels}</dd>
                </div>
                <div>
                  <dt>Mined</dt>
                  <dd>{card.mined}</dd>
                </div>
                <div>
                  <dt>Rank</dt>
                  <dd>{card.rank}</dd>
                </div>
                <div>
                  <dt>Entry</dt>
                  <dd>{card.entry}</dd>
                </div>
              </dl>
            </div>
          </article>
        ))}
      </div>

      {/* Track Navigation controls */}
      <div className="wrap track-nav">
        <div className="track-progress" aria-hidden="true">
          <i id="trackBar" style={{ width: `${((activeMine + 1) / MINE_CARDS_DATA.length) * 100}%` }} />
        </div>
        <span className="track-count num" id="trackCount">
          {pad(activeMine + 1)} / {pad(MINE_CARDS_DATA.length)}
        </span>
        <button
          type="button"
          onClick={() => handleScrollStep(-1)}
          aria-label="Previous mine"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => handleScrollStep(1)}
          aria-label="Next mine"
        >
          →
        </button>
      </div>
    </section>
  );
};

