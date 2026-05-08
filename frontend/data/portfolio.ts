export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  highlights: string[];
};

export type ProjectItem = {
  name: string;
  type: string;
  description: string;
  stack: string[];
  status?: string;
};

export type StackGroup = {
  title: string;
  items: string[];
};

export const profile = {
  name: 'Ignacio Fayos Gómez',
  role: 'Desarrollador Backend',
  headline: 'Backend Developer especializado en Laravel, APIs REST y PostgreSQL.',
  about:
    'Soy desarrollador backend con experiencia en entornos reales construyendo APIs, lógica de negocio e integraciones con servicios externos. Me enfoco en resolver problemas de producto de forma mantenible, con una base sólida en Laravel y bases de datos relacionales. Vengo de una transición profesional hacia el desarrollo, y esa etapa me ha ayudado a trabajar con criterio, priorizar bien y comunicarme con equipos técnicos y de negocio.',
  contact: {
    email: 'nachofayosg@gmail.com',
    linkedin: 'www.linkedin.com/in/nachofayosgomez',
    github: 'https://github.com/NachoFayos',
    cvUrl: '/cv/cv_actualizado.pdf'
  }
};

export const experiences: ExperienceItem[] = [
  {
    company: 'Lion Capital Group',
    role: 'Desarrollador Backend',
    period: '09/2025 - 04/2026',
    highlights: [
      'Desarrollo de APIs REST y lógica de negocio con Laravel para un ERP interno de gestión inmobiliaria.',
      'Modelado y mantenimiento de datos con PostgreSQL y PostGIS para funcionalidades geográficas.',
      'Integración con servicios externos como Idealista, Google Maps y herramientas internas de negocio.',
      'Automatización de procesos asíncronos mediante Redis y jobs de Laravel.',
      'Trabajo en equipo con Docker, Git, ramas y pull requests.'
    ]
  },
  {
    company: 'Sodire',
    role: 'Desarrollador Backend',
    period: '03/2025 - 06/2025',
    highlights: [
      'Desarrollo de un chatbot comercial con IA integrado en entorno web.',
      'Implementación de backend con Python, Flask, PHP y MySQL.',
      'Generación dinámica de presupuestos PDF a partir del flujo conversacional.',
      'Integración de formularios comerciales, automatización de procesos y envío de correos.'
    ]
  }
];

export const projects: ProjectItem[] = [
  {
    name: 'Petra App',
    type: 'Proyecto personal en desarrollo',
    description:
      'Plataforma para centralizar la gestión de mascotas, documentación veterinaria y alertas de pérdida, con backend orientado a API, autenticación segura y flujos pensados para casos reales de uso.',
    stack: ['Laravel', 'PostgreSQL', 'Sanctum', 'APIs REST'],
    status: 'En desarrollo'
  },
  {
    name: 'Chatbot comercial con IA',
    type: 'Caso de estudio',
    description:
      'Chatbot integrado en entorno web para captación comercial, soporte inicial y generación automatizada de presupuestos en PDF.',
    stack: ['Python', 'Flask', 'PHP', 'MySQL', 'IA generativa', 'PDF']
  },
  {
    name: 'Portfolio personal full stack',
    type: 'Proyecto público',
    description:
      'Portfolio profesional con frontend en Next.js y backend Laravel API, planteado como proyecto full stack para presentar experiencia, stack y casos técnicos.',
    stack: ['Next.js', 'TypeScript', 'Laravel', 'PostgreSQL']
  }
];

export const stackGroups: StackGroup[] = [
  { title: 'Backend', items: ['PHP', 'Laravel', 'Python', 'Flask', 'Node.js'] },
  { title: 'Bases de datos', items: ['PostgreSQL', 'PostGIS', 'MySQL', 'MongoDB'] },
  { title: 'Herramientas', items: ['Docker', 'Redis', 'Git', 'GitHub', 'Bitbucket'] },
  {
    title: 'Integraciones',
    items: ['APIs REST', 'IA generativa', 'Servicios externos', 'Generación PDF']
  }
];