import { Section } from '@/components/section';
import { experiences, profile, projects, stackGroups } from '@/data/portfolio';


type QuickLink = {
  label: string;
  href: string;
  external?: boolean;
};

const quickLinks: QuickLink[] = [
  { label: 'Ver proyectos', href: '#proyectos' },
  { label: 'Descargar CV', href: profile.contact.cvUrl, external: true },
  { label: 'Contactar', href: '#contacto' }
];

export default function HomePage() {
  return (
    <main className="portfolio">
      <section className="hero" id="inicio">
        <p className="hero__eyebrow">Backend Developer</p>
        <h1>{profile.name}</h1>
        <p className="hero__role">{profile.role}</p>
        <p className="hero__headline">{profile.headline}</p>
        <nav className="hero__actions" aria-label="Acciones principales">
          {quickLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="button"
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noreferrer' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </section>

      <Section id="sobre-mi" title="Sobre mí">
        <p>{profile.about}</p>
      </Section>

      <Section id="experiencia" title="Experiencia">
        <div className="card-grid">
          {experiences.map((experience) => (
            <article className="card" key={experience.company}>
              <header>
                <h3>{experience.company}</h3>
                <p className="card__meta">
                  {experience.role} · {experience.period}
                </p>
              </header>
              <ul>
                {experience.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section id="proyectos" title="Proyectos">
        <div className="card-grid">
          {projects.map((project) => (
            <article className="card" key={project.name}>
              <header>
                <h3>{project.name}</h3>
                <p className="card__meta">{project.type}</p>
              </header>
              <p>{project.description}</p>
              <p className="tag-list">
                {project.stack.map((tech) => (
                  <span className="tag" key={tech}>
                    {tech}
                  </span>
                ))}
              </p>
              {project.status ? <p className="status">Estado: {project.status}</p> : null}
            </article>
          ))}
        </div>
      </Section>

      <Section id="stack" title="Stack técnico">
        <div className="card-grid card-grid--compact">
          {stackGroups.map((group) => (
            <article className="card" key={group.title}>
              <h3>{group.title}</h3>
              <ul className="list-inline">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section id="contacto" title="Contacto" subtitle="Disponible para oportunidades backend y colaboración técnica.">
        <div className="contact-grid">
          <div className="card">
            <h3>Canales</h3>
            <ul className="contact-links">
              <li><a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a></li>
              <li><a href={profile.contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href={profile.contact.github} target="_blank" rel="noreferrer">GitHub</a></li>
              <li><a href={profile.contact.cvUrl} target="_blank" rel="noreferrer">Descargar CV</a></li>
            </ul>
          </div>
          <form className="card contact-form" aria-label="Formulario de contacto">
            <h3>Escríbeme</h3>
            <label>
              Nombre
              <input type="text" name="name" placeholder="Tu nombre" />
            </label>
            <label>
              Email
              <input type="email" name="email" placeholder="tu@email.com" />
            </label>
            <label>
              Mensaje
              <textarea name="message" rows={5} placeholder="Cuéntame en qué puedo ayudarte" />
            </label>
            <button type="button" className="button button--muted" disabled>
              Formulario en preparación
            </button>
          </form>
        </div>
      </Section>
    </main>
  );
}