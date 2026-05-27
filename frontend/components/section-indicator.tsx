'use client';

import { useEffect, useState } from 'react';

const sections = [
  { id: 'inicio', label: './inicio' },
  { id: 'experiencia', label: './experiencia' },
  { id: 'proyectos', label: './proyectos' },
  { id: 'stack', label: './stack' },
  { id: 'contacto', label: './contacto' }
] as const;

type SectionId = (typeof sections)[number]['id'];

export function SectionIndicator() {
  const [activeSection, setActiveSection] = useState<SectionId>('inicio');

  useEffect(() => {
    let frameId: number | null = null;

    const updateActiveSection = () => {
      const viewportPoint = window.innerHeight * 0.45;

      const currentSection = sections.reduce<SectionId>((closestId, section) => {
        const element = document.getElementById(section.id);
        const closestElement = document.getElementById(closestId);

        if (!element || !closestElement) {
          return closestId;
        }

        const distance = Math.abs(element.getBoundingClientRect().top - viewportPoint);
        const closestDistance = Math.abs(closestElement.getBoundingClientRect().top - viewportPoint);

        return distance < closestDistance ? section.id : closestId;
      }, sections[0].id);

      setActiveSection(currentSection);
      frameId = null;
    };

    const handleScroll = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateActiveSection);
      }
    };

    updateActiveSection();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <nav className="section-indicator" aria-label="Indicador de secciones">
      <span className="section-indicator__track" aria-hidden="true" />

      {sections.map((section) => {
        const isActive = activeSection === section.id;

        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`section-indicator__item${isActive ? ' section-indicator__item--active' : ''}`}
            aria-label={`Ir a la sección ${section.id}`}
          >
            <span className="section-indicator__label">{section.label}</span>
            <span className="section-indicator__dot" aria-hidden="true" />
          </a>
        );
      })}
    </nav>
  );
}