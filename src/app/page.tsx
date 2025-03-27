import About from "./components/sections/About";
import Contact from "./components/sections/Contact";
import Experience from "./components/sections/Experience";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import Footer from "./components/shared/Footer";
import Navbar from "./components/shared/Navbar";

export default function Home() {
  return (
    <>
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content with all sections */}
      <main className="min-h-screen">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>

      {/* Footer at the bottom */}
      <Footer />
    </>
  );
}
