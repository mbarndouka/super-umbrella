import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";

const Social = () => {
  const socialVariants = {
    hidden: { opacity: 0, x: -25 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + i * 0.2,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="home__social">
      <motion.a
        href="https://www.linkedin.com/in/mbarndouka"
        className="home__social-icon"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn Profile"
        custom={0}
        initial="hidden"
        animate="visible"
        variants={socialVariants}
        whileHover={{ y: -5, color: "#0A66C2" }}
        whileTap={{ scale: 0.9 }}
      >
        <Linkedin size={20} />
      </motion.a>{" "}
      <motion.a
        href="https://github.com/mbarndouka"
        className="home__social-icon"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub Profile"
        custom={1}
        initial="hidden"
        animate="visible"
        variants={socialVariants}
        whileHover={{ y: -5, color: "#333" }}
        whileTap={{ scale: 0.9 }}
      >
        <Github size={20} />
      </motion.a>
      <motion.a
        href="https://twitter.com/mbarndouka"
        className="home__social-icon"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter Profile"
        custom={2}
        initial="hidden"
        animate="visible"
        variants={socialVariants}
        whileHover={{ y: -5, color: "#1DA1F2" }}
        whileTap={{ scale: 0.9 }}
      >
        <Twitter size={20} />
      </motion.a>
    </div>
  );
};

export default Social;
