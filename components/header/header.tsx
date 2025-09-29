"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Logo from "./Logo";
import {
  Home,
  User,
  FileText,
  Briefcase,
  Image as ImageIcon,
  MessageCircle,
  BookOpen,
  Menu,
  X,
} from "lucide-react";

import "./header.css";

const Header: React.FC = () => {
  // Toggle menu state - make sure it's false by default
  const [toggle, setShowMenu] = useState<boolean>(false);
  const [activeNav, setActiveNav] = useState<string>("#home");
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

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

  // Handle body scroll when menu is open/closed
  useEffect(() => {
    if (toggle) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Cleanup
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [toggle]);
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Only process click events when the menu is open
      if (!toggle) return;

      // Make sure we're not clicking on the menu or the toggle button itself
      const toggleButton = document.querySelector(".nav__toggle");
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !(toggleButton && toggleButton.contains(e.target as Node))
      ) {
        setShowMenu(false);
      }
    };

    // Small delay to prevent immediate closure when opening
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggle]);
  // Close mobile menu when clicking a nav link
  const handleNavClick = (navId: string) => {
    setActiveNav(navId);

    // Close menu with a slight delay to ensure the click event completes
    if (window.innerWidth <= 768) {
      // Small delay to make the navigation feel more responsive
      setTimeout(() => {
        setShowMenu(false);
      }, 150);
    }
  };

  const toggleMenu = () => {
    setShowMenu(!toggle);
  };

  // Close menu when resizing to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && toggle) {
        setShowMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [toggle]);

  // Add padding to body when mobile menu is at top to prevent content from being hidden
  useEffect(() => {
    const body = document.body;
    const updateBodyPadding = () => {
      if (window.innerWidth <= 768) {
        const headerHeight = headerRef.current?.offsetHeight || 0;
        body.style.paddingTop = `${headerHeight}px`;
      } else {
        body.style.paddingTop = "0";
      }
    };

    updateBodyPadding();
    window.addEventListener("resize", updateBodyPadding);

    return () => {
      window.removeEventListener("resize", updateBodyPadding);
      body.style.paddingTop = "0";
    };
  }, []);

  return (
    <>
      {/* Overlay for mobile menu - only show when menu is open */}
      <div
        className={toggle ? "menu-overlay show-overlay" : "menu-overlay"}
        onClick={() => setShowMenu(false)}
      ></div>

      <header className="header" ref={headerRef}>
        <nav className="nav container">
          <Link href="#home" className="nav__logo">
            <Logo />
            <span className="logo-text">Mbarndouka</span>
          </Link>{" "}
          <div className="blog-button-container">
            <Link href="/blog" className="blog-button">
              <BookOpen size={20} /> Blog
            </Link>
          </div>
          {/* Hamburger menu toggle - only shown when menu is closed */}
          {!toggle && (
            <div
              className="nav__toggle"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={toggle}
              tabIndex={0}
              role="button"
            >
              <Menu size={24} />
            </div>
          )}
          <div
            className={toggle ? "nav__menu show-menu" : "nav__menu"}
            ref={menuRef}
            aria-hidden={!toggle}
          >
            <X
              className="nav__close"
              onClick={toggleMenu}
              size={24}
              aria-label="Close menu"
              tabIndex={0}
              role="button"
            />

            <ul className="nav__list grids">
              <li className="nav__item">
                <Link
                  href="#home"
                  onClick={() => handleNavClick("#home")}
                  className={
                    activeNav === "#home"
                      ? "nav__link active__link"
                      : "nav__link"
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
              </li>{" "}
              <li className="nav__item">
                {" "}
                <Link
                  href="#portfolio"
                  onClick={() => handleNavClick("#portfolio")}
                  className={
                    activeNav === "#portfolio"
                      ? "nav__link active__link"
                      : "nav__link"
                  }
                >
                  <ImageIcon className="nav__icon" size={20} /> Portfolio
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
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
