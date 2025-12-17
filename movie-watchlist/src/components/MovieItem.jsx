import React, { useState } from 'react';

export default function MovieItem({ movie, onToggleWatched, onDelete }) {
  const [imageError, setImageError] = useState(false);

  function handleImageError() {
    console.warn(`Image failed to load for "${movie.title}":`, movie.poster);
    setImageError(true);
  }

  const showPlaceholder = !movie.poster || imageError;

  return (
    <div className={`movie-item ${movie.watched ? 'watched' : ''}`}>
      {showPlaceholder ? (
        <div className="poster-placeholder">
          <div style={{ fontSize: '3rem' }}>🎬</div>
          <small>{imageError ? 'Image unavailable' : 'No poster'}</small>
        </div>
      ) : (
        <img
          src={movie.poster}
          alt={movie.title}
          onError={handleImageError}
          style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: '8px' }}
        />
      )}
      <div className="movie-details">
        <h3>{movie.title} {movie.year ? `(${movie.year})` : ''}</h3>
        <div className="movie-actions">
          <button onClick={() => onToggleWatched(movie)}>{movie.watched ? 'Unwatch' : 'Mark watched'}</button>
          <button className="danger" onClick={() => onDelete(movie)}>Delete</button>
        </div>
      </div>
    </div>
  );
}
