import React from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import PillButton from "../components/PillButton";

const Data = () => {
  return (
    <div className="home__data">
      <motion.h1
        className="home__title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        Mbarndouka.O Marius
      </motion.h1>

      <h3 className="home__subtitle">
        <TypeAnimation
          sequence={["Frontend developer", 1000, "Data scientist", 1000]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />
      </h3>

      <motion.p
        className="home__description"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        I am a Front end developer based in Kigali and data science student at
        ALX. I am very passionate about data and dedicated to my work.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <PillButton href="#contact" className="home-pill-button">
          Say Hello
          <Send className="button__icon" size={18} />
        </PillButton>
      </motion.div>
    </div>
  );
};

export default Data;
