import React from 'react';
import styles from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.socials}>
      <a
        href="https://github.com/ArthurJfr/tp_react_films"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className={styles.iconLink}
      >
        <FontAwesomeIcon icon={faGithub} />
      </a>
      <a
        href="https://www.linkedin.com/in/arthur-jaffro-66995a257/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className={styles.iconLink}
      >
        <FontAwesomeIcon icon={faLinkedin} />
      </a>
    </div>
    <div className={styles.copy}>
      Arthur Jaffro {new Date().getFullYear()} — Open Source Project
    </div>
  </footer>
);

export default Footer;
