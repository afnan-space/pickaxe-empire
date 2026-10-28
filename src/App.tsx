import React, { useState, useEffect, useRef } from 'react';
import './styles/site.css';

import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { LegendaryMinesSection } from './components/LegendaryMinesSection';
import { CrewSection } from './components/CrewSection';
import { ForgeSection } from './components/ForgeSection';
import { DailyLootSection } from './components/DailyLootSection';
import { CoinSection } from './components/CoinSection';
import { FairPlaySection } from './components/FairPlaySection';
import { FaqSection } from './components/FaqSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { MobilePlayBar } from './components/MobilePlayBar';

export const App: React.FC = () => {
  const [heroActionsNode, setHeroActionsNode] = useState<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll animations: Reveals & Parallax
  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));

    if (!isReduced && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add('in');
              io.unobserve(en.target);
            }
          });
        },
        { rootMargin: '50px 0px 50px 0px', threshold: 0.05 }
      );

      elements.forEach((el) => {
        // If element is already in or above viewport, reveal immediately
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight + 100) {
          el.classList.add('in');
        } else {
          io.observe(el);
        }
      });

      return () => io.disconnect();
    } else {
      elements.forEach((el) => el.classList.add('in'));
    }
  }, []);

  // Parallax effect on scenes & emperor
  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const layers = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
    if (!layers.length) return;

    let ticking = false;
    const move = () => {
      ticking = false;
      const vh = window.innerHeight;
      for (const el of layers) {
        const parent = el.parentElement;
        if (!parent) continue;
        const box = parent.getBoundingClientRect();
        if (box.bottom < -100 || box.top > vh + 100) continue;
        const parallaxFactor = Number(el.dataset.parallax) || 0;
        const y = ((box.top + box.height / 2 - vh / 2) * -parallaxFactor).toFixed(1);
        el.style.transform = `translate3d(0, ${y}px, 0)`;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(move);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', move);
    move();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', move);
    };
  }, []);

  return (
    <div ref={containerRef}>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="grain" aria-hidden="true" />

      <Header />

      <main id="main">
        <HeroSection onHeroActionsRef={setHeroActionsNode} />
        <HowItWorksSection />
        <LegendaryMinesSection />
        <CrewSection />
        <ForgeSection />
        <DailyLootSection />
        <CoinSection />
        <FairPlaySection />
        <FaqSection />
        <FinalCtaSection />
      </main>

      <Footer />

      <MobilePlayBar heroActionsNode={heroActionsNode} />
    </div>
  );
};

export default App;
