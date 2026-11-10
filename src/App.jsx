import React from 'react';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SelectedWork } from './components/SelectedWork';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { TrustSection } from './components/TrustSection';
import { ContactForm } from './components/ContactForm';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="portfolio-app">
      {/* Dynamic Creative Custom Cursor */}
      <CustomCursor />

      {/* Top Reading Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* 1. Fixed Navigation */}
      <Navbar />

      <main id="main-content">
        {/* 2. Hero Introduction */}
        <Hero />

        {/* 3. Selected Work (Projects & Case Studies) */}
        <SelectedWork />

        {/* 4. About Me (Story, Journey & Credentials) */}
        <About />

        {/* 5. Capability Matrix & Tools */}
        <Skills />

        {/* 6. Services & Engagements */}
        <Services />

        {/* 7. Work Methodology & Process */}
        <Process />

        {/* 8. Trust & Collaboration Ethos */}
        <TrustSection />

        {/* 9. Contact & Project Inquiry Form */}
        <ContactForm />
      </main>

      {/* Persistent WhatsApp Contact Widget */}
      <WhatsAppButton />

      {/* Footer & Closing Statements */}
      <Footer />
    </div>
  );
}
