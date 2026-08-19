import Nav from "@/components/Nav/Nav";
import Hero from "@/components/Hero/Hero";
import Services from "@/components/Services/Services";
import About2 from "@/components/About2/About2";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import Hero2 from "@/components/Hero2/Hero2";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero2 />
      <About2 />
      <Services />
      <Contact />
      <Footer />
    </>
  );
}
