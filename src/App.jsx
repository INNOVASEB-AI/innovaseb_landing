import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const serviceList = [
  {
    number: "01",
    title: "AI Advisory",
    description: "Strategy, use-case mapping, and solution design."
  },
  {
    number: "02",
    title: "Operational Intelligence",
    description: "Workflow improvement, process redesign, and decision support."
  },
  {
    number: "03",
    title: "Software Solutions",
    description: "Tailored internal tools, portals, dashboards, and automation systems."
  },
  {
    number: "04",
    title: "Research & Prototyping",
    description:
      "Research workflows, data preparation, technical builds, and concept development."
  }
];

const contactEndpoint = "https://formsubmit.co/ajax/info@innovaseb.tech";

function ContactCard({ isOpen, onClose, prefersReducedMotion }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const emailInputRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;

    if (!isOpen) {
      document.body.style.overflow = "";
      root.style.overflow = "";
      setEmail("");
      setMessage("");
      setHoneypot("");
      setErrors({});
      setStatus({ type: "idle", message: "" });
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const previousRootOverflow = root.style.overflow;
    document.body.style.overflow = "hidden";
    root.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.requestAnimationFrame(() => {
      emailInputRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      root.style.overflow = previousRootOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const validate = () => {
    const nextErrors = {};

    if (!email.trim()) {
      nextErrors.email = "Enter the best address for a reply.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Use a valid email address.";
    }

    if (!message.trim()) {
      nextErrors.message = "Add a brief outline of what you need.";
    } else if (message.trim().length < 12) {
      nextErrors.message = "Add a little more context so the enquiry is useful.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const resetFieldState = (field) => {
    setStatus({ type: "idle", message: "" });
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    if (honeypot.trim()) {
      setStatus({ type: "sent", message: "Sent." });
      onClose();
      return;
    }

    const nextEmail = email.trim();
    const nextMessage = message.trim();
    const formData = new FormData();
    formData.append("email", nextEmail);
    formData.append("message", nextMessage);
    formData.append("_replyto", nextEmail);
    formData.append("_subject", "Innovaseb enquiry");
    formData.append("_honey", honeypot.trim());

    setStatus({ type: "submitting", message: "" });

    try {
      const response = await fetch(contactEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body: formData
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok || payload.success === false) {
        throw new Error(payload.message || "Submission failed.");
      }

      setEmail("");
      setMessage("");
      setHoneypot("");
      setErrors({});
      setStatus({ type: "sent", message: "Sent." });
    } catch {
      setStatus({
        type: "error",
        message: "Could not send right now. Email info@innovaseb.tech instead."
      });
    }
  };

  const dialogTransition = prefersReducedMotion
    ? { duration: 0.01 }
    : { type: "spring", stiffness: 220, damping: 24 };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="contact-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.24 }}
        >
          <motion.button
            aria-label="Close contact card"
            className="contact-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            type="button"
          />

          <motion.section
            aria-labelledby="contact-card-title"
            aria-modal="true"
            className="contact-card"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 22, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            transition={dialogTransition}
          >
            <div className="contact-card-header">
              <div>
                <h2
                  className="contact-card-title"
                  id="contact-card-title"
                >
                  Contact
                </h2>
              </div>

              <button
                aria-label="Close contact card"
                className="contact-close"
                onClick={onClose}
                type="button"
              >
                Close
              </button>
            </div>

            <p className="contact-card-copy">Email and a brief message.</p>

            <form
              className="contact-form"
              noValidate
              onSubmit={handleSubmit}
            >
              <input
                aria-hidden="true"
                autoComplete="off"
                className="contact-trap"
                name="_honey"
                onChange={(event) => setHoneypot(event.target.value)}
                tabIndex="-1"
                type="text"
                value={honeypot}
              />

              <label className="field">
                <span className="field-label">Email</span>
                <input
                  className="field-input"
                  disabled={status.type === "submitting"}
                  inputMode="email"
                  name="email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                    resetFieldState("email");
                  }}
                  placeholder="name@company.com"
                  ref={emailInputRef}
                  type="email"
                  value={email}
                />
                {errors.email ? <span className="field-error">{errors.email}</span> : null}
              </label>

              <label className="field">
                <span className="field-label">Message</span>
                <textarea
                  className="field-input field-textarea"
                  maxLength={320}
                  name="message"
                  onChange={(event) => {
                    setMessage(event.target.value);
                    resetFieldState("message");
                  }}
                  disabled={status.type === "submitting"}
                  placeholder="Brief message"
                  rows="5"
                  value={message}
                />
                {errors.message ? <span className="field-error">{errors.message}</span> : null}
              </label>

              {status.type !== "idle" ? (
                <p
                  className={`contact-status contact-status-${status.type}`}
                  role={status.type === "error" ? "alert" : "status"}
                >
                  {status.message}
                </p>
              ) : null}

              <div className="contact-card-actions">
                <button
                  className="button"
                  disabled={status.type === "submitting"}
                  type="submit"
                >
                  {status.type === "submitting" ? "Sending" : "Send"}
                </button>
                <button
                  className="ghost-button"
                  onClick={onClose}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function HeroGraphic({ prefersReducedMotion }) {
  return (
    <motion.div
      className="hero-figure"
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.16 }}
    >
      <svg
        className="hero-diagram"
        viewBox="0 0 420 420"
        aria-hidden="true"
      >
        <rect
          x="20"
          y="20"
          width="380"
          height="380"
          rx="18"
          className="diagram-frame"
        />

        <motion.g
          animate={
            prefersReducedMotion
              ? undefined
              : { rotate: [0, 4, 0, -4, 0], x: [0, 2, 0, -2, 0], y: [0, -2, 0, 2, 0] }
          }
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "210px 210px" }}
        >
          <circle
            cx="210"
            cy="210"
            r="112"
            className="diagram-ring"
          />
          <circle
            cx="210"
            cy="210"
            r="72"
            className="diagram-ring diagram-ring-inner"
          />
          <path
            d="M90 124C132 92 180 78 240 82C298 86 334 110 354 154"
            className="diagram-arc"
          />
          <path
            d="M68 270C86 320 130 350 198 356C276 362 330 332 360 274"
            className="diagram-arc"
          />
          <path
            d="M112 314L174 250L210 210L266 156L320 106"
            className="diagram-line"
          />
          <path
            d="M84 176L154 188L210 210L302 244L350 268"
            className="diagram-line diagram-line-light"
          />
          <path
            d="M146 104L192 168L210 210L226 256L276 330"
            className="diagram-line diagram-line-light"
          />
        </motion.g>

        <g className="diagram-grid">
          <path d="M58 92H144" />
          <path d="M58 112H128" />
          <path d="M276 310H362" />
          <path d="M292 330H362" />
        </g>

        <g className="diagram-labels">
          <text x="54" y="83">AI</text>
          <text x="302" y="92">OPS</text>
          <text x="56" y="338">R&amp;D</text>
          <text x="300" y="356">SOFT</text>
        </g>

        <motion.g
          animate={prefersReducedMotion ? undefined : { opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {[
            [84, 176, "small"],
            [112, 314, "small"],
            [146, 104, "small"],
            [174, 250, "small"],
            [210, 210, "core"],
            [266, 156, "small"],
            [276, 330, "small"],
            [320, 106, "small"],
            [350, 268, "small"]
          ].map(([cx, cy, kind]) => (
            <g key={`${cx}-${cy}`}>
              <circle
                cx={cx}
                cy={cy}
                r={kind === "core" ? "10" : "5"}
                className={kind === "core" ? "diagram-node-core" : "diagram-node"}
              />
              <circle
                cx={cx}
                cy={cy}
                r={kind === "core" ? "18" : "11"}
                className="diagram-node-halo"
              />
            </g>
          ))}
        </motion.g>
      </svg>
    </motion.div>
  );
}

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const [isContactCardOpen, setIsContactCardOpen] = useState(false);

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

  const openContactCard = () => {
    setIsContactCardOpen(true);
  };

  const closeContactCard = () => {
    setIsContactCardOpen(false);
  };

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
      <ContactCard
        isOpen={isContactCardOpen}
        onClose={closeContactCard}
        prefersReducedMotion={prefersReducedMotion}
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
            <button
              className="nav-link"
              onClick={openContactCard}
              type="button"
            >
              Contact
            </button>
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
              STRATEGY · SYSTEMS · AUTOMATION · AI
            </motion.p>

            <motion.h1
              className="hero-title"
              initial={enterUp}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.06 }}
            >
              <span>Problems solved,</span>
              <br />
              systems built.
            </motion.h1>

            <motion.p
              className="hero-body"
              initial={enterUp}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12 }}
            >
              Innovaseb helps organisations turn business challenges into clear
              strategies, practical systems, and tailored digital solutions.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={enterUp}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18 }}
            >
              <button
                className="button"
                onClick={openContactCard}
                type="button"
              >
                Let&apos;s solve it
              </button>
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
            <HeroGraphic prefersReducedMotion={prefersReducedMotion} />
            <div className="hero-meta">
              <p className="side-label">Scope</p>
              <p className="side-note">
                Broad advisory and execution support across operations, software,
                automation, and research-led work.
              </p>
            </div>
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
              For organisations seeking clarity, systems, and practical
              solutions.
            </p>
          </div>

          <div className="contact-actions">
            <button
              className="contact-link contact-open"
              onClick={openContactCard}
              type="button"
            >
              Open contact card
            </button>
            <a
              className="contact-email"
              href="mailto:info@innovaseb.tech"
            >
              info@innovaseb.tech
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}
