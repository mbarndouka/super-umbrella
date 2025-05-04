import React from "react";
import { motion } from "framer-motion";
import "./contact.css";

const Contact = () => {
  return (
    <section className="contact section" id="contact">
      <motion.h2
        className="section__title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Get in touch
      </motion.h2>
      <motion.span
        className="section__subtitle"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Contact me
      </motion.span>

      <div className="contact__container container">
        <motion.div
          className="contact__content-centered"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="contact__cards-wrapper">
            <motion.div
              className="contact__card contact__card-large"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{
                y: -12,
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
            >
              <i className="bx bx-mail-send contact__card-icon"></i>
              <h3 className="contact__card-title">Email</h3>
              <span className="contact__card-data">mmbarndouka@gmail.com</span>
              <p className="contact__card-description">
                Send me an email anytime! I typically respond within 24 hours.
              </p>
              <a
                href="mailto:mmbarndouka@gmail.com"
                className="contact__button"
              >
                Write me{" "}
                <i className="bx bx-right-arrow-alt contact__button-icon"></i>
              </a>
            </motion.div>

            <motion.div
              className="contact__card contact__card-large"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{
                y: -12,
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
            >
              <i className="bx bxl-whatsapp contact__card-icon"></i>
              <h3 className="contact__card-title">WhatsApp</h3>
              <span className="contact__card-data">+250 791 22 66 19</span>
              <p className="contact__card-description">
                Available for quick chats and project discussions via WhatsApp.
              </p>
              <a href="https://wa.link/h9dxqz" className="contact__button">
                Message me{" "}
                <i className="bx bx-right-arrow-alt contact__button-icon"></i>
              </a>
            </motion.div>

            <motion.div
              className="contact__card contact__card-large"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{
                y: -12,
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
            >
              <i className="bx bxl-linkedin contact__card-icon"></i>
              <h3 className="contact__card-title">LinkedIn</h3>
              <span className="contact__card-data">
                Let us connect professionally
              </span>
              <p className="contact__card-description">
                Connect with me on LinkedIn for professional opportunities and
                networking.
              </p>
              <a
                href="https://www.linkedin.com/in/mbarndouka"
                className="contact__button"
              >
                Connect{" "}
                <i className="bx bx-right-arrow-alt contact__button-icon"></i>
              </a>
            </motion.div>
          </div>

          <motion.div
            className="contact__availability"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3>Available for new projects</h3>
            <p>
              Got a project in mind? Let us collaborate and create something
              amazing together!
            </p>
            <motion.div
              className="contact__availability-indicator"
              animate={{
                boxShadow: [
                  "0 0 5px 5px rgba(46, 255, 96, 0.2)",
                  "0 0 10px 10px rgba(46, 255, 96, 0.4)",
                  "0 0 5px 5px rgba(46, 255, 96, 0.2)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <span className="availability-dot"></span>
              <span className="availability-text">Currently Available</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
