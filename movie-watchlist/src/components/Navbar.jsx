import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';

export default function Navbar({ onShow }) {
  const { username, logout, token } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="brand">🎬 Movie Watchlist</div>
      <div className="nav-actions">
        {token ? (
          <>
            <span className="user">Signed in as <strong>{username}</strong></span>
            <button onClick={() => onShow('watchlist')}>My List</button>
            <button onClick={() => logout()} className="danger">Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => onShow('login')}>Login</button>
            <button onClick={() => onShow('register')}>Register</button>
          </>
        )}
      </div>
    </nav>
  );
}
