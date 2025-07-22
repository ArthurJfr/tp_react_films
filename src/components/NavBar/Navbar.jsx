import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistProvider';
import styles from './Navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faHeart } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { wishlist } = useWishlist();

  return (
    <nav className={styles.navbar}>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FontAwesomeIcon icon={faFilm} /> FilmFinder
        </Link>
        <Link to="/wishlist" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FontAwesomeIcon icon={faHeart} color="#e50914" />
          Wishlist
          <span style={{ background: '#e50914', borderRadius: '50%', padding: '0.2em 0.7em', marginLeft: '0.5em', fontWeight: 'bold' }}>{wishlist.length}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar; 