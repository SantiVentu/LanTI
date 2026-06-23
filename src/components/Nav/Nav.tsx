import styles from "./Nav.module.css";

interface NavLink {
  label: string;
  href: string;
}

const links: NavLink[] = [
  { label: "nosotros", href: "#nosotros" },
  { label: "servicios", href: "#servicios" },
  { label: "proceso", href: "#nosotros" },
];

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <a href="#inicio" className={styles.brand}>LanTI</a>

        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} className={styles.link}>{link.label}</a>
            </li>
          ))}
          <li>
            <a href="#contacto" className={`${styles.link} ${styles.cta}`}>trabajemos juntos</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
