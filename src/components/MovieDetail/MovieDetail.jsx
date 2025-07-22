import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistProvider';
import styles from './MovieDetail.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCalendar, faStar, faLanguage, faClock } from '@fortawesome/free-solid-svg-icons';
import FilmCard from '../FilmCard/FilmCard';


// Remplacez ceci par votre propre clé API TMDb !
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]);
  const [similar, setSimilar] = useState([]);
  const { addToWishlist, wishlist } = useWishlist();
  const [loading, setLoading] = useState(true);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    setLoading(true);
    // Détails du film
    fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        setMovie(data);
        setLoading(false);
      });
    // Acteurs principaux
    fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        setActors((data.cast || []).slice(0, 10));
      });
    // Films similaires
    fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        setSimilar(data.results || []);
      });
    // Bande-annonce
    fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        const trailer = (data.results || []).find(
          v => v.site === 'YouTube' && v.type === 'Trailer'
        );
        setTrailerKey(trailer ? trailer.key : null);
      });
  }, [id]);

  if (loading || !movie) return <div>Chargement...</div>;

  const inWishlist = wishlist.some((item) => item.id === movie.id);

  return (
    <div className={styles.container}>
      <h1>{movie.title}</h1>
      <div className={styles.topSection}>
        <img loading="lazy" src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : ''} alt={movie.title} className={styles.poster} />
        <div className={styles.details}>
          <p><strong>Résumé :</strong>{movie.overview}</p>
          <p><FontAwesomeIcon icon={faCalendar} /><strong>  Date de sortie :</strong> {movie.release_date}</p>
          <p><FontAwesomeIcon icon={faStar} /><strong>  Note moyenne :</strong> {movie.vote_average}</p>
          <p><FontAwesomeIcon icon={faClock} /><strong>  Durée :</strong> {movie.runtime} minutes</p>
          <p><FontAwesomeIcon icon={faLanguage} /><strong>  Langue :</strong> {movie.original_language}</p>

          <button
            onClick={() => addToWishlist(movie)}
            disabled={inWishlist}
            style={{
              background: '#e50914',
              border: 'none',
              borderRadius: '8px',
              padding: '0.8rem 1.5rem',
              color: '#fff',
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              opacity: inWishlist ? 0.7 : 1,
              boxShadow: '0 2px 8px #e5091440',
              transition: 'all 0.2s ease'
            }}
          >
            <FontAwesomeIcon icon={faHeart} />
            {inWishlist ? 'Déjà dans la wishlist' : 'Ajouter à la wishlist'}
          </button>
        </div>
      </div>
      <div className={styles.clear}></div>
      {trailerKey && (
        <div style={{ margin: '2rem 0', textAlign: 'center' }}>
          <h3>Bande-annonce</h3>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px', boxShadow: '0 2px 16px #000a' }}>
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Bande-annonce"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%', border: 'none'
              }}
            />
          </div>
        </div>
      )}
      <h3>Acteurs principaux</h3>
      <div className={styles.actorsList}>
        {actors.map((actor) => (
          <div key={actor.id} className={styles.actorCard}>
            <img
              loading="lazy"
              src={actor.profile_path
                ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                : '/default-avatar.png'}
              alt={actor.name}
              className={styles.actorImg}
            />
            <div className={styles.actorName}>{actor.name}</div>
            <div className={styles.actorRole}>{actor.character}</div>
          </div>
        ))}
      </div>
      <hr className={styles.separator} />
      <h2>Films similaires</h2>
      <div className={styles.similar}>
        {similar.map((sim) => (
          <FilmCard key={sim.id} movie={sim} showDetailsLink={true} />
        ))}
      </div>
    </div>
  );
};

export default MovieDetail; 