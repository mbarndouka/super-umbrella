"use client";
import React from "react";
import Footer from "./footer/page";
import Header from "./header/header";
import About from "./about/page";
import HomeSection from "./home/Page"; // Import the Home component
import Skills from "./skills/page";
import Qualification from "./qualification/qualification";
import Portfolio from "./portfolio/page";
import Contact from "./contact/page";

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
