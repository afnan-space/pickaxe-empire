import React, { useMemo } from 'react';

interface EmbersProps {
  count?: number;
}

export const Embers: React.FC<EmbersProps> = ({ count }) => {
  const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const emberParticles = useMemo(() => {
    if (isReduced) return [];
    const numParticles = count ?? (typeof window !== 'undefined' && window.innerWidth < 640 ? 14 : 26);
    return Array.from({ length: numParticles }, (_, i) => {
      const r = Math.random;
      return {
        id: i,
        left: `${(r() * 100).toFixed(1)}%`,
        size: `${(2 + r() * 3).toFixed(1)}px`,
        duration: `${(7 + r() * 8).toFixed(1)}s`,
        delay: `${(-r() * 14).toFixed(1)}s`,
        x: `${Math.round(r() * 120 - 60)}px`,
      };
    });
  }, [count, isReduced]);

  if (isReduced) return null;

  return (
    <div className="embers" aria-hidden="true">
      {emberParticles.map((p) => (
        <i
          key={p.id}
          style={
            {
              left: p.left,
              '--s': p.size,
              '--d': p.duration,
              '--dl': p.delay,
              '--x': p.x,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};

