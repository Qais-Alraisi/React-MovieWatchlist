import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import AddMovieForm from './AddMovieForm';
import MovieItem from './MovieItem';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Watchlist() {
  const { token, logout } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function fetchMovies() {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:4001/api/movies');
      setMovies(res.data.movies || []);
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        navigate('/login');
      }
    }
    setLoading(false);
  }

  async function addMovie(payload) {
    try {
      const res = await axios.post('http://localhost:4001/api/movies', payload);
      const movie = res.data.movie;
      setMovies((m) => [movie, ...m]);
    } catch (err) {
      // handle error silently for now
    }
  }

  async function toggleWatched(movie) {
    try {
      const res = await axios.put(`http://localhost:4001/api/movies/${movie.id}`, { watched: !movie.watched });
      const updated = res.data.movie;
      setMovies((m) => m.map((it) => (it.id === updated.id ? updated : it)));
    } catch (err) {
      // ignore
    }
  }

  async function deleteMovie(movie) {
    try {
      await axios.delete(`http://localhost:4001/api/movies/${movie.id}`);
      setMovies((m) => m.filter((it) => it.id !== movie.id));
    } catch (err) {
      // ignore
    }
  }

  if (!token) return <div className="card note">Please login to see your watchlist.</div>;

  return (
    <div className="watchlist">
      <header className="watchlist-header">
        <h2>🎬 My Watchlist</h2>
      </header>
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
