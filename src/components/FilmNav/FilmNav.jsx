import React from 'react';
import styles from './FilmNav.module.css';

const categories = [
  { label: 'Populaires', value: 'popular' },
  { label: 'En salle', value: 'now_playing' },
  { label: 'Mieux notés', value: 'top_rated' },
  { label: 'À venir', value: 'upcoming' },
];

const FilmNav = ({ category, setCategory, search, setSearch, setPage }) => (
  <div className={styles.filmNav}>
    {categories.map((cat) => (
      <button
        key={cat.value}
        className={`${styles.categoryBtn} ${category === cat.value ? styles.active : ''}`}
        onClick={() => { setCategory(cat.value); setPage(1); setSearch(''); }}
      >
        {cat.label}
      </button>
    ))}
    <input
      type="text"
      className={styles.searchInput}
      placeholder="Rechercher un film..."
      value={search}
      onChange={e => { setSearch(e.target.value); setPage(1); }}
    />
  </div>
);

export default FilmNav;