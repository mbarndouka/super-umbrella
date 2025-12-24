import React from 'react';
import dynamic from 'next/dynamic';
import Footer from '../components/footer/Footer';
import Header from '../components/header/header';
import { HomeSection } from '../components/home';
import About from './about/page';
import Skills from './skills/page';

// Lazy load heavier sections with better loading states
const Qualification = dynamic(() => import('./qualification/qualification'), {
  loading: () => <div className="section-loading">Loading...</div>,
});
const Portfolio = dynamic(() => import('./portfolio/page'), {
  loading: () => <div className="section-loading">Loading...</div>,
});
const Contact = dynamic(() => import('./contact/page'), {
  loading: () => <div className="section-loading">Loading...</div>,
});

export default function Home() {
  return (
    <main>
      <Header />
      {/* Main content sections */}
      <HomeSection />
      <About />
      <Skills />
      <Qualification />
      <Portfolio />
      <Contact />
      <Footer />
    </main>
  );
}
