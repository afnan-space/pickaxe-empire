import React from 'react';
import { CHECKIN_REWARDS } from '../data/game';

export const DailyLootSection: React.FC = () => {
  return (
    <section className="sec rewards-sec" id="rewards">
      <div className="wrap">
        <header className="title center reveal">
          <span className="tag">Chapter V</span>
          <h2>
            Loot <em>every</em> day
          </h2>
          <p>Mining is only the start. Check in, finish quests and bring your friends.</p>
        </header>

        <div className="loot-grid">
          {/* Daily check-in */}
          <article className="loot-card legendary reveal">
            <span className="rarity">Daily</span>
            <img
              className="loot-art"
              src="/assets/img/gold-bars.webp"
              alt=""
              loading="lazy"
            />
            <h3>Daily check-in</h3>
            <p>Come back every day. Your reward grows all week, then the streak starts again.</p>
            <div className="loot-days num">
              {CHECKIN_REWARDS.map((item) => (
                <span key={item.day} className={item.chest ? 'chest' : ''}>
                  <small>Day {item.day}</small>+{item.amount}
                </span>
              ))}
            </div>
            <span className="loot-stat num">63 PXE for a full week</span>
          </article>

          {/* Friends */}
          <article className="loot-card epic reveal">
            <span className="rarity">For life</span>
            <img
              className="loot-art"
              src="/assets/img/barrel-coins.webp"
              alt=""
              loading="lazy"
            />
            <h3>Friends</h3>
            <p>
              Earn 5% of everything your friends mine, for as long as they play, once they connect a TON wallet and mint their Ancient Pass. Verified friends unlock extra rewards.
            </p>
            <span className="loot-stat">+5% of their mining</span>
          </article>

          {/* Tasks */}
          <article className="loot-card rare reveal">
            <span className="rarity">Quests</span>
            <img
              className="loot-art"
              src="/assets/img/crystals.webp"
              alt=""
              loading="lazy"
            />
            <h3>Tasks</h3>
            <p>Join the community, hit milestones and complete partner quests for one-off PXE rewards.</p>
            <span className="loot-stat">New quests regularly</span>
          </article>

          {/* Bigger storage */}
          <article className="loot-card rare reveal">
            <span className="rarity">Upgrade</span>
            <img
              className="loot-art"
              src="/assets/img/torch.webp"
              alt=""
              loading="lazy"
            />
            <h3>Bigger storage</h3>
            <p>Upgrade your storage from 24 to 96 hours so your crew keeps digging while you're away.</p>
            <span className="loot-stat">24h → 96h</span>
          </article>

          {/* Holder rewards */}
          <article className="loot-card epic reveal">
            <span className="rarity">Holders</span>
            <img
              className="loot-art"
              src="/assets/img/nugget.webp"
              alt=""
              loading="lazy"
            />
            <h3>Holder rewards</h3>
            <p>
              Keep PXE in your own TON wallet and claim a reward every 24 hours. Every tier pays on its own.
            </p>
            <span className="loot-stat">5K · 10K · 30K · 50K PXE</span>
          </article>
        </div>
      </div>
    </section>
  );
};

