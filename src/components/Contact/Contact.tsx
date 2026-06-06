"use client";

import { motion } from "framer-motion";
import styles from "./Contact.module.css";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const contactLinks = [
  {
    mark: "W",
    label: "WhatsApp Business",
    detail: "Escribinos ahora",
    href: "https://wa.me/5491126629979",
    primary: true,
  },
  {
    mark: "@",
    label: "Email",
    detail: "hola@lanti.com.ar",
    href: "mailto:hola@lanti.com.ar",
    primary: false,
  },
  {
    mark: "in",
    label: "LinkedIn",
    detail: "/company/lanti",
    href: "https://linkedin.com/company/lanti",
    primary: false,
  },
];

export default function Contact() {
  return (
    <section className={styles.contact} id="contacto">
      <div className={styles.container}>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          Me convencieron,
          <br />
          <span className={styles.highlight}>quiero trabajar con ustedes.</span>
        </motion.h2>

        <motion.p
          className={styles.subtext}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.14, ease: EASE }}
        >
          Escribinos y empecemos a co-crear.
        </motion.p>

        <motion.div
          className={styles.links}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.28, ease: EASE }}
        >
          {contactLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className={`${styles.contactLink} ${link.primary ? styles.contactLinkPrimary : ""}`}
            >
              <span className={styles.linkMark} aria-hidden>{link.mark}</span>
              <div className={styles.linkText}>
                <span className={styles.linkLabel}>{link.label}</span>
                <span className={styles.linkDetail}>{link.detail}</span>
              </div>
              <span className={styles.linkArrow} aria-hidden>↗</span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
