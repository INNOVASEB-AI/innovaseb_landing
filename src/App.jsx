import { motion, useReducedMotion } from "framer-motion";

const serviceList = [
  {
    number: "01",
    title: "AI Consulting"
  },
  {
    number: "02",
    title: "Office Administration Expertise"
  },
  {
    number: "03",
    title: "Software Solutions"
  },
  {
    number: "04",
    title: "Research & Prototyping Support",
    description:
      "Technical support for researchers and innovators, including prototype development and implementation assistance."
  }
];

export default function App() {
  const prefersReducedMotion = useReducedMotion();

  const ambientShift = prefersReducedMotion
    ? undefined
    : { x: [0, 8, 0], y: [0, 6, 0] };

  const glowLeft = prefersReducedMotion
    ? undefined
    : { x: [0, 24, 0], y: [0, -12, 0] };

  const glowRight = prefersReducedMotion
    ? undefined
    : { x: [0, -18, 0], y: [0, 14, 0] };

  const enterUp = prefersReducedMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 24 };

  return (
    <main className="landing">
      <motion.div
        aria-hidden="true"
        className="bg-grid"
        animate={ambientShift}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="bg-sheen"
        animate={prefersReducedMotion ? undefined : { opacity: [0.03, 0.05, 0.03] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="bg-orb bg-orb-left"
        animate={glowLeft}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="bg-orb bg-orb-right"
        animate={glowRight}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <section className="shell">
        <header className="header">
          <a
            className="brand"
            href="#top"
          >
            Innovaseb
          </a>

          <nav className="nav">
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <section
          className="hero"
          id="top"
        >
          <div className="hero-copy">
            <motion.p
              className="eyebrow"
              initial={enterUp}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              AI · Operations · Software · Research Support
            </motion.p>

            <motion.h1
              className="hero-title"
              initial={enterUp}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.06 }}
            >
              Smarter systems.
              <br />
              Less friction.
            </motion.h1>

            <motion.p
              className="hero-body"
              initial={enterUp}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12 }}
            >
              Innovaseb helps organisations improve operations through AI
              consulting, operational expertise, software solutions, and
              research-focused technical support.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={enterUp}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18 }}
            >
              <a
                className="button button-primary"
                href="#contact"
              >
                Contact
              </a>
              <a
                className="text-link"
                href="#services"
              >
                Services
              </a>
            </motion.div>
          </div>

          <motion.aside
            className="hero-side"
            initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            <p className="side-label">Scope</p>
            <p className="side-note">
              Consulting and implementation support across AI, operations,
              software, and research-led technical work.
            </p>
          </motion.aside>
        </section>

        <section
          className="services"
          id="services"
        >
          <div className="section-label">
            <p>Services</p>
          </div>

          <div className="service-grid">
            {serviceList.map((service, index) => (
              <motion.article
                className="service-row"
                key={service.title}
                initial={enterUp}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.24 + index * 0.08 }}
              >
                <div className="service-index">
                  <p className="service-number">{service.number}</p>
                </div>
                <div className="service-copy">
                  <h2>{service.title}</h2>
                  {service.description ? <p className="service-body">{service.description}</p> : null}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section
          className="contact"
          id="contact"
        >
          <div>
            <p className="section-heading">Contact</p>
            <p className="contact-copy">
              For consulting, implementation, or collaboration enquiries.
            </p>
          </div>

          <a
            className="contact-link"
            href="mailto:hello@innovaseb.com"
          >
            hello@innovaseb.com
          </a>
        </section>
      </section>
    </main>
  );
}
