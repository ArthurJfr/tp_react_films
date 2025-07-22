import React from 'react';
import styles from './MovieList.module.css';

const Pagination = ({ page, totalPages, setPage }) => {
  const getPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page > 3) pages.push(1, '...');
      for (let i = Math.max(1, page - 1); i <= Math.min(totalPages, page + 1); i++) {
        pages.push(i);
      }
      if (page < totalPages - 2) pages.push('...', totalPages);
    }
    return pages;
  };

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className={styles.pageBtn}
      >
        Précédent
      </button>
      {getPages().map((p, idx) =>
        p === '...' ? (
          <span key={idx} className={styles.ellipsis}>...</span>
        ) : (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`${styles.pageBtn} ${p === page ? styles.activePage : ''}`}
            disabled={p === page}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className={styles.pageBtn}
      >
        Suivant
      </button>
    </div>
  );
};

export default Pagination;
