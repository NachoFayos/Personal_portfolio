'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

type SectionState = 'normal' | 'minimized' | 'expanded' | 'closed';

type WindowSectionProps = {
  id: string;
  title?: string;
  commandLabel?: string;
  subtitle?: string;
  variant?: 'about' | 'experience' | 'projects' | 'stack' | 'contact' | 'intro';
  barTitle?: string;
  windowLabel?: string;
  children: ReactNode;
};

const CLOSE_ANIMATION_MS = 220;

export function WindowSection({
  id,
  title,
  commandLabel,
  subtitle,
  variant,
  barTitle,
  windowLabel,
  children
}: WindowSectionProps) {
  const [state, setState] = useState<SectionState>('normal');
  const [isClosing, setIsClosing] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const panelLabel = windowLabel ?? title ?? barTitle ?? 'ventana';
  const isMinimized = state === 'minimized';
  const isExpanded = state === 'expanded';
  const isClosed = state === 'closed';
  const showSectionHeading = Boolean(title);

  const handleMinimize = () => setState('minimized');

  const handleToggleExpand = () => {
    setState((currentState) => (currentState === 'expanded' ? 'normal' : 'expanded'));
  };

  const handleClose = () => {
    setIsClosing(true);
    closeTimerRef.current = setTimeout(() => {
      setState('closed');
      setIsClosing(false);
    }, CLOSE_ANIMATION_MS);
  };

  const handleRestore = () => setState('normal');

  if (isClosed) {
    return (
      <section className="window-section window-section--closed" id={id} data-variant={variant}>
        <div className="window-section__restore">
          <p>{barTitle ?? title}</p>
          <button type="button" className="button button--muted" onClick={handleRestore}>
            ./restore
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`window-section${isMinimized ? ' window-section--minimized' : ''}${isExpanded ? ' window-section--expanded' : ''}${isClosing ? ' window-section--closing' : ''}`}
      id={id}
      data-variant={variant}
    >
      <header className="window-section__bar">
        <div className="window-section__heading">
          {barTitle ? <p className="intro-window__title">{barTitle}</p> : null}
          {commandLabel ? <p className="section__command">{commandLabel}</p> : null}
          {showSectionHeading ? <h2 className="window-section__title">{title}</h2> : null}
        </div>

        <div className="intro-window__controls">
          <button type="button" className="window-control" aria-label={`Minimizar ${panelLabel}`} onClick={handleMinimize}>
            <span className="window-control__minimize-icon">—</span>
          </button>
          <button
            type="button"
            className="window-control"
            aria-label={state === 'expanded' ? `Restaurar ${panelLabel}` : `Maximizar ${panelLabel}`}
            onClick={handleToggleExpand}
          >
            <span className="window-control__maximize-icon">□</span>
          </button>
          <button type="button" className="window-control window-control--close" aria-label={`Cerrar ${panelLabel}`} onClick={handleClose}>
            <span className="window-control__close-icon">×</span>
          </button>
        </div>
      </header>

      <div className="window-section__body" aria-hidden={isMinimized}>
        {subtitle ? <p className="section__subtitle">{subtitle}</p> : null}
        <div className="window-section__content">{children}</div>
      </div>
    </section>
  );
}