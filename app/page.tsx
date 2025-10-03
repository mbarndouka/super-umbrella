'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import Footer from '../components/footer/Footer';
import Header from '../components/header/header';
import HomeSection from './home/page'; // Keep home static as it's first
import About from './about/page'; // Keep about static
import Skills from './skills/page'; // Keep skills static

// Lazy load heavier sections
const Qualification = dynamic(() => import('./qualification/qualification'), {
  loading: () => <div>Loading...</div>,
});
const Portfolio = dynamic(() => import('./portfolio/page'), {
  loading: () => <div>Loading...</div>,
});
const Contact = dynamic(() => import('./contact/page'), {
  loading: () => <div>Loading...</div>,
});

export default function Home() {
  return (
    <main>
      <Header />
      {/* Main content components */}
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
