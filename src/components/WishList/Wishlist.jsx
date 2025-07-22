import React from 'react';
import { useWishlist } from '../../context/WishlistProvider';
import styles from '../WishList/Wishlist.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import FilmCard from '../FilmCard/FilmCard';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className={styles.container}>
      <h2>Ma Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Votre wishlist est vide.</p>
      ) : (
        <div className={styles.cards}>
          {wishlist.map((movie) => (
            <FilmCard key={movie.id} movie={movie} showDetailsLink={true}>
              <button
                onClick={() => removeFromWishlist(movie.id)}
                style={{
                  background: '#e50914',
                  border: 'none',
                  borderRadius: '50%',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '1rem',
                  margin: '0.5rem auto',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px #e5091440',
                  transition: 'background 0.2s, box-shadow 0.2s',
                }}
                title="Retirer de la wishlist"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </FilmCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist; 