import React, { useContext } from 'react';
import './App.css';
import { AuthProvider, AuthContext } from './auth/AuthContext';
import Navbar from './components/Navbar';
import Login from './auth/Login';
import Register from './auth/Register';
import Watchlist from './components/Watchlist';
import { Routes, Route, Navigate } from 'react-router-dom';

function RequireAuth({ children }) {
  const { token } = useContext(AuthContext);
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

function AppRoutes() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/watchlist" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/watchlist" element={<RequireAuth><Watchlist /></RequireAuth>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
