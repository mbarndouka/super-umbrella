"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Logo from "./Logo";
import {
  Home,
  User,
  FileText,
  Briefcase,
  Image,
  MessageCircle,
  BookOpen,
  Menu,
  X,
} from "lucide-react";

import "./header.css";

const Header: React.FC = () => {
  // Toggle menu state
  const [toggle, setShowMenu] = useState<boolean>(false);
  const [activeNav, setActiveNav] = useState<string>("#home");
  const headerRef = useRef<HTMLElement>(null);

  // Add scroll event listener with proper cleanup
  useEffect(() => {
    const changeBackground = (): void => {
      const header = headerRef.current;
      if (header) {
        if (window.scrollY >= 80) {
          header.classList.add("scroll-header");
        } else {
          header.classList.remove("scroll-header");
        }
      }
    };

    // Calculate scroll progress
    const calculateScrollProgress = (): void => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;

      const header = headerRef.current;
      if (header) {
        header.classList.add("scroll-progress");
        header.style.setProperty("--scroll-percentage", `${progress}%`);
      }
    };

    window.addEventListener("scroll", changeBackground);
    window.addEventListener("scroll", calculateScrollProgress);

    // Initial calculation
    calculateScrollProgress();

    // Cleanup function to remove event listeners
    return () => {
      window.removeEventListener("scroll", changeBackground);
      window.removeEventListener("scroll", calculateScrollProgress);
    };
  }, []);

  // Close mobile menu when clicking a nav link
  const handleNavClick = (navId: string) => {
    setActiveNav(navId);
    if (window.innerWidth <= 768) {
      setShowMenu(false);
    }
  };

  const toggleMenu = () => {
    setShowMenu(!toggle);
  };

  return (
    <header className="header" ref={headerRef}>
      <nav className="nav container">
        <Link href="#home" className="nav__logo">
          <Logo />
          <span className="logo-text">Mbarndouka</span>
        </Link>
        <div className={toggle ? "nav__menu show-menu" : "nav__menu"}>
          <ul className="nav__list grids">
            <li className="nav__item">
              <Link
                href="#home"
                onClick={() => handleNavClick("#home")}
                className={
                  activeNav === "#home" ? "nav__link active__link" : "nav__link"
                }
              >
                <Home className="nav__icon" size={20} />
                Home
              </Link>
            </li>

            <li className="nav__item">
              <Link
                href="#about"
                onClick={() => handleNavClick("#about")}
                className={
                  activeNav === "#about"
                    ? "nav__link active__link"
                    : "nav__link"
                }
              >
                <User className="nav__icon" size={20} /> About
              </Link>
            </li>

            <li className="nav__item">
              <Link
                href="#skills"
                onClick={() => handleNavClick("#skills")}
                className={
                  activeNav === "#skills"
                    ? "nav__link active__link"
                    : "nav__link"
                }
              >
                <FileText className="nav__icon" size={20} /> Skills
              </Link>
            </li>

            <li className="nav__item">
              <Link
                href="#qualification"
                onClick={() => handleNavClick("#qualification")}
                className={
                  activeNav === "#qualification"
                    ? "nav__link active__link"
                    : "nav__link"
                }
              >
                <Briefcase className="nav__icon" size={20} /> Journey
              </Link>
            </li>

            <li className="nav__item">
              <Link
                href="#portfolio"
                onClick={() => handleNavClick("#portfolio")}
                className={
                  activeNav === "#portfolio"
                    ? "nav__link active__link"
                    : "nav__link"
                }
              >
                <Image className="nav__icon" size={20} />{" "}
                Portfolio
              </Link>
            </li>

            <li className="nav__item">
              <Link
                href="#contact"
                onClick={() => handleNavClick("#contact")}
                className={
                  activeNav === "#contact"
                    ? "nav__link active__link"
                    : "nav__link"
                }
              >
                <MessageCircle className="nav__icon" size={20} /> Contact
              </Link>
            </li>
          </ul>

          <X className="nav__close" onClick={toggleMenu} size={24} />
        </div>

        <div className="blog-button-container">
          <Link href="/blog" className="blog-button">
            <BookOpen size={20} /> Blog
          </Link>
        </div>

        <div className="nav__toggle" onClick={toggleMenu}>
          <Menu size={24} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
