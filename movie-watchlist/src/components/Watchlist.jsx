import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import AddMovieForm from './AddMovieForm';
import MovieItem from './MovieItem';

export default function Watchlist() {
  const { token } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function fetchMovies() {
    setLoading(true);
    const res = await fetch('http://localhost:4000/api/movies', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      setMovies(data.movies);
    }
    setLoading(false);
  }

  async function addMovie(payload) {
    const res = await fetch('http://localhost:4000/api/movies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const { movie } = await res.json();
      setMovies((m) => [movie, ...m]);
    }
  }

  async function toggleWatched(movie) {
    const res = await fetch(`http://localhost:4000/api/movies/${movie.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ watched: !movie.watched })
    });
    if (res.ok) {
      const { movie: updated } = await res.json();
      setMovies((m) => m.map((it) => (it.id === updated.id ? updated : it)));
    }
  }

  async function deleteMovie(movie) {
    const res = await fetch(`http://localhost:4000/api/movies/${movie.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      setMovies((m) => m.filter((it) => it.id !== movie.id));
    }
  }

  if (!token) return <p>Please login to see your watchlist.</p>;

  return (
    <div className="watchlist">
      <h2>Your Watchlist</h2>
      <AddMovieForm onAdd={addMovie} />
      {loading ? <p>Loading...</p> : movies.length === 0 ? <p>No movies yet</p> : (
        <div className="movies">
          {movies.map((m) => (
            <MovieItem key={m.id} movie={m} onToggleWatched={toggleWatched} onDelete={deleteMovie} />
          ))}
        </div>
      )}
    </div>
  );
}
