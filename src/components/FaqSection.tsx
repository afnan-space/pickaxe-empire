import React from 'react';
import { FAQ_DATA } from '../data/game';

export const FaqSection: React.FC = () => {
  return (
    <section className="sec faq-sec" id="faq">
      <div className="wrap faq-grid">
        <header className="title reveal">
          <span className="tag">Questions</span>
          <h2>
            Before you <em>dig in</em>
          </h2>
          <p>Everything new miners ask. Still stuck? Ask in our community.</p>
        </header>
        <div className="faq">
          {FAQ_DATA.map((item, index) => (
            <details key={index}>
              <summary>{item.q}</summary>
              <div className="answer">
                {item.a.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

