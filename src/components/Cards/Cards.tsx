import Image from "next/image";
import styles from "./Cards.module.css";

interface Step {
  title: string;
  description: string;
  icon: string;
}

const steps: Step[] = [
  {
    title: "Descubrimiento",
    description: "Agendamos una reunión para conocer tu negocio, entender tus objetivos y detectar oportunidades.",
    icon: "/imagenes/iconos/lamparita.webp",
  },
  {
    title: "Definimos",
    description: "Analizamos los requerimientos, proponemos el alcance del proyecto y presentamos una propuesta y plan de trabajo.",
    icon: "/imagenes/iconos/lupita.webp",
  },
  {
    title: "Construimos",
    description: "Desarrollamos e integramos la solución trabajando de forma colaborativa, con avances visibles y revisiones durante todo el proceso.",
    icon: "/imagenes/iconos/martillito.webp",
  },
  {
    title: "Disfrutá los resultados",
    description: "Realizamos ajustes finales y te acompañamos para asegurar resultados reales y una creación exitosa.",
    icon: "/imagenes/iconos/estadisticas.webp",
  },
];


// Grilla de cards. La animación la maneja la sección contenedora vía [data-card].
export default function Cards() {
  return (
    <div className={styles.cards}>
      {steps.map((step) => (
        <article key={step.title} className={styles.card} data-card>
          <span className={styles.cardIcon}>
            <Image src={step.icon} alt={step.title} width={90} height={90} />
          </span>
          <h4 className={styles.cardTitle}>{step.title}</h4>
          <p className={styles.cardDesc}>{step.description}</p>
        </article>
      ))}
    </div>
  );
}
