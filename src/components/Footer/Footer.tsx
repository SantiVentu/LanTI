import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <p className={styles.logo}>
            LanTI<span className={styles.dot}>.</span>
          </p>
          <p className={styles.tagline}>Tecnología con propósito.</p>
        </div>

        <nav className={styles.navGroup} aria-label="Footer">
          <p className={styles.navTitle}>Secciones</p>
          <a href="#servicios" className={styles.link}>Servicios</a>
          <a href="#nosotros" className={styles.link}>Nosotros</a>
          <a href="#contacto" className={styles.link}>Contacto</a>
        </nav>

        <div className={styles.navGroup}>
          <p className={styles.navTitle}>Contacto</p>
          <a href="mailto:hola@lanti.com.ar" className={styles.link}>hola@lanti.com.ar</a>
          <a
            href="https://linkedin.com/company/lanti"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copy}>© {year} LanTI. Todos los derechos reservados.</p>
        <a href="#" className={styles.scrollTop} aria-label="Volver arriba">↑</a>
      </div>
    </footer>
  );
}
