import styles from "./Services.module.css";
import Cards from "@/components/Cards/Cards";

// Presentacional: la animación la orquesta el Stage que lo contiene (ver servicesPhase.ts).
export default function Services() {
  return (
    <section className={styles.services}>
      <div className={styles.content}>
        {/* Dos palabras, una por costado: entran cruzándose hacia el centro, en espejo de
            cómo se van los renglones de About2 */}
        <h2 className={styles.title}>
          <span className={styles.wordLeft}>Nuestros</span>
          <span className={styles.wordRight}>servicios</span>
        </h2>
        <Cards />
      </div>
    </section>
  );
}
