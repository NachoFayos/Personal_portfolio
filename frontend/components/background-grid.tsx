'use client';

import { useEffect, useRef } from 'react';

type Point = {
  x: number;
  y: number;
};

const SPACING = 24;
const BASE_RADIUS = 1.1;
const INFLUENCE_RADIUS = 145;
const MAX_SHIFT = 4.2;
const MAX_RADIUS_BOOST = 0.55;

export function BackgroundGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const pointsRef = useRef<Point[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    const finePointer = window.matchMedia('(pointer: fine)').matches;

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const points: Point[] = [];
      const columns = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          points.push({ x: column * SPACING, y: row * SPACING });
        }
      }

      pointsRef.current = points;
    };

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const pointer = pointerRef.current;

      context.clearRect(0, 0, width, height);
      context.fillStyle = '#080b0f';
      context.fillRect(0, 0, width, height);

      for (const point of pointsRef.current) {
        let px = point.x;
        let py = point.y;
        let radius = BASE_RADIUS;
        let color = 'rgba(126, 139, 160, 0.3)';

        if (finePointer && pointer.active) {
          const dx = point.x - pointer.x;
          const dy = point.y - pointer.y;
          const distance = Math.hypot(dx, dy);

          if (distance < INFLUENCE_RADIUS) {
            const t = 1 - distance / INFLUENCE_RADIUS;
            const eased = t * t;
            const unitX = distance === 0 ? 0 : dx / distance;
            const unitY = distance === 0 ? 0 : dy / distance;

            px += unitX * eased * MAX_SHIFT;
            py += unitY * eased * MAX_SHIFT;
            radius += eased * MAX_RADIUS_BOOST;

            const glow = 0.26 + eased * 0.5;
            color = `rgba(240, 165, 0, ${glow})`;
          }
        }

        context.beginPath();
        context.fillStyle = color;
        context.arc(px, py, radius, 0, Math.PI * 2);
        context.fill();
      }

      frameRef.current = window.requestAnimationFrame(draw);
    };

    const handleMove = (event: MouseEvent) => {
      pointerRef.current.x = event.clientX;
      pointerRef.current.y = event.clientY;
      pointerRef.current.active = true;
    };

    const handleLeave = () => {
      pointerRef.current.active = false;
    };

    resize();
    draw();

    window.addEventListener('resize', resize);

    if (finePointer) {
      window.addEventListener('mousemove', handleMove, { passive: true });
      window.addEventListener('mouseout', handleLeave);
    }

    return () => {
      window.removeEventListener('resize', resize);

      if (finePointer) {
        window.removeEventListener('mousemove', handleMove);
        window.removeEventListener('mouseout', handleLeave);
      }

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="background-grid" aria-hidden="true" />;
}