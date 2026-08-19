import styles from "./About2.module.css";

// Presentacional: la animación la orquesta el Stage que lo contiene (ver about2Phase.ts).
export default function About2() {
  return (
    <section className={styles.about2}>
      <div className={styles.content}>
        <p className={styles.kicker}>Lanti - Estudio Digital</p>

        {/* Statement en dos renglones enmascarados: uno entra por izquierda, otro por derecha */}
        <h2 className={styles.statement}>
          <span className={styles.mask}>
            <span className={`${styles.maskInner} ${styles.lineLeft}`}>
              Cuando la <span className={styles.accent2}>tecnologia</span>
            </span>
          </span>
          <span className={styles.mask}>
            <span className={`${styles.maskInner} ${styles.lineRight}`}>
              y el <span className={styles.accent}>diseño</span> se unen.
            </span>
          </span>
        </h2>

        {/* Bloque que sube desde abajo al continuar el scroll */}
        <div className={styles.reveal}>
          <div className={styles.revealInner}>
            <p className={styles.lead}>
              Lo mejor de ambos mundos y es lo que nos gusta hacer: programar{" "}
              <b>soluciones</b> y diseñar <b>experiencias</b>. En un mundo donde la
              IA propone, Lanti dispone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
