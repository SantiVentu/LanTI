import Nav from "@/components/Nav/Nav";
import Sky from "@/components/Sky/Sky";
import Stage from "@/components/Stage/Stage";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import Hero2 from "@/components/Hero2/Hero2";

export default function Home() {
  return (
    <>
      {/* No renderiza nada: lleva el fondo del mediodía a la noche a lo largo del scroll */}
      <Sky />
      <Nav />
      <Hero2 />
      {/* About2 y Services viven acá dentro: una misma escena, no dos secciones apiladas */}
      <Stage />
      <Contact />
      <Footer />
    </>
  );
}
