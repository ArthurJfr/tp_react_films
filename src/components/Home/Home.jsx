import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>
          🎬 Bienvenue sur <span className={styles.brand}>CinéVibe</span>
        </h1>
        <p className={styles.subtitle}>
          Découvrez, notez et ajoutez vos films préférés à votre liste de souhaits.<br />
          Plongez dans l’univers du cinéma comme jamais auparavant !
        </p>
        <button
          className={styles.cta}
          onClick={() => navigate('/movies')}
        >
          Explorer les films
        </button>
      </div>
    </section>
  );
};

export default Home;
