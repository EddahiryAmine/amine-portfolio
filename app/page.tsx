import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import About from "@/components/sections/About";
import Hero from "@/components/sections/Hero";
import Resume from "@/components/sections/Resume";
import Contact from "@/components/sections/Contact";
import Navbar from "@/components/layout/Navbar";
import Certifications from "@/components/sections/Certifications";
import SectionSeparator from "@/components/ui/SectionSeparator";
export default function Home() {
  return (
    <>
      <SectionSeparator />
    <Navbar/>
    <Hero/>
    <About/>
    <Skills/>
    <Projects/>
    <Certifications/>
    <Resume/>
    <Contact/>

    </>

  );
}

