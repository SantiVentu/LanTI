import Nav from "@/components/Nav/Nav";
import Hero from "@/components/Hero/Hero";
import Services from "@/components/Services/Services";
import About from "@/components/About/About";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Services />
      <Contact />
      <Footer />
    </>
  );
}
