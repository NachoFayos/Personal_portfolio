import { Section } from '@/components/section';
import { experiences, profile, projects, stackGroups } from '@/data/portfolio';

type QuickLink = {
  label: string;
  href: string;
  external?: boolean;
};

const topLinks: QuickLink[] = [
  { label: './inicio', href: '#inicio' },
  { label: './cv', href: '#experiencia' },
  { label: './stack', href: '#stack' },
  { label: './proyectos', href: '#proyectos' }
];

export default function HomePage() {
  const aboutLines = profile.about.split('. ').filter(Boolean);

  return (
    <>
      <header className="topbar" aria-label="Barra principal">
        <div className="topbar__inner">
          <div className="topbar__identity">
            <p className="topbar__mark" aria-hidden="true">
              IF
            </p>

            <div>
              <p className="topbar__path">~/ignacio-fayos</p>
            </div>
          </div>

          <nav className="topbar__links" aria-label="Enlaces rápidos">
            {topLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="portfolio" id="inicio">
      <section className="intro-window" aria-labelledby="hero-title">
        <header className="intro-window__bar">
          <p className="intro-window__title">nacho@portfolio:~</p>

          <div className="intro-window__controls" aria-hidden="true">
            <span className="window-control">
              <span className="window-control__minimize-icon">—</span>
            </span>

            <span className="window-control">
              <span className="window-control__maximize-icon">□</span>
            </span>

            <span className="window-control window-control--close">
              <span className="window-control__close-icon">×</span>
            </span>
          </div>
        </header>

        <div className="intro-window__body">
          <div className="intro-window__line">
            <p className="section__command">$ whoami</p>
            <h1 id="hero-title" className="intro-window__name">
              {profile.name}
            </h1>
          </div>

          <div className="intro-window__line">
            <p className="section__command">$ cat role.txt</p>
            <p className="intro-window__output">{profile.headline}</p>
          </div>

          <div className="intro-window__line">
            <p className="section__command">$ echo $LOCATION</p>
            <p className="intro-window__output">Valencia, España</p>
          </div>

          <div className="intro-window__line">
            <p className="section__command">$ cat about.md</p>
            <div className="terminal-copy" aria-label="Descripción profesional">
              {aboutLines.map((line) => (
                <p key={line}>{line.trim().endsWith('.') ? line.trim() : `${line.trim()}.`}</p>
              ))}
            </div>

            <p className="intro-window__prompt-end" aria-hidden="true">
              $<span className="cursor">▋</span>
            </p>
          </div>
        </div>
      </section>

        <Section id="sobre-mi" title="Sobre mí" commandLabel="$ cat about.md" variant="about">
          <div className="terminal-copy" aria-label="Descripción profesional">
            {aboutLines.map((line) => (
              <p key={line}>{line.trim().endsWith('.') ? line.trim() : `${line.trim()}.`}</p>
            ))}
          </div>
        </Section>

        <Section
          id="experiencia"
          title="Experiencia"
          commandLabel="$ ls experiencia/"
          variant="experience"
        >
          <div className="flow-list">
            {experiences.map((experience) => (
              <article className="entry entry--experience" key={experience.company}>
                <header className="entry__header entry__header--split">
                  <div>
                    <h3>{experience.company}</h3>
                    <p className="entry__meta">{experience.role}</p>
                  </div>

                  <p className="entry__meta entry__meta--period">{experience.period}</p>
                </header>

                <ul className="entry__list">
                  {experience.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="proyectos"
          title="Proyectos"
          commandLabel="$ ls proyectos --featured"
          variant="projects"
        >
          <div className="flow-list projects-grid">
            {projects.map((project) => (
              <article className="entry entry--project" key={project.name}>
                <header className="entry__header">
                  <h3>{project.name}</h3>
                  <p className="entry__meta">{project.type}</p>
                </header>

                <p>{project.description}</p>

                <ul className="tag-list" aria-label={`Tecnologías usadas en ${project.name}`}>
                  {project.stack.map((tech) => (
                    <li className="tag" key={tech}>
                      {tech}
                    </li>
                  ))}
                </ul>

                {project.status ? <p className="status">status: {project.status}</p> : null}
              </article>
            ))}
          </div>
        </Section>

        <Section id="stack" title="Stack técnico" commandLabel="$ stack --list" variant="stack">
          <div className="flow-list">
            {stackGroups.map((group) => (
              <article className="entry" key={group.title}>
                <h3>{group.title}</h3>

                <ul className="inline-list">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="contacto"
          title="Contacto"
          commandLabel="$ contact --info"
          subtitle="Disponible para oportunidades backend y colaboración técnica."
          variant="contact"
        >
          <div className="contact-grid">
            <div className="entry">
              <h3>canales</h3>

              <dl className="contact-table">
                <div>
                  <dt>email</dt>
                  <dd>
                    <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>
                  </dd>
                </div>

                <div>
                  <dt>linkedin</dt>
                  <dd>
                    <a href={profile.contact.linkedin} target="_blank" rel="noreferrer">
                      /linkedin
                    </a>
                  </dd>
                </div>

                <div>
                  <dt>github</dt>
                  <dd>
                    <a href={profile.contact.github} target="_blank" rel="noreferrer">
                      /github
                    </a>
                  </dd>
                </div>

                <div>
                  <dt>cv</dt>
                  <dd>
                    <a href={profile.contact.cvUrl} target="_blank" rel="noreferrer">
                      ./cv.pdf
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <form className="entry contact-form" aria-label="Formulario de contacto">
              <h3>mensaje.txt</h3>

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
                ./send-message --pending
              </button>
            </form>
          </div>
        </Section>
      </main>
    </>
  );
}