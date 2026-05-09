import { ReactNode } from 'react';

type SectionProps = {
  id: string;
  title: string;
  commandLabel?: string;
  subtitle?: string;
  variant?: 'about' | 'experience' | 'projects' | 'stack' | 'contact';
  children: ReactNode;
};

export function Section({ id, title, commandLabel, subtitle, variant, children }: SectionProps) {
  return (
    <section className="section" id={id} data-variant={variant}>
      {commandLabel ? <p className="section__command">{commandLabel}</p> : null}
      <h2>{title}</h2>
      {subtitle ? <p className="section__subtitle">{subtitle}</p> : null}
      {children}
    </section>
  );
}