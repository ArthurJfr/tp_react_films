import React from 'react';
import styles from './FilmCard.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart as faSolidHeart, faHeart as faRegularHeart } from '@fortawesome/free-solid-svg-icons';
const FilmCard = ({ movie, children, showDetailsLink = true, onLike, isLiked }) => {
  if (!movie) return null;
  const getRatingColor = (note) => {
    if (note >= 7.5) return '#21d07a'; // vert
    if (note >= 6) return '#ffb300';   // orange
    return '#e50914';                  // rouge
  };
  const isExcellent = movie.vote_average >= 7.5;

  return (
    <div
      className={`${styles.card} ${isExcellent ? styles.glow : ''}`}
      style={{
        boxShadow:
          movie.vote_average >= 7.5
            ? '0 8px 32px 0 #21d07a55'
            : movie.vote_average >= 6
            ? '0 8px 32px 0 #ffb30055'
            : '0 8px 32px 0 #e5091455',
      }}
    >
      <img
        loading="lazy"
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : ''}
        alt={movie.title}
        className={styles.poster}
      />
      <h3 className={styles.title}>{movie.title}</h3>
      <p
        className={styles.rating}
        style={{ color: getRatingColor(movie.vote_average) }}
      >
        <FontAwesomeIcon icon={faStar} />
        {movie.vote_average}
      </p>
      {onLike && (
        <button
          onClick={() => onLike(movie)}
          className={styles.likeBtn}
          title={isLiked ? 'Retirer de la wishlist' : 'Ajouter à la wishlist'}
        >
          <FontAwesomeIcon icon={isLiked ? faSolidHeart : faRegularHeart} color="#fff" />
        </button>
      )}
      {children}
      {showDetailsLink && (
        <Link to={`/movie/${movie.id}`} className={styles.detailsLink}>
          Voir les détails
        </Link>
      )}
    </div>
  );
};

export default FilmCard; 