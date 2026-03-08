import { motion, useReducedMotion } from "framer-motion";

const serviceCards = [
  {
    number: "01",
    title: "AI Advisory",
    description:
      "Opportunity mapping, workflow redesign, and practical AI adoption plans that reduce busywork instead of adding more tools."
  },
  {
    number: "02",
    title: "Operational Systems",
    description:
      "Back-office structure, documentation, and administration processes that keep teams aligned when work starts moving fast."
  },
  {
    number: "03",
    title: "Custom Software",
    description:
      "Internal dashboards, automations, and client-facing products built around the exact way your business already operates."
  }
];

const approachSteps = [
  {
    title: "Audit the friction",
    body: "We identify repeat work, gaps between tools, and the points where decisions slow down."
  },
  {
    title: "Design the system",
    body: "We shape a lean operating model with the right mix of AI workflows, process, and software."
  },
  {
    title: "Ship with clarity",
    body: "You get implementation support, clean handover documentation, and a setup that can actually be maintained."
  }
];

const proofPoints = [
  "AI strategy grounded in real operational constraints",
  "Administration expertise for teams that need structure",
  "Software delivery without enterprise overhead"
];

export default function App() {
  const prefersReducedMotion = useReducedMotion();

  const floatingAnimation = prefersReducedMotion
    ? undefined
    : { x: [0, 30, 0], y: [0, -18, 0] };

  const floatingAnimationRight = prefersReducedMotion
    ? undefined
    : { x: [0, -18, 0], y: [0, 20, 0] };

  const gridAnimation = prefersReducedMotion
    ? undefined
    : { x: [0, 10, 0], y: [0, 8, 0] };

  const fadeUp = prefersReducedMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 24 };

  return (
    <main className="page-shell">
      <motion.div
        aria-hidden="true"
        className="page-glow page-glow-left"
        animate={floatingAnimation}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="page-glow page-glow-right"
        animate={floatingAnimationRight}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="page-grid"
        animate={gridAnimation}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="page-frame">
        <header className="site-header">
          <a
            className="brand"
            href="#top"
          >
            <span className="brand-mark">IN</span>
            <span className="brand-name">Innovaseb</span>
          </a>

          <nav className="site-nav">
            <a href="#services">Services</a>
            <a href="#approach">Approach</a>
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
              initial={fadeUp}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              AI · Operations · Software
            </motion.p>

            <motion.h1
              className="hero-title"
              initial={fadeUp}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
            >
              Smarter systems.
              <br />
              <span>Less friction.</span>
            </motion.h1>

            <motion.p
              className="hero-body"
              initial={fadeUp}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
            >
              Innovaseb helps growing businesses bring order to operations,
              apply AI where it genuinely helps, and build the software needed
              to scale with less manual drag.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={fadeUp}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
            >
              <a
                className="button button-primary"
                href="mailto:hello@innovaseb.tech"
              >
                Start a conversation
              </a>
              <a
                className="button button-secondary"
                href="#services"
              >
                Explore services
              </a>
            </motion.div>
          </div>

          <motion.aside
            className="hero-panel"
            initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
          >
            <p className="panel-label">What we bring</p>
            <ul className="proof-list">
              {proofPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>

            <div className="hero-stat-grid">
              <div>
                <strong>Ops-first</strong>
                <span>Solutions shaped around real workflow constraints.</span>
              </div>
              <div>
                <strong>Lean delivery</strong>
                <span>Built for teams that need momentum, not bureaucracy.</span>
              </div>
            </div>
          </motion.aside>
        </section>

        <section
          className="strip"
          aria-label="Company focus"
        >
          <span>AI workflow design</span>
          <span>Administration systems</span>
          <span>Internal tools</span>
          <span>Automation strategy</span>
        </section>

        <section
          className="content-section"
          id="services"
        >
          <div className="section-heading">
            <p className="section-kicker">Services</p>
            <h2>Three ways to reduce drag and make the business easier to run.</h2>
          </div>

          <div className="service-grid">
            {serviceCards.map((service, index) => (
              <motion.article
                key={service.title}
                className="service-card"
                initial={fadeUp}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <p className="service-number">{service.number}</p>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section
          className="content-section approach-grid"
          id="approach"
        >
          <div className="section-heading">
            <p className="section-kicker">Approach</p>
            <h2>Clear structure before complexity.</h2>
            <p className="section-copy">
              The goal is not to automate everything. The goal is to build a
              sharper operating system for the work that actually matters.
            </p>
          </div>

          <div className="approach-list">
            {approachSteps.map((step, index) => (
              <motion.article
                key={step.title}
                className="approach-card"
                initial={fadeUp}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <span className="step-index">0{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section
          className="contact-panel"
          id="contact"
        >
          <div>
            <p className="section-kicker">Contact</p>
            <h2>Let&apos;s design a business that runs with less friction.</h2>
          </div>

          <div className="contact-actions">
            <p>
              Based in South Africa, working remotely with teams that need
              stronger systems, clearer workflows, and practical AI adoption.
            </p>
            <a
              className="button button-primary"
              href="mailto:hello@innovaseb.tech"
            >
              hello@innovaseb.tech
            </a>
          </div>
        </section>

        <footer className="site-footer">
          <span>Innovaseb</span>
          <span>AI consulting, operations expertise, and software systems.</span>
        </footer>
      </div>
    </main>
  );
}
