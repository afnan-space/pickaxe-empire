import React, { useState } from 'react';
import { MILESTONES_TABLE } from '../data/game';
import { CONFIG, levelFor, getLevel, formatNumber } from '../data/levels';

const PRESETS = [
  { label: '0', val: 0 },
  { label: '1K', val: 1000 },
  { label: '10K', val: 10000 },
  { label: '100K', val: 100000 },
  { label: '1M', val: 1000000 },
  { label: '50M', val: 50000000 },
];

export const ForgeSection: React.FC = () => {
  const MAX = CONFIG.MAX_HOLD;
  const [hold, setHold] = useState<number>(10000);
  const [inputValue, setInputValue] = useState<string>('10,000');

  const toRange = (h: number) =>
    Math.min(1000, Math.max(0, Math.round((Math.log10(Math.max(0, h) + 1) / Math.log10(MAX + 1)) * 1000)));

  const fromRange = (s: number) =>
    Math.round(10 ** ((s / 1000) * Math.log10(MAX + 1)) - 1);

  const updateHold = (newHold: number, origin: 'input' | 'range' | 'preset') => {
    const clamped = Math.max(0, Math.min(newHold, MAX * 10));
    setHold(clamped);
    if (origin !== 'input') {
      setInputValue(formatNumber(clamped));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setInputValue(raw);
    const parsed = Number(raw.replace(/[^\d.]/g, ''));
    if (Number.isFinite(parsed)) {
      updateHold(parsed, 'input');
    }
  };

  const handleInputBlur = () => {
    setInputValue(formatNumber(hold));
  };

  const currentLevelInfo = levelFor(Math.floor(hold));
  const nextLevelInfo = currentLevelInfo.level < CONFIG.MAX_LEVEL ? getLevel(currentLevelInfo.level + 1) : null;

  return (
    <section className="sec levels-sec scene-sec dim" id="levels">
      <div className="scene-bg" data-parallax="0.2">
        <img
          src="/assets/mines/magma.webp"
          alt=""
          width="800"
          height="480"
          loading="lazy"
        />
      </div>
      <div className="wrap levels-grid">
        <div>
          <header className="title reveal">
            <span className="tag">Chapter IV</span>
            <h2>
              Forge your <em>level</em>
            </h2>
            <p>
              Level 1 mines 5 PXE a day for free. Hold more and you rise through 1,000 levels. Try the real game numbers.
            </p>
          </header>
          <div className="milestones-wrap reveal">
            <table className="milestones num">
              <thead>
                <tr>
                  <th>Level</th>
                  <th>Hold</th>
                  <th>Mines / day</th>
                </tr>
              </thead>
              <tbody>
                {MILESTONES_TABLE.map((row) => (
                  <tr key={row.level}>
                    <td>
                      <b>{row.level}</b> <small style={{ color: 'var(--mute)' }}>{row.rank}</small>
                    </td>
                    <td>{row.hold}</td>
                    <td>{row.perDay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mining Console */}
        <div className="console calc reveal" id="calc">
          <div className="console-head">
            <span>Mining console</span>
            <i></i>
            <i></i>
            <i></i>
          </div>
          <div>
            <label htmlFor="calcHold">PXE you hold (in the app + in your wallet)</label>
            <div className="calc-input">
              <img
                src="/assets/img/pxe-token.webp"
                alt=""
                width="36"
                height="36"
              />
              <input
                id="calcHold"
                type="text"
                inputMode="numeric"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                autoComplete="off"
                aria-describedby="calcNote"
              />
            </div>
            <input
              id="calcRange"
              type="range"
              min="0"
              max="1000"
              step="1"
              value={toRange(hold)}
              onChange={(e) => updateHold(fromRange(Number(e.target.value)), 'range')}
              aria-label="Holding (log scale)"
            />
            <div className="presets" role="group" aria-label="Examples">
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  data-hold={p.val}
                  aria-pressed={Math.floor(hold) === p.val}
                  onClick={() => updateHold(p.val, 'preset')}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="calc-out num" aria-live="polite">
            <div className="big">
              <img
                id="calcScene"
                src={`/assets/mines/${currentLevelInfo.scene}.webp`}
                alt=""
              />
              <div>
                <span className="lbl">You'd be mining at</span>
                <b id="calcSite">{currentLevelInfo.name} · {currentLevelInfo.title}</b>
              </div>
            </div>
            <div>
              <span className="lbl">Level</span>
              <b id="calcLevel">{currentLevelInfo.level.toLocaleString('en-US')}</b>
            </div>
            <div>
              <span className="lbl">Mines / day</span>
              <b id="calcDay">{formatNumber(currentLevelInfo.perDay)}</b>
            </div>
            <div>
              <span className="lbl">Crew</span>
              <b id="calcCrew">{currentLevelInfo.crew}</b>
            </div>
            <div>
              <span className="lbl">Per month</span>
              <b id="calcMonth">{formatNumber(currentLevelInfo.perDay * 30)}</b>
            </div>
            <div>
              <span className="lbl">Speed</span>
              <b id="calcSpeed">{formatNumber(currentLevelInfo.speed)} TH/s</b>
            </div>
            <div>
              <span className="lbl">Next level at</span>
              <b id="calcNext">{nextLevelInfo ? formatNumber(nextLevelInfo.hold) : 'Max level'}</b>
            </div>
          </div>
          <p className="calc-note" id="calcNote">
            Mining fills your storage (24 hours at the start). Claim it to keep the crew digging. Figures are what the game uses today and can change as it develops.
          </p>
        </div>
      </div>
    </section>
  );
};

