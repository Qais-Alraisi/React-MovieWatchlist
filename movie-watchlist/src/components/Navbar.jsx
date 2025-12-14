import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { email, logout, token } = useContext(AuthContext);
  const navigate = useNavigate();

  function doLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav className="navbar">
      <div className="brand">🎬 Movie Watchlist</div>
      <div className="nav-actions">
        {token ? (
          <>
            <span className="user">Signed in as <strong>{email}</strong></span>
            <Link to="/watchlist" className="btn">My List</Link>
            <button onClick={doLogout} className="danger">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn">Login</Link>
            <Link to="/register" className="btn">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
