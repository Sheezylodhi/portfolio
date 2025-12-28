"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import WhyHireMe from "@/components/WhyHireMe";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import Loader from "@/components/Loader";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";
import GlobalBackground from "@/components/GlobalBackground";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <GlobalBackground />
      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      <main className="pt-0 pb-0 relative z-10  max-w-full">
        <Section id="hero" fullScreen>
          <Hero />
        </Section>

        <Section id="about" >
          <About />
        </Section>

        <Section id="skills">
          <Skills />
        </Section>

        <Section id="experience" >
          <Experience />
        </Section>

        <Section id="services" >
          <Services />
        </Section>

        <Section id="projects">
          <Projects />
        </Section>

        <Section id="whyhireme" >
          <WhyHireMe />
        </Section>

        <Section id="contact">
          <Contact />
        </Section>

         <ContactCTA />

      </main>
    </>
  );
}
