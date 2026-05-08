import { ReactNode } from 'react';

type SectionProps = {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function Section({ id, title, subtitle, children }: SectionProps) {
  return (
    <section className="section" id={id}>
      <h2>{title}</h2>
      {subtitle ? <p className="section__subtitle">{subtitle}</p> : null}
      {children}
    </section>
  );
}