import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import ExtraCurricular from "@/components/ExtraCurricular";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.body.classList.add('font-opensans', 'text-gray-800', 'bg-light');
    
    // Add CSS for timeline and other custom styles
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      .timeline-item {
        position: relative;
        padding-left: 2rem;
        margin-bottom: 2rem;
      }
      .timeline-item::before {
        content: '';
        position: absolute;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: #3498db;
        left: 0;
        top: 0.25rem;
      }
      .timeline-item::after {
        content: '';
        position: absolute;
        width: 2px;
        height: calc(100% + 1rem);
        background-color: #e9ecef;
        left: 0.5rem;
        top: 0.85rem;
        transform: translateX(-50%);
      }
      .timeline-item:last-child::after {
        display: none;
      }
      .bg-pattern {
        position: relative;
      }
      .bg-pattern::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #f8f9fa;
        background-image: radial-gradient(#3498db 0.5px, transparent 0.5px);
        background-size: 20px 20px;
        opacity: 0.5;
        z-index: 0;
      }
      @media (max-width: 768px) {
        .timeline-item {
          padding-left: 1.5rem;
        }
        .timeline-item::before {
          width: 0.75rem;
          height: 0.75rem;
        }
        .timeline-item::after {
          left: 0.375rem;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
      document.body.classList.remove('font-opensans', 'text-gray-800', 'bg-light');
    };
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <ExtraCurricular />
      <Contact />
      <Footer />
      <BackToTop />
    </>
  );
};

export default Home;
