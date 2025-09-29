import React, { useEffect, useState } from "react";
import Social from "./social";
import Data from "./Data";
import ScrollDown from "./ScrollDown";
import { motion } from "framer-motion";
import Image from "next/image";
import Profile from "../../assets/images/face12.jpg";
import "./Home.css";

const Home = () => {
  const [showScrollDown, setShowScrollDown] = useState(true);

  useEffect(() => {
    // Function to check if we should show the scroll down component
    const checkScreenSize = () => {
      setShowScrollDown(window.innerWidth > 576);
    };

    // Run once on component mount
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  return (
    <section className="home section" id="home">
      <div className="home__container container grid">
        <div className="home__content grid">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="home__social-container"
          >
            <Social />
          </motion.div>
          <motion.div
            className="home__img"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
              delay: 0.4,
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "inset 0 0 0 9px rgba(255, 255, 255, 0.4)",
              transition: { duration: 0.3 },
            }}
          >
            <Image
              src={Profile}
              alt="Profile"
              width={300}
              height={300}
              className="profile-image"
              priority
              sizes="(max-width: 768px) 200px, (max-width: 992px) 250px, 300px"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.6 }}
            className="home__data-container"
          >
            <Data />
          </motion.div>{" "}
        </div>

        {showScrollDown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            whileHover={{ y: -5 }}
            className="home__scroll-wrapper"
          >
            <ScrollDown />
          </motion.div>
        )}
      </div>

      {/* Background animation elements */}
      <div className="home__background-shapes">
        <motion.div
          className="shape shape-1"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 0.15,
            y: [0, 10, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="shape shape-2"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 0.1,
            y: [0, -15, 0],
            x: [0, -5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>
    </section>
  );
};

export default Home;
