import React from 'react';

export default function MovieItem({ movie, onToggleWatched, onDelete }) {
  return (
    <div className={`movie-item ${movie.watched ? 'watched' : ''}`}>
      {movie.poster ? <img src={movie.poster} alt={movie.title} /> : <div className="poster-placeholder">No poster</div>}
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
