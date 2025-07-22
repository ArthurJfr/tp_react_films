import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './MovieList.module.css';
import { debounce } from '../../utils/debounce';
import FilmCard from '../FilmCard/FilmCard';
import { useWishlist } from '../../context/WishlistProvider';
import FilmNav from '../FilmNav/FilmNav';
import Pagination from './Pagination';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const categories = [
  { label: 'Populaires', value: 'popular' },
  { label: 'En salle', value: 'now_playing' },
  { label: 'Mieux notés', value: 'top_rated' },
  { label: 'À venir', value: 'upcoming' },
];

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState('popular');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const debounceSearch = useCallback(
    debounce((value) => setDebouncedSearch(value), 500),
    []
  );

  useEffect(() => {
    debounceSearch(search);
  }, [search, debounceSearch]);

  useEffect(() => {
    let url = '';
    setLoading(true);
    if (debouncedSearch.trim() !== '') {
      url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(debouncedSearch)}&page=${page}`;
    } else {
      url = `${BASE_URL}/movie/${category}?api_key=${API_KEY}&page=${page}`;
    }
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [category, debouncedSearch, page]);

  return (
    <div className={styles.container}>
      <FilmNav
        category={category}
        setCategory={setCategory}
        search={search}
        setSearch={setSearch}
        setPage={setPage}
      />
      {loading ? (
        <div>Chargement...</div>
      ) : (
        <div className={styles.movies}>
          {movies.map((movie) => {
            const isLiked = wishlist.some((item) => item.id === movie.id);
            return (
              <FilmCard
                key={movie.id}
                movie={movie}
                onLike={isLiked ? removeFromWishlist : addToWishlist}
                isLiked={isLiked}
              />
            );
          })}
        </div>
      )}
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};

export default MovieList; 