import { ReactNode } from 'react';

type SectionProps = {
  id: string;
  title: string;
  commandLabel?: string;
  subtitle?: string;
  children: ReactNode;
};

export function Section({ id, title, commandLabel, subtitle, children }: SectionProps) {
  return (
    <section className="section" id={id}>
    {commandLabel ? <p className="section__command">{commandLabel}</p> : null}
      <h2>{title}</h2>
      {subtitle ? <p className="section__subtitle">{subtitle}</p> : null}
      {children}
    </section>
  );
}