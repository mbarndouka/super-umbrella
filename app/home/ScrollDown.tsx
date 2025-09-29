import React from "react";
import { MoveDown } from "lucide-react";
import { motion } from "framer-motion";

const ScrollDown = () => {
  return (
    <div className="home__scroll">
      <motion.a
        href="#about"
        className="home__scrolldown button--flex"
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        aria-label="Scroll down to about section"
      >
        <div className="scroll-content">
          <div className="scroll-indicator">
            <motion.div
              className="scroll-dot"
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <span className="home__scroll-name">Scroll Down</span>
          <motion.div
            animate={{
              y: [0, 4, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
          >
            <MoveDown className="home__scroll-arrow" size={20} />
          </motion.div>
        </div>
      </motion.a>
    </div>
  );
};

export default ScrollDown;
