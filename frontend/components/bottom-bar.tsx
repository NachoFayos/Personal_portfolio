'use client';

import { useEffect, useRef, useState } from 'react';

type BottomBarProps = {
  githubUrl: string;
  linkedinUrl: string;
  email: string;
};

const VISIBILITY_DELAY_MS = 1000;

export function BottomBar({ githubUrl, linkedinUrl, email }: BottomBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(false);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, VISIBILITY_DELAY_MS);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <footer className={`bottombar ${isVisible ? '' : 'bottombar--hidden'}`} aria-label="Barra inferior">
      <div className="bottombar__inner">
        <div className="bottombar__identity">
            <div>
                <p className="bottombar__path">
                <span className="bottombar__accent">~</span> / ignacio-fayos
                </p>
                <p className="bottombar__meta">Backend Developer · Laravel · PostgreSQL</p>
            </div>
        </div>

        <nav className="bottombar__links" aria-label="Enlaces externos">
          <a href={githubUrl} target="_blank" rel="noreferrer">
            ./github
          </a>
          <a href={linkedinUrl} target="_blank" rel="noreferrer">
            ./linkedin
          </a>
          <a href={`mailto:${email}`}>./email</a>
        </nav>
      </div>
    </footer>
  );
}