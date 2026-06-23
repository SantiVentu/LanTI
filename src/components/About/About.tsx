import Cards from "./Cards";
import Pills from "./Pills";
import styles from "./About.module.css";

export default function About() {
  return (
    <section className={styles.about} id="nosotros" >
      {/* Píldoras decorativas: bajan con el scroll desde arriba hasta "¡Empezar es fácil!" */}
      <Pills />

      {/* Bienvenida + propuesta de valor */}
      <div className={styles.intro} >
        <span className={styles.welcome}>¡Bienvenido/a!</span>
        <div className={styles.headlineWrap}>
          <h2 className={styles.headline} data-cards-end>
            Ayudamos a empresas y equipos a convertir ideas y necesidades comerciales en
            experiencias digitales que simplifican el trabajo diario y potencian el crecimiento.
          </h2 >
        </div>
      </div >

      {/* Pasos del proceso */}
      <div className={styles.steps} >
        <header className={styles.stepsHeader} data-pills-end>
          <h3 className={styles.stepsTitle}>¡ Empezar es fácil !</h3>
          <p className={styles.stepsSubtitle} >Te acompañamos en el recorrido paso a paso</p>
        </header>

        <Cards />
      </div >
    </section>
  );
}
