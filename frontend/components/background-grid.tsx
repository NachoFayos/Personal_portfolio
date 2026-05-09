'use client';

import { useEffect } from 'react';

const DEFAULT_X = '50%';
const DEFAULT_Y = '35%';

export function BackgroundGrid() {
  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty('--cursor-x', DEFAULT_X);
    root.style.setProperty('--cursor-y', DEFAULT_Y);

    const finePointer = window.matchMedia('(pointer: fine)').matches;

    if (!finePointer) {
      return;
    }

    let rafId: number | null = null;
    let nextX = DEFAULT_X;
    let nextY = DEFAULT_Y;

    const updateCursorPosition = () => {
      root.style.setProperty('--cursor-x', nextX);
      root.style.setProperty('--cursor-y', nextY);
      rafId = null;
    };

    const handleMouseMove = (event: MouseEvent) => {
      nextX = `${event.clientX}px`;
      nextY = `${event.clientY}px`;

      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateCursorPosition);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);

      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return <div className="background-grid" aria-hidden="true" />;
}