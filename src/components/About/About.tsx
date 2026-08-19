import Cards from "../Cards/Cards";
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
            Transformamos ideas en productos digitales funcionales y atractivos, 
            desde la identidad visual hasta el desarrollo de software a medida.
            Diseñamos y construimos soluciones digitales pensadas para potenciar marcas y simplificar procesos.
            Ayudamos a empresas y emprendedores a convertir sus ideas en soluciones digitales modernas, 
            funcionales y con identidad propia.
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
