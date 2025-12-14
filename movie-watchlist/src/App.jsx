import React, { useState } from 'react';
import './App.css';
import { AuthProvider } from './auth/AuthContext';
import Navbar from './components/Navbar';
import Login from './auth/Login';
import Register from './auth/Register';
import Watchlist from './components/Watchlist';

function App() {
  const [page, setPage] = useState('watchlist');

  return (
    <AuthProvider>
      <div className="app">
        <Navbar onShow={setPage} />
        <main>
          {page === 'login' && <Login />}
          {page === 'register' && <Register />}
          {page === 'watchlist' && <Watchlist />}
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
